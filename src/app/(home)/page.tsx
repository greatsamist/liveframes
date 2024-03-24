"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Home = () => {
  const { ready, authenticated, login, user } = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);
  const router = useRouter();

  useEffect(() => {
    if (user?.farcaster) {
      router.push(`/${user?.farcaster.username}`);
    }
  }, [user]);

  return (
    <div className="h-screen w-screen justify-center items-center flex flex-col">
      <h1 className="text-4xl text-green-600 font-bold">
        Welcome to LiveFrames
      </h1>
      {!authenticated && (
        <button
          className="mt-10 rounded-xl text-sm font-medium border border-green-600 p-3"
          disabled={disableLogin}
          onClick={login}
        >
          Log in
        </button>
      )}
    </div>
  );
};

export default Home;

// imporloginMethodsAndOrderable{ DEFAULT_DEBUGGER_HUB_URL, createDebugUrl } from "@/lib/debug";
// import { currentURL } from "@/lib/utils";
// import {
//   FrameButton,
//   FrameContainer,
//   FrameImage,
//   FrameInput,
//   FrameReducer,
//   NextServerPageProps,
//   getFrameMessage,
//   getPreviousFrame,
//   useFramesReducer,
// } from "frames.js/next/server";
// import Link from "next/link";
// // import { DEFAULT_DEBUGGER_HUB_URL, createDebugUrl } from "./debug";

// type State = {
//   active: string;
//   total_button_presses: number;
// };

// const initialState = { active: "1", total_button_presses: 0 };

// const reducer: FrameReducer<State> = (state, action) => {
//   return {
//     total_button_presses: state.total_button_presses + 1,
//     active: action.postBody?.untrustedData.buttonIndex
//       ? String(action.postBody?.untrustedData.buttonIndex)
//       : "1",
//   };
// };

// // This is a react server component only
// export default async function Home({ searchParams }: NextServerPageProps) {
//   const url = currentURL("/");
//   const previousFrame = getPreviousFrame<State>(searchParams);

//   const frameMessage = await getFrameMessage(previousFrame.postBody, {
//     hubHttpUrl: DEFAULT_DEBUGGER_HUB_URL,
//   });

//   if (frameMessage && !frameMessage?.isValid) {
//     throw new Error("Invalid frame payload");
//   }

//   const [state, dispatch] = useFramesReducer<State>(
//     reducer,
//     initialState,
//     previousFrame
//   );

//   // Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
//   // example: load the users credentials & check they have an NFT

//   console.log("info: state is:", state);

//   // then, when done, return next frame
//   return (
//     <div className="p-4">
//       frames.js starter kit. The Template Frame is on this page, it&apos;s in
//       the html meta tags (inspect source).{" "}
//       <Link href={createDebugUrl(url)} className="underline">
//         Debug
//       </Link>{" "}
//       or see{" "}
//       <Link href="/examples" className="underline">
//         other examples
//       </Link>
//       <FrameContainer
//         postUrl="/frames"
//         pathname="/"
//         state={state}
//         previousFrame={previousFrame}
//       >
//         {/* <FrameImage src="https://framesjs.org/og.png" /> */}
//         <FrameImage aspectRatio="1.91:1">
//           <div tw="w-full h-full bg-slate-700 text-white justify-center items-center flex flex-col">
//             <div tw="flex flex-row">
//               {frameMessage?.inputText ? frameMessage.inputText : "Hello world"}
//             </div>
//             {frameMessage && (
//               <div tw="flex flex-col">
//                 <div tw="flex">
//                   Requester is @{frameMessage.requesterUserData?.username}{" "}
//                 </div>
//                 <div tw="flex">
//                   Requester follows caster:{" "}
//                   {frameMessage.requesterFollowsCaster ? "true" : "false"}
//                 </div>
//                 <div tw="flex">
//                   Caster follows requester:{" "}
//                   {frameMessage.casterFollowsRequester ? "true" : "false"}
//                 </div>
//                 <div tw="flex">
//                   Requester liked cast:{" "}
//                   {frameMessage.likedCast ? "true" : "false"}
//                 </div>
//                 <div tw="flex">
//                   Requester recasted cast:{" "}
//                   {frameMessage.recastedCast ? "true" : "false"}
//                 </div>
//               </div>
//             )}
//           </div>
//         </FrameImage>
//         <FrameInput text="put some text here" />
//         <FrameButton>
//           {state?.active === "1" ? "Active" : "Inactive"}
//         </FrameButton>
//         <FrameButton>
//           {state?.active === "2" ? "Active" : "Inactive"}
//         </FrameButton>
//         <FrameButton action="link" target={`https://www.google.com`}>
//           External
//         </FrameButton>
//       </FrameContainer>
//     </div>
//   );
// }
