"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";

export const HeroTransitions = () => {
  return (
    <div className='mt-4'>
      <TypeAnimation
        className='font-extabold text-2xl sm:text-md'
        preRenderFirstString={true}
        sequence={[
          500,
          "to collaborate", // initially rendered starting point
          1000,
          "to build and manage Teams",
          1000,
          "to build and manage Projects",
          1000,
          "be productive",
          500,
        ]}
        speed={50}
        style={{ fontSize: "4em" }}
        repeat={Infinity}
      />
    </div>
  );
};

export const HeroTransitions2 = () => {
  return (
    <div className='text-xl'>
      <TypeAnimation
        className='font-extabod'
        preRenderFirstString={true}
        sequence={[
          500,
          "every thing you need to be productive", // initially rendered starting point
          1000,
          "for seamless communication",
          1000,
          "for chat , live meetings, audio hangouts",
          1000,
          "for task management",
          1000,
          "for you and your team",
          1000,
          "for cross-team collaboration",
          500,
        ]}
        speed={50}
        repeat={Infinity}
      />
    </div>
  );
};
