import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const createRadarChart = (dataObject, chartLabel) => {
  const data = Object.entries(dataObject).map(([subject, value]) => ({
    subject,
    A: value,
  }));

  return (
    <ResponsiveContainer width="100%" height={450}> {/* Increased height to accommodate label */}
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar
          name="Values"
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        {/* Chart-wide label positioned above the chart */}
        <text
          x="50%"
          y="20"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="1.2em"
          fill="#000"
        >
          {chartLabel}
        </text>
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default createRadarChart;
