import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { WordFrequency } from '../types';

interface FrequencyTableProps {
  data: WordFrequency[];
}

const FrequencyTable: React.FC<FrequencyTableProps> = ({ data }) => {
  const [copiedFull, setCopiedFull] = useState(false);
  const [copiedWords, setCopiedWords] = useState(false);

  if (data.length === 0) return null;

  // Universal copy function with fallback for non-HTTPS environments
  const copyToClipboard = async (text: string): Promise<boolean> => {
    // Try modern Clipboard API first (requires HTTPS)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn('Clipboard API failed, trying fallback:', err);
        // Fall through to fallback method
      }
    }

    // Fallback: Use execCommand (works in non-HTTPS environments)
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        return true;
      } else {
        throw new Error('execCommand copy failed');
      }
    } catch (err) {
      console.error('All copy methods failed:', err);
      // Last resort: show text in alert for user to manually copy
      alert('无法自动复制，请手动复制以下内容：\n\n' + text.substring(0, 500) + (text.length > 500 ? '...' : ''));
      return false;
    }
  };

  const handleCopyFull = async () => {
    // Format: Rank\tWord\tCount (tab-separated for easy pasting into Excel/Google Sheets)
    const textToCopy = data.map((item, index) => 
      `${index + 1}\t${item.word}\t${item.count}`
    ).join('\n');
    
    // Add header
    const header = 'Rank\tWord\tCount\n';
    const fullText = header + textToCopy;

    const success = await copyToClipboard(fullText);
    if (success) {
      setCopiedFull(true);
      setTimeout(() => setCopiedFull(false), 2000);
    }
  };

  const handleCopyWords = async () => {
    // Format: Only words, one per line
    const wordsOnly = data.map(item => item.word).join('\n');

    const success = await copyToClipboard(wordsOnly);
    if (success) {
      setCopiedWords(true);
      setTimeout(() => setCopiedWords(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[500px]">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800">Frequency Details</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
            Top {data.length} Words
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyFull}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600 bg-white hover:bg-indigo-50 border border-slate-200 rounded-lg transition-colors"
              title="复制完整数据（排名、单词、频次）"
            >
              {copiedFull ? (
                <>
                  <Check size={16} />
                  <span>已复制</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>复制完整</span>
                </>
              )}
            </button>
            <button
              onClick={handleCopyWords}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-violet-600 bg-white hover:bg-violet-50 border border-slate-200 rounded-lg transition-colors"
              title="仅复制单词"
            >
              {copiedWords ? (
                <>
                  <Check size={16} />
                  <span>已复制</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>复制单词</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto custom-scrollbar flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-20 text-center border-b border-slate-200">排名</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">单词</th>
              <th className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right border-b border-slate-200">频次</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item, index) => (
              <tr key={item.word} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 text-sm text-slate-500 text-center font-mono">{index + 1}</td>
                <td className="py-3 px-4 text-sm font-medium text-slate-700">{item.word}</td>
                <td className="py-3 px-4 text-sm text-slate-600 text-right font-mono">{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FrequencyTable;
