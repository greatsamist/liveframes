/* eslint-disable react/jsx-key */
import { vercelURL } from "@/lib/utils";
import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit/frame";
import { createFrames } from "frames.js/next";
import { NextRequest, NextResponse } from "next/server";

const frames = createFrames({
  basePath: "/mint",
});

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();

  const playbackId = req.nextUrl.searchParams.get("playbackId");
  const address = req.nextUrl.searchParams.get("address");
  const { isValid } = await getFrameMessage(body);
  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  if (body.untrustedData.transactionId) {
    return new NextResponse(
      getFrameHtmlResponse({
        image: {
          src: `${vercelURL}/liveframeslogo.png`,
        },
        buttons: [
          {
            label: " Go to stream",
            action: "link",
            target: `${vercelURL}/live?playbackId=${playbackId}&address=${address}`,
          },
        ],
      })
    );
  } else {
    return new NextResponse(
      getFrameHtmlResponse({
        image: {
          src: `${vercelURL}/liveframeslogo.png`,
        },
        buttons: [
          {
            label: " Go to stream",
            action: "tx",
            target: `/txdata?playbackId=${playbackId}&address=${address}`,
            postUrl: "/frames",
          },
        ],
      })
    );
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}
