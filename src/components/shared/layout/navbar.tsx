"use client";

import { Bell } from "lucide-react";

import { Button } from "~/components/ui/button";
import { ModeToggle } from "../mode-toggle";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <h2 className="text-3xl font-bold">Mercatudo</h2>
      </div>

      <div className="hidden gap-3 md:flex">
        <Button variant="ghost">
          <Bell />
        </Button>

        <ModeToggle />
      </div>
    </div>
  );
};
