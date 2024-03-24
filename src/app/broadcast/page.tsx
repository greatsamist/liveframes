import React from "react";
import { EnableVideoIcon, StopIcon } from "@livepeer/react/assets";
import * as Broadcaster from "@livepeer/react/broadcast";
import { getIngest } from "@livepeer/react/external";
import { createBroadcastAction } from "@/lib/actions/createBrodcastAction";
import { notFound } from "next/navigation";

const Broadcast = ({
  searchParams,
}: {
  searchParams: { key: string; name: string };
}) => {
  if (!searchParams.key) return notFound();
  return (
    <Broadcaster.Root ingestUrl={getIngest(searchParams.key)}>
      <Broadcaster.Container className="h-full w-full bg-gray-950">
        <Broadcaster.Video
          title={searchParams.name ?? "Live"}
          className="h-full w-full"
        />

        <Broadcaster.Controls className="flex items-center justify-center">
          <Broadcaster.EnabledTrigger className="w-10 h-10 hover:scale-105 flex-shrink-0">
            <Broadcaster.EnabledIndicator asChild matcher={false}>
              <EnableVideoIcon className="w-full h-full" />
            </Broadcaster.EnabledIndicator>
            <Broadcaster.EnabledIndicator asChild>
              <StopIcon className="w-full h-full" />
            </Broadcaster.EnabledIndicator>
          </Broadcaster.EnabledTrigger>
        </Broadcaster.Controls>

        <Broadcaster.LoadingIndicator asChild matcher={false}>
          <div className="absolute overflow-hidden py-1 px-2 rounded-full top-1 left-1 bg-black/50 flex items-center backdrop-blur">
            <Broadcaster.StatusIndicator
              matcher="live"
              className="flex gap-2 items-center"
            >
              <div className="bg-red-500 animate-pulse h-1.5 w-1.5 rounded-full" />
              <span className="text-xs select-none">LIVE</span>
            </Broadcaster.StatusIndicator>

            <Broadcaster.StatusIndicator
              className="flex gap-2 items-center"
              matcher="pending"
            >
              <div className="bg-white/80 h-1.5 w-1.5 rounded-full animate-pulse" />
              <span className="text-xs select-none">LOADING</span>
            </Broadcaster.StatusIndicator>

            <Broadcaster.StatusIndicator
              className="flex gap-2 items-center"
              matcher="idle"
            >
              <div className="bg-white/80 h-1.5 w-1.5 rounded-full" />
              <span className="text-xs select-none">IDLE</span>
            </Broadcaster.StatusIndicator>
          </div>
        </Broadcaster.LoadingIndicator>
      </Broadcaster.Container>
    </Broadcaster.Root>
  );
};

export default Broadcast;
