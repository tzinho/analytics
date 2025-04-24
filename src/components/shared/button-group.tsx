import React from "react";

import { cn } from "~/lib/utils";
import { Dates } from "~/types/sales";
import { Button } from "../ui/button";

interface ButtonGroupProps extends React.ComponentProps<"div"> {
  onChange: (dateSearch: Dates) => void;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  onChange,
  className,
}) => {
  return (
    <div className={cn("inline-flex rounded-md shadow-xs", className)}>
      <button
        onClick={() => onChange(Dates.Day)}
        className="rounded-s-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
      >
        1 dia
      </button>
      <button
        onClick={() => onChange(Dates.Week)}
        className="border-t border-b border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
      >
        7 dias
      </button>
      <button
        onClick={() => onChange(Dates.Month)}
        className="rounded-e-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
      >
        30 dias
      </button>
    </div>
  );
};
