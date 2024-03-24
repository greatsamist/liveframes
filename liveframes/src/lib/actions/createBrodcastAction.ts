"use server";

export const createBroadcastAction = async ({ name }: { name: string }) => {
  try {
    const response = await fetch("https://livepeer.studio/api/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LIVEPEER_API_KEY}`,
      },
      body: JSON.stringify({
        name,
        record: true,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error creating stream:", error);
    throw new Error("Error creating stream");
  }
};
