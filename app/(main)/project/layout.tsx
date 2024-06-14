import NavigationSidebar from "@/components/NavigationSidebar";
import ProjectNavigation from "@/components/ProjectNavigation";
import { SeparatorVerticalIcon } from "lucide-react";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full dark:bg-black'>
      <div className='hidden md:flex h-full  z-30 flex-row fixed inset-y-0'>
        <ProjectNavigation />
        <NavigationSidebar />
        <SeparatorVerticalIcon className='h-full bg-zinc-300 dark:bg-zinc-900 w-1' />
      </div>
      <main className='md:pl-[100px] h-full'>{children}</main>
    </div>
  );
};

export default MainLayout;
