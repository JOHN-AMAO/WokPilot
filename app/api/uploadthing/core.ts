import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error();
  }
  return { userId: userId };
};

export const ourFileRouter = {
  projectImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  messageFile: f(["image", "pdf", "video"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
