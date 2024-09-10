"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import HttpStatus from "http-status-codes";
import { FarmForm } from "@/components/form";
import { FormData } from "@/components/form/types";
import Menu from "@/components/menu";

export default function Index() {
  const router = useRouter();
  const { id } = useParams();

  const [initialFormData, setInitialFormData] = useState<FormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFarmData = async () => {
      if (id) {
        try {
          const response = await fetch(`http://localhost:3002/api/farms/${id}`);
          const data = await response.json();
          if (response.status === HttpStatus.OK) {
            setInitialFormData(data);
          } else {
            setError(data.message || "Failed to fetch farm data.");
          }
        } catch (err) {
          setError("An error occurred while fetching farm data.");
        }
      }
    };

    fetchFarmData();
  }, [id]);

  const editFarm = async (formData: FormData) => {
    try {
      const response = await fetch(`http://localhost:3002/api/farms/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.status === HttpStatus.OK) {
        router.push("/farms");
      } else {
        setError(result.message || "Failed to update resource.");
      }
    } catch (err) {
      setError("An error occurred while updating the farm data.");
    }
  };

  return (
    <div className="w-full max-w-7xl m-auto">
      <Menu />

      {initialFormData ? (
        <FarmForm handleSubmit={editFarm} initialFormData={initialFormData} />
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
