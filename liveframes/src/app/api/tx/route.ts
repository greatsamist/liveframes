import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";
import {
  Abi,
  createPublicClient,
  encodeFunctionData,
  getContract,
  http,
} from "viem";
import type { FrameTransactionResponse } from "@coinbase/onchainkit/frame";
import { liveframesNFTAbi } from "@/lib/contracts/LiveframesNFTAbi";

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const body: FrameRequest = await req.json();
  const address = req.nextUrl.searchParams.get("address") as `0x${string}`;

  if (!address) {
    return new NextResponse("Missing nft address", { status: 400 });
  }

  const calldata = encodeFunctionData({
    abi: liveframesNFTAbi,
    functionName: "mint",
    args: [],
  });
  const txData: FrameTransactionResponse = {
    chainId: "eip155:84532", // baseSepolia 84532
    method: "eth_sendTransaction",
    params: {
      abi: liveframesNFTAbi as Abi,
      to: address ?? "0x7459BA66b289a8EFB4bD6aD32Fa12d96C7F4E7ea",
      data: calldata,
      value: "0",
    },
  };

  return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
