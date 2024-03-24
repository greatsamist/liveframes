"use client";

import { PrivyProvider as Provider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig } from "@privy-io/wagmi";
import { baseSepolia } from "viem/chains";
import { http } from "wagmi";
import { WagmiProvider } from "@privy-io/wagmi";

// Replace this with your app's required chains
export default function PrivyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = createConfig({
    chains: [baseSepolia], // Pass your required chains as an array
    transports: {
      [baseSepolia.id]: http(),

      // For each of your required chains, add an entry to `transports` with
      // a key of the chain's `id` and a value of `http()`
    },
  });
  const queryClient = new QueryClient();
  return (
    <Provider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: "https://liveframes.vercel.app/liveframeslogo.png",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        // loginMethods: ["farcaster"],
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>{children}</WagmiProvider>
      </QueryClientProvider>
    </Provider>
  );
}
