"use client";
import "./styles/LineChart.css";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"

const BackupData = [
  { hour: "January", desktop: 186, mobile: 80 },
  { hour: "February", desktop: 305, mobile: 200 },
  { hour: "March", desktop: 237, mobile: 120 },
  { hour: "April", desktop: 73, mobile: 190 },
  { hour: "May", desktop: 209, mobile: 130 },
  { hour: "June", desktop: 214, mobile: 140 },
]


export default function ChartLineMultiple({weatherData}:{weatherData: any}) {
    const data= weatherData || BackupData
    console.log(weatherData)
  return (
    <div className="line-Chart-card">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: -25, right: 18, top: 10, bottom: 2 }}>
            <CartesianGrid vertical={false} stroke="#e5e7eb68" />
            <XAxis dataKey="hour" tickLine={false} axisLine={false} tick={{ fill: "#ffffffff", fontSize: 14 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "#ffffffff", fontSize: 12 }} />
            <Line dataKey="cloud_cover" type="monotone" stroke="#13d1e6ff" strokeWidth={3} dot={false} />
            <Line dataKey="precipitation_probability" type="monotone" stroke="#05a3b8ff" strokeWidth={3} dot={false} />
            <Line dataKey="humidity" type="monotone" stroke="#0de974ff" strokeWidth={3} dot={false} />
            <Line dataKey="uvIndex" type="monotone" stroke="#9c3bf6ff" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
    </div>
  )
}