"use client";

import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";

import { Body } from "./body";

export const Sales: React.FC = () => {
  return (
    <Suspense fallback={<Loader2 className="my-4 h-8 w-8 animate-spin" />}>
      <Body />
    </Suspense>
  );
};
