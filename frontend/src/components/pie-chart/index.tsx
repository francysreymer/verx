import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { PieChartProps } from "@/components/pie-chart/types";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart: React.FC<PieChartProps> = ({ title, data }) => {
  const transformedData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Porcentagem",
        data: data.map((item) => item.value),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-1/3 mx-auto">
      <h2 className="text-center text-xl font-bold mb-4">{title}</h2>
      <Pie data={transformedData} />
    </div>
  );
};

export default PieChart;
