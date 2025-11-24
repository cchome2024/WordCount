import React from 'react';
import { WordFrequency } from '../types';

interface FrequencyTableProps {
  data: WordFrequency[];
}

const FrequencyTable: React.FC<FrequencyTableProps> = ({ data }) => {
  if (data.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[500px]">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800">Frequency Details</h3>
        <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
          Top {data.length} Words
        </span>
      </div>
      <div className="overflow-y-auto custom-scrollbar flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-20 text-center border-b border-slate-200">Rank</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Word</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right border-b border-slate-200">Count</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/3 border-b border-slate-200">Visual</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item, index) => {
              // Calculate width percentage relative to the highest count
              const maxCount = data[0].count;
              const percentage = (item.count / maxCount) * 100;

              return (
                <tr key={item.word} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-slate-500 text-center font-mono">{index + 1}</td>
                  <td className="py-3 px-4 text-sm font-medium text-slate-700">{item.word}</td>
                  <td className="py-3 px-4 text-sm text-slate-600 text-right font-mono">{item.count}</td>
                  <td className="py-3 px-4 align-middle">
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-indigo-500 h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FrequencyTable;
