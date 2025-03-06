"use client";

import { useEffect, useCallback, useState } from "react";
import { sha256 } from 'js-sha256';
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
import { PROJECT_TITLE } from "~/lib/constants";
import GameCanvas from "~/components/GameCanvas";
import AutoCollector from "~/components/AutoCollector";

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

export default function Frame() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();

  const [added, setAdded] = useState(false);

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

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <>
      <head>
        <meta property="og:title" content={PROJECT_TITLE} />
        <meta property="og:description" content={PROJECT_DESCRIPTION} />
        <meta property="og:image" content={`${baseUrl}/api/og`} />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content={`${baseUrl}/api/og`} />
        <meta property="fc:frame:post_url" content={`${baseUrl}/api/post`} />
      </head>
      <div
        style={{
          paddingTop: context?.client.safeAreaInsets?.top ?? 0,
          paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
          paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
          paddingRight: context?.client.safeAreaInsets?.right ?? 0,
        }}
      >
        <div className="w-[300px] mx-auto py-2 px-2">
          <GameCanvas />
          <AutoCollector />
          <div className="mt-4 flex justify-center">
            <PurpleButton 
              onClick={() => {
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
                const hash = sha256(base64State + PROJECT_ID);
                url.searchParams.set('hash', hash);

                navigator.clipboard.writeText(url.toString());
              }}
            >
              Share Progress
            </PurpleButton>
          </div>
        </div>
      </div>
    </>
  );
}
