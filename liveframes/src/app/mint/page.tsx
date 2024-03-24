import Link from "next/link";
import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";
import { currentURL, vercelURL } from "@/lib/utils";
import { createDebugUrl } from "@/lib/debug";

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: "Mint liveframes NFT",
//     description: "Mint liveframes NFT",
//     other: {
//       ...(await fetchMetadata(
//         new URL("/mint/frames", vercelURL() || "http://localhost:3000")
//       )),
//     },
//   };
// }

export default async function Home() {
  const url = currentURL("/mint");

  return (
    <div>
      Mint Liveframe{" "}
      <Link href={createDebugUrl(url)} className="underline">
        Debug
      </Link>
    </div>
  );
}
