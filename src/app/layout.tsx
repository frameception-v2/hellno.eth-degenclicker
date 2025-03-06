/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import { getSession } from "~/auth";
import { ThemeProviderClient } from "~/components/providers/theme-provider-client";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { PROJECT_TITLE, PROJECT_DESCRIPTION } from "~/lib/constants";
import "~/app/globals.css";
import { Providers } from "~/app/providers";
import { AppSidebar } from "~/components/app-sidebar";
import { NavActions } from "~/components/nav-actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";

const appUrl =
  process.env.NEXT_PUBLIC_URL ||
  `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;

export const metadata: Metadata = {
  title: PROJECT_TITLE,
  description: PROJECT_DESCRIPTION,
  metadataBase: new URL(appUrl),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en">
      <body className="cyberpunk-theme">
        <style jsx global>{`
          :root {
            --neon-purple: #bc13fe;
            --neon-cyan: #00f3ff;
            --cyber-gradient: linear-gradient(
              135deg,
              var(--neon-purple) 0%,
              var(--neon-cyan) 100%
            );
            --bg-pulse: linear-gradient(
              45deg,
              #0a0a0a 0%,
              #1a1a1a 50%,
              #0a0a0a 100%
            );
          }

          .cyberpunk-theme {
            background: var(--bg-pulse),
              radial-gradient(circle at center, var(--neon-purple) 0%, #000 70%);
            background-blend-mode: screen;
            color: var(--neon-purple);
            animation: bg-pulse 5s infinite;
          }

          @keyframes bg-pulse {
            0% { background-size: 100% 100%, auto; }
            50% { background-size: 150% 150%, auto; }
            100% { background-size: 100% 100%, auto; }
          }

          .cyberpunk-theme h1, .cyberpunk-theme h2, .cyberpunk-theme h3 {
            text-shadow: 0 0 10px var(--neon-purple),
                         0 0 20px var(--neon-purple),
                         0 0 30px var(--neon-cyan);
          }

          .cyberpunk-theme::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
              0deg,
              rgba(188, 19, 254, 0.1) 0px,
              rgba(188, 19, 254, 0.1) 2px,
              transparent 2px,
              transparent 4px
            );
            pointer-events: none;
            z-index: 1;
          }
        `}</style>
        <ThemeProviderClient>
          <Providers session={session}>
            <SidebarProvider>
              {/* <AppSidebar /> */}
              <SidebarInset>
                <header className="flex h-14 shrink-0 items-center gap-2">
                  <div className="flex flex-1 items-center gap-2 px-3">
                    {/* 
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                  */}
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbPage className="ml-2 line-clamp-1">
                            {PROJECT_TITLE}
                          </BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                  <div className="ml-auto px-3 flex items-center gap-2">
                    <ThemeToggle />
                    <NavActions />
                  </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 px-4 py-10">
                  {children}
                  {/* <div className="mx-auto h-24 w-full max-w-3xl rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50" />
                <div className="mx-auto h-full w-full max-w-3xl rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50" /> 
                */}
                </div>
              </SidebarInset>
            </SidebarProvider>
          </Providers>
        </ThemeProviderClient>
      </body>
    </html>
  );
}
