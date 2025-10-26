import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";

// ثبت پلاگین‌ها
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Filler);

const ReportsSection: React.FC<{ vehicles: any[] }> = ({ vehicles }) => {
  const data = {
    labels: vehicles.map((v) => v.name),
    datasets: [
      {
        label: "Distance Traveled (km)",
        data: vehicles.map((v) => v.distance),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const }, // تغییر به مقدار تایپ‌سیف
      title: { display: true, text: "Vehicle Distance Report" },
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Reports
        </Typography>
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  );
};

export default ReportsSection;