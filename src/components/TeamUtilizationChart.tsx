"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

type Engineer = {
  name: string;
  status: number;
};

type TeamUtilizationChartProps = {
  engineers: Engineer[];
};

const TeamUtilizationChart = ({ engineers }: TeamUtilizationChartProps) => {
  const data = {
    labels: ["Available", "Partially Allocated", "Fully Allocated"],
    datasets: [
      {
        label: "# of Engineers",
        data: [
          engineers.filter((e) => e.status < 30).length,
          engineers.filter((e) => e.status >= 30 && e.status < 100).length,
          engineers.filter((e) => e.status === 100).length,
        ],
        backgroundColor: ["#10b981", "#f59e0b", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Team Utilization</CardTitle>
      </CardHeader>
      <CardContent>
        <Pie data={data} />
      </CardContent>
    </Card>
  );
};

export default TeamUtilizationChart;
