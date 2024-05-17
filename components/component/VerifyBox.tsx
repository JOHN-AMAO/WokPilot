// @ts-ignore
"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const VerifyBox = ({ type, src }: any) => {
  const { user } = useUser();
  const createUser = useMutation(api.users.createUser);

  const [nostyle, onClickStyle] = useState("");
  return (
    <>
      <button
        onClick={() => {
          onClickStyle("border-blue-800 border-4");
          createUser({
            userId: user?.id,
            userType: type,
          });
        }}
      >
        <div
          className={`flex items-center justify-center ${nostyle} flex-col min-h-48 min-w-48 bg-white rounded-lg `}
        >
          <Image
            src={src}
            width={50}
            height={50}
            alt='looplearn verification image'
          />
          <h2 className='text-2xl text-blue-800'>{type}</h2>
        </div>
      </button>
    </>
  );
};

export default VerifyBox;
