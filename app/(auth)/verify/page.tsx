"use client";
import VerifyBox from "@/components/component/VerifyBox";
import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const Page = () => {
  const { user } = useUser();

  return (
    <>
      <div className='bg-blue-700 h-screen flex flex-col gap-4 justify-center items-center'>
        <div className=''>
          <h1 className='text-2xl font-bold'>
            {user?.firstName} ,Pick the option that best suits you:
          </h1>
        </div>
        <div className='flex flex-wrap gap-4 justify-center items-center'>
          <VerifyBox
            type='Student'
            src='/student.png'
          />
          <VerifyBox
            type='School'
            src='/school.png'
          />
          <VerifyBox
            type='Business'
            src='/enterprise.png'
          />
          <VerifyBox
            type='Government'
            src='/government.png'
          />
        </div>
      </div>
    </>
  );
};

export default Page;
