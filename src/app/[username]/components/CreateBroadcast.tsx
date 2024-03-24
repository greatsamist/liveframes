"use client";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { createBroadcastAction } from "@/lib/actions/createBrodcastAction";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

interface IFramecast {
  playbackId: string;
  streamKey: string;
  name: string;
}

const CreateBroadcast = () => {
  const [framecastName, setFramecastName] = useState("");
  const [mintFee, setMintFee] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [framecast, setFramecast] = useState<IFramecast>({
    playbackId: "27c5kyopnlcayyyj",
    streamKey: "27c5-ji06-t3bu-mdoq",
    name: "Eric Stream",
  });

  //
  // console.log("createStream", createStream);
  // if (!createStream) return notFound();

  const handleCreateBroadcast = async (e: any) => {
    e.preventDefault();
    try {
      const frameCast = await createBroadcastAction({ name: framecastName });
      console.log(frameCast);
      setFramecast(frameCast);
      toast.success("Liveframe created successfully");
    } catch (error) {
      toast.error("Failed to create  Liveframe");
    }
  };
  console.log(framecast);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Liveframe</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {framecast ? "Liveframe created" : "Create a Liveframe"}
          </DialogTitle>
          <DialogDescription>
            {framecast ? "" : "Enter Liveframe details and go live."}
          </DialogDescription>
        </DialogHeader>
        <div>
          {framecast ? (
            <div>
              {/* <h2>Framecast created successfully</h2> */}
              <p>
                Share LiveFrame url:{" "}
                {`${window.location.origin}/live?id=${
                  framecast?.playbackId
                }&addr=${"0xaddress"}`}
              </p>
              <Link
                href={`/broadcast?&key=${framecast.streamKey}&name=${framecast.name}`}
              >
                <Button>Start LiveFrame</Button>
              </Link>
            </div>
          ) : (
            <form className="flex flex-col gap-3">
              <Label>Liveframe name</Label>
              <Input
                placeholder="name"
                onChange={(e) => setFramecastName(e.target.value)}
              />

              <Label>Mint Fee</Label>
              <Input
                placeholder="Enter Mint Fee"
                onChange={(e) => setMintFee(e.target.value)}
              />

              <Label>Cover url</Label>
              <Input
                placeholder="https://your-cover-url"
                onChange={(e) => setCoverUrl(e.target.value)}
              />

              <Button onClick={handleCreateBroadcast}>Create</Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBroadcast;
