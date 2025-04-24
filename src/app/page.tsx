import React from "react";

import { HydrateClient } from "~/trpc/server";
import { Sales } from "./_components/sales";

export default async function Home() {
  return (
    <HydrateClient>
      <Sales />
    </HydrateClient>
  );
}
