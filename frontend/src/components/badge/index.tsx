import React from "react";
import { BadgeProps } from "@/components/badge/types";

const Badge: React.FC<BadgeProps> = ({ text }) => {
  return (
    <div className="inline-block bg-green-100 text-green-800 text-lg font-semibold mr-2 px-2.5 py-0.5 rounded">
      <span>{text}</span>
    </div>
  );
};

export default Badge;
