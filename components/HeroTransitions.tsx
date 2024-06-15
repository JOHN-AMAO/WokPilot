"use client";
import React from "react";
import TextTransition, { presets } from "react-text-transition";

const TEXTS = [
  "to manage Teams",
  "to build products",
  "to collaborate",
  "to do great Work",
];

export const HeroTransitions = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <h1 className='text-3xl mt-2 font-bold sm:text-3xl md:text-4xl xl:text-6xl/none bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-sm'>
      <TextTransition>{TEXTS[index % TEXTS.length]}</TextTransition>
    </h1>
  );
};
