"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import HttpStatus from "http-status-codes";
import { FarmForm } from "@/components/form";
import { FormData } from "@/components/form/types";
import Menu from "@/components/menu";

export default function Index() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const addFarm = async (formData: FormData) => {
    try {
      const response = await fetch("http://localhost:3002/api/farms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.status === HttpStatus.CREATED) {
        console.log("Farm created successfully:", result);
        router.push("/farms");
      } else {
        setError(result.message || "Failed to create resource.");
      }
    } catch (err) {
      setError("An error occurred while creating the farm.");
    }
  };

  return (
    <div className="w-full max-w-7xl m-auto">
      <Menu />

      {error && <p className="text-red-500">Error: {error}</p>}
      <FarmForm handleSubmit={addFarm} />
    </div>
  );
}
