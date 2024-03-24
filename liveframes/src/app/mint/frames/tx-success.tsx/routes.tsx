/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../route";

//@ts-ignore
const handleRequest = frames(async (ctx) => {
  if (ctx?.message?.transactionId) {
    return {
      image: (
        <div tw="flex">Transaction submitted! {ctx.message.transactionId}</div>
      ),
      buttons: [
        <Button
          action="link"
          target={`https://www.onceupon.gg/tx/${ctx.message.transactionId}`}
        >
          View on block explorer
        </Button>,
      ],
    };
  }
});

export const GET = handleRequest;
export const POST = handleRequest;
