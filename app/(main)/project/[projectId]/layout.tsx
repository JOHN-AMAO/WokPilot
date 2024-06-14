import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import ServerSidebar from "@/components/ServerSidebar";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { projectId: string };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    redirect("/sign-in");
  }

  const project = db.project.findUnique({
    where: {
      id: params.projectId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (!project) {
    redirect("/");
  }

  return (
    <>
      <div className='h-full'>
        {/* <div className='hidden md:flex h-full w-60 z-20 flex-col inset-y-0 fixed'>
          <ServerSidebar projectId={params.projectId} />
        </div> */}
        <main className='h-full md:pl-60'>{children}</main>
      </div>
    </>
  );
};

export default ServerIdLayout;
