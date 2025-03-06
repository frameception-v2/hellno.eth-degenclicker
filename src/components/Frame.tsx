"use client";

import React, { useEffect, useCallback, useState, useRef, useMemo } from "react";
// Using Web Crypto API for SHA-256
async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
import { useStore } from "~/lib/store";
import Head from "next/head";
import { Badge } from "~/components/ui/badge";
import sdk, {
  AddFrame,
  SignIn as SignInCore,
  type Context,
} from "@farcaster/frame-sdk";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";

import { config } from "~/components/providers/WagmiProvider";
import { truncateAddress } from "~/lib/truncateAddress";
import { base, optimism } from "wagmi/chains";
import { useSession } from "next-auth/react";
import { createStore } from "mipd";
import { Label } from "~/components/ui/label";
import { PROJECT_TITLE, PROJECT_DESCRIPTION, PROJECT_ID } from "~/lib/constants";
import GameCanvas from "~/components/GameCanvas";
import AutoCollector from "~/components/AutoCollector";
import { ErrorBoundary } from "~/components/ErrorBoundary";
import { PurpleButton } from "~/components/ui/PurpleButton";

function ExampleCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to the Frame Template</CardTitle>
        <CardDescription>
          This is an example card that you can customize or remove
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Label>Place content in a Card here.</Label>
      </CardContent>
    </Card>
  );
}
ExampleCard.displayName = 'ExampleCard';

Frame.displayName = 'Frame';
export default Frame;

const MemoizedBadge = React.memo(
  ({ label, value }: { label: string; value: number }) => (
    <Badge variant="secondary" className="text-purple-300 bg-purple-950/50">
      {label}: {value.toLocaleString()}
    </Badge>
  ),
  (prev, next) => prev.value === next.value
);

function Frame() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();

  const [added, setAdded] = useState(false);
  const swipeStart = useRef<{x: number; y: number} | null>(null);

  const [addFrameResult, setAddFrameResult] = useState("");

  const addFrame = useCallback(async () => {
    try {
      await sdk.actions.addFrame();
    } catch (error) {
      if (error instanceof AddFrame.RejectedByUser) {
        setAddFrameResult(`Not added: ${error.message}`);
      }

      if (error instanceof AddFrame.InvalidDomainManifest) {
        setAddFrameResult(`Not added: ${error.message}`);
      }

      setAddFrameResult(`Error: ${error}`);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      const context = await sdk.context;
      if (!context) {
        return;
      }

      setContext(context);
      setAdded(context.client.added);

      // If frame isn't already added, prompt user to add it
      if (!context.client.added) {
        addFrame();
      }

      // Setup haptic feedback patterns
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate;
      }

      sdk.on("frameAdded", ({ notificationDetails }) => {
        setAdded(true);
      });

      sdk.on("frameAddRejected", ({ reason }) => {
        console.log("frameAddRejected", reason);
      });

      sdk.on("frameRemoved", () => {
        console.log("frameRemoved");
        setAdded(false);
      });

      sdk.on("notificationsEnabled", ({ notificationDetails }) => {
        console.log("notificationsEnabled", notificationDetails);
      });
      sdk.on("notificationsDisabled", () => {
        console.log("notificationsDisabled");
      });

      sdk.on("primaryButtonClicked", () => {
        console.log("primaryButtonClicked");
      });

      console.log("Calling ready");
      sdk.actions.ready({});

      // Set up a MIPD Store, and request Providers.
      const store = createStore();

      // Subscribe to the MIPD Store.
      store.subscribe((providerDetails) => {
        console.log("PROVIDER DETAILS", providerDetails);
        // => [EIP6963ProviderDetail, EIP6963ProviderDetail, ...]
      });
    };
    if (sdk && !isSDKLoaded) {
      console.log("Calling load");
      setIsSDKLoaded(true);
      load();
      return () => {
        sdk.removeAllListeners();
      };
    }
  }, [isSDKLoaded, addFrame]);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const renderedGameElements = useMemo(() => (
    <ErrorBoundary>
      <GameCanvas />
      <AutoCollector />
    </ErrorBoundary>
  ), []);

  const hats = useStore(state => state.hats);
  const clickCount = useStore(state => state.clickCount);
  
  const renderedBadges = useMemo(() => (
    <div className="flex justify-center gap-2 mb-4">
      <MemoizedBadge label="🎩 Hats" value={hats} />
      <MemoizedBadge label="👆 Clicks" value={clickCount} />
    </div>
  ), [hats, clickCount]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Head>
        <meta property="og:title" content={PROJECT_TITLE} />
        <meta property="og:description" content={PROJECT_DESCRIPTION} />
        <meta property="og:image" content={`${baseUrl}/api/og`} />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content={`${baseUrl}/api/og`} />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta property="fc:frame:post_url" content={`${baseUrl}/api/post`} />
        <meta property="fc:frame:button:1" content="Share Progress" />
      </Head>
      <div
        style={{ 
          paddingTop: context?.client.safeAreaInsets?.top ?? 0,
          paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
          paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
          paddingRight: context?.client.safeAreaInsets?.right ?? 0
        }}
      >
        <div className="w-[300px] mx-auto py-2 px-2">
          {renderedGameElements}
          {renderedBadges}
          <div 
            className="mt-4 flex justify-center"
            onTouchStart={(e) => {
              const touch = e.touches[0];
              swipeStart.current = { x: touch.clientX, y: touch.clientY };
            }}
            onTouchMove={(e) => {
              if (!swipeStart.current) return;
              const touch = e.touches[0];
              const deltaX = touch.clientX - swipeStart.current.x;
              const deltaY = touch.clientY - swipeStart.current.y;
              
              // Only trigger horizontal swipes
              if (Math.abs(deltaX) > Math.abs(deltaY)) {
                e.preventDefault();
                if (Math.abs(deltaX) > 30) { // 30px threshold
                  const panel = document.querySelector("[data-upgrade-panel]");
                  if (deltaX > 0) {
                    panel?.classList.remove("translate-x-full");
                  } else {
                    panel?.classList.add("translate-x-full");
                  }
                  swipeStart.current = null;
                }
              }
            }}
            onTouchEnd={() => swipeStart.current = null}
          >
            <PurpleButton 
              onClick={async () => {
                const state = useStore.getState();
                const stateString = JSON.stringify({
                  v: 1,
                  c: state.clickCount,
                  h: state.hats,
                  t: state.lastCollection
                });
                const base64State = btoa(stateString);
                const url = new URL(window.location.href);
                url.searchParams.set('state', base64State);
                
                // Add cryptographic hash for verification
                const hash = await sha256(base64State + PROJECT_ID);
                url.searchParams.set('hash', hash);

                navigator.clipboard.writeText(url.toString());
              }}
            >
              Share Progress
            </PurpleButton>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
