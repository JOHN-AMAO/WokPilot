import Image from "next/image";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";

const UserImage = async () => {
  const user = await currentUser();
  return (
    <div>
      <Image
        src={user?.imageUrl || "/placeholder-user.jpg"}
        width={50}
        height={50}
        alt='user image'
      />
    </div>
  );
};

export default UserImage;
