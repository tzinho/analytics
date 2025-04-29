"use client";

import { Bell } from "lucide-react";

import { Button } from "~/components/ui/button";
import { ModeToggle } from "../mode-toggle";

export const Navbar = () => {
  return (
    <div className="bg-primary flex items-center justify-between p-4">
      <div className="hidden">
        <h2 className="text-3xl font-bold">Mercatudo</h2>
      </div>

      <div className="flex w-full justify-end gap-3">
        <Button variant="ghost">
          <Bell />
        </Button>

        <ModeToggle />
      </div>
    </div>
  );
};
