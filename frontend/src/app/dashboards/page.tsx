"use client";
import React, { useEffect, useState } from "react";
import Menu from "@/components/menu"; // Adjust the import path as necessary
import HttpStatus from "http-status-codes";
import PieChart from "@/components/pie-chart"; // Adjust the import path as necessary
import Badge from "@/components/badge"; // Adjust the import path as necessary

const Dashboard: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [totalOfFarms, setTotalOfFarms] = useState<number>(0);
  const [totalArea, setTotalArea] = useState<number>(0);
  const [percentageByState, setPercentageByState] = useState<
    { state: string; percentage: number }[]
  >([]);
  const [percentageByLandUse, setPercentageByLandUse] = useState<
    { land_type: string; percentage: number }[]
  >([]);
  const [percentageByCropType, setPercentageByCropType] = useState<
    { crop: string; percentage: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/dashboards");
        const result = await response.json();

        console.log("francys result: ", result);
        if (response.status === HttpStatus.OK) {
          const {
            totalOfFarms,
            totalArea,
            percentageByState,
            percentageByLandUse,
            percentageByCropType,
          } = result;

          setTotalOfFarms(totalOfFarms);
          setTotalArea(totalArea);
          setPercentageByState(percentageByState);
          setPercentageByLandUse(percentageByLandUse);
          setPercentageByCropType(percentageByCropType);
        } else {
          setError(result.message || "Failed to fetch data.");
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-7xl m-auto">
      <Menu currentMenu="dashboards" />
      <div className="p-4">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="flex justify-center mb-8">
              <Badge
                text={`Total de Fazendas em quantidade: ${totalOfFarms}`}
              />
              <Badge text={`Área Total em hectares: ${totalArea}`} />
            </div>
            <div className="flex justify-around">
              <PieChart
                title="Porcentagem por Estado"
                data={percentageByState.map((item) => ({
                  label: item.state,
                  value: item.percentage,
                }))}
              />
              <PieChart
                title="Porcentagem por Uso da Terra"
                data={percentageByLandUse.map((item) => ({
                  label: item.land_type,
                  value: item.percentage,
                }))}
              />
              <PieChart
                title="Porcentagem por Tipo de Cultura"
                data={percentageByCropType.map((item) => ({
                  label: item.crop,
                  value: item.percentage,
                }))}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
