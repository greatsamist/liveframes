// import { convertToSlug } from "@/lib/utils";
// import { fdk } from "@/server/pinata";
import { vercelURL } from "@/lib/utils";
import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit/frame";

import { NextRequest, NextResponse } from "next/server";
import { baseSepolia } from "viem/chains";

export const dynamic = "force-dynamic";

// state: {
//   frameId: frame.id,
//   name: frame.name,
//   shop: frame.shop,
//   fid: frame.fid,
// },

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();

  const playbackId = req.nextUrl.searchParams.get("playbackId");
  const address = req.nextUrl.searchParams.get("address");

  const { isValid } = await getFrameMessage(body);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `Go to stream`,
          action: "link",
          target: `${vercelURL}/live?playbackId=${playbackId}&address=${address}`,
        },
      ],
      image: {
        src: `${vercelURL}/liveframeslogo.png`,
      },
      state: {
        transactionId: body?.untrustedData?.transactionId,
      },
      postUrl: `${vercelURL}/live?playbackId=${playbackId}&address=${address}`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
