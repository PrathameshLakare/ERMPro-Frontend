import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";
import { useEngineers } from "@/context/EngineerContext";
import { useProjects } from "@/context/ProjectsContext";
import Sidebar from "@/components/layout/Sidebar";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const AnalyticsPage = () => {
  const engineerContext = useEngineers();
  const engineers = engineerContext?.engineers ?? [];

  const projectContext = useProjects();
  const projects = projectContext?.projects ?? [];

  const utilizationData = {
    labels: [
      "Available (>70% free)",
      "Partially Allocated (1%-70% free)",
      "Fully Allocated (0% free)",
    ],
    datasets: [
      {
        label: "Number of Engineers",
        data: [
          engineers.filter((e) => e.availableCapacity / e.maxCapacity > 0.7)
            .length,
          engineers.filter(
            (e) =>
              e.availableCapacity / e.maxCapacity <= 0.7 &&
              e.availableCapacity > 0
          ).length,
          engineers.filter((e) => e.availableCapacity === 0).length,
        ],
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };

  const projectStatusCounts = {
    planning: projects.filter((p) => p.status === "planning").length,
    active: projects.filter((p) => p.status === "active").length,
    completed: projects.filter((p) => p.status === "completed").length,
  };

  const projectStatusData = {
    labels: ["Planning", "Active", "Completed"],
    datasets: [
      {
        label: "Projects",
        data: [
          projectStatusCounts.planning,
          projectStatusCounts.active,
          projectStatusCounts.completed,
        ],
        backgroundColor: ["#fbbf24", "#3b82f6", "#10b981"],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Project Status Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          stepSize: 1,
          callback: function (value: number) {
            return Number.isInteger(value) ? value : null;
          },
        },
        min: 0,
      },
    },
  };

  return (
    <Sidebar>
      <div className="p-6 space-y-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="h-[350px]">
            <CardHeader>
              <CardTitle>Team Utilization</CardTitle>
            </CardHeader>
            <CardContent className="h-[280px]">
              <div className="h-full">
                <Pie
                  data={utilizationData}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="h-[350px]">
            <CardHeader>
              <CardTitle>Project Status</CardTitle>
            </CardHeader>
            <CardContent className="h-[280px]">
              <div className="h-full">
                <Bar options={barOptions} data={projectStatusData} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Sidebar>
  );
};

export default AnalyticsPage;
