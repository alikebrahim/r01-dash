import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const CreateRadarChart = (dataObject, chartLabel) => {
  const data = Object.entries(dataObject).map(([subject, value]) => ({
    subject,
    A: value,
  }));

  return (
    <ResponsiveContainer width="100%" height={450}>
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

const CreatePieChart = ({ auditPass, auditFail }) => {
  let pass = auditPass.aggregate.count
  let fail = auditFail.aggregate.count

  const data = [
    { name: 'Pass', value: pass },
    { name: 'Fail', value: fail },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div class="row justify-content-center align-items-center" >
      <ResponsiveContainer width={400} height={400}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export { CreatePieChart, CreateRadarChart };
