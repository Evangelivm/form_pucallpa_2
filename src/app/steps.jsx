"use client";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

function Steps({ number }) {
  const [progress, setProgress] = useState(0);
  return (
    <>
      <Progress value={number} />
    </>
  );
}

export default Steps;
