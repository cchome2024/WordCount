import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WordFrequency } from '../types';

interface FrequencyChartProps {
  data: WordFrequency[];
}

const FrequencyChart: React.FC<FrequencyChartProps> = ({ data }) => {
  // Take top 20 for the chart to avoid clutter
  const chartData = data.slice(0, 20);

  if (data.length === 0) return null;

  return (
    <div className="w-full h-[400px] bg-white p-4 rounded-xl shadow-sm border border-slate-200 mt-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Top 20 Frequent Words</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="word" 
            angle={-45} 
            textAnchor="end" 
            height={60} 
            tick={{ fill: '#64748b', fontSize: 12 }}
            interval={0}
            stroke="#cbd5e1"
          />
          <YAxis 
            tick={{ fill: '#64748b', fontSize: 12 }} 
            stroke="#cbd5e1"
          />
          <Tooltip 
            cursor={{ fill: '#f1f5f9' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FrequencyChart;
