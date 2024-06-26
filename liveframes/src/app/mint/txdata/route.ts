import { liveframesNFTAbi } from "@/lib/contracts/LiveframesNFTAbi";
import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";
import {
  Abi,
  createPublicClient,
  encodeFunctionData,
  getContract,
  http,
} from "viem";
import { baseSepolia } from "viem/chains";

export async function POST(
  req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
  const json = await req.json();
  const playbackId = req.nextUrl.searchParams.get("playbackId");
  const address = req.nextUrl.searchParams.get("address") as `0x${string}`;
  const frameMessage = await getFrameMessage(json);

  if (!frameMessage) {
    throw new Error("No frame message");
  }

  // Get current storage price
  //   const units = 0n;

  const calldata = encodeFunctionData({
    abi: liveframesNFTAbi,
    functionName: "mint",
    args: [],
  });

  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });

  const liveframe = getContract({
    address: "0x7459BA66b289a8EFB4bD6aD32Fa12d96C7F4E7ea",
    abi: liveframesNFTAbi,
    client: publicClient,
  });

  const unitPrice = await liveframe.read.mintFee();

  return NextResponse.json({
    chainId: "eip155:84532", // baseSepolia 84532
    method: "eth_sendTransaction",
    params: {
      abi: liveframesNFTAbi as Abi,
      to: address,
      data: calldata,
      value: "0",
    },
  });
}
