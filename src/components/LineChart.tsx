"use client";
import "./styles/LineChart.css";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const BackupData = [
  { hour: "January", desktop: 186, mobile: 80 },
  { hour: "February", desktop: 305, mobile: 200 },
  { hour: "March", desktop: 237, mobile: 120 },
  { hour: "April", desktop: 73, mobile: 190 },
  { hour: "May", desktop: 209, mobile: 130 },
  { hour: "June", desktop: 214, mobile: 140 },
];

export default function ChartLineMultiple({
  weatherData,
}: {
  weatherData: any;
}) {


  type CustomTooltipProps = {
    active?: boolean;
    payload?: any[];
    label?: any;
  };

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: any[];
    label?: any;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry: any, index: any) => {
            return (
              <p key={index} className="tooltip-value">
                {`${entry.dataKey}: ${entry.value}%`}
              </p>
            );
          })}
        </div>
      );
    }
  };


  const data = weatherData || BackupData;
  console.log(weatherData);
  return (
    <div className="line-Chart-card">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ left: -25, right: 18, top: 16, bottom: 2 }}
        >
          <CartesianGrid vertical={false} stroke="#e5e7eb68" />
          <XAxis
            dataKey="hour"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#ffffffff", fontSize: 12 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#ffffffff", fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            dataKey="cloud_cover"
            type="monotone"
            stroke="#13d1e6ff"
            strokeWidth={4}
            dot={false}
          />
          <Line
            dataKey="precipitation_probability"
            type="monotone"
            stroke="#05a3b8ff"
            strokeWidth={4}
            dot={false}
          />
          <Line
            dataKey="humidity"
            type="monotone"
            stroke="#0de974ff"
            strokeWidth={4}
            dot={false}
          />
          <Line
            dataKey="uvIndex"
            type="monotone"
            stroke="#9c3bf6ff"
            strokeWidth={4}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
