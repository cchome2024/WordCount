import React from 'react';
import { FileText, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { FileProcessingStatus } from '../types';

interface ProcessingListProps {
  files: FileProcessingStatus[];
}

const ProcessingList: React.FC<ProcessingListProps> = ({ files }) => {
  if (files.length === 0) return null;

  return (
    <div className="mt-6 space-y-3">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Processed Files</h3>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {files.map((file, idx) => (
          <div 
            key={`${file.fileName}-${idx}`}
            className="flex items-center p-3 bg-white border border-slate-200 rounded-lg shadow-sm"
          >
            <div className="mr-3">
              {file.status === 'processing' && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
              {file.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              {file.status === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
              {file.status === 'pending' && <FileText className="w-5 h-5 text-slate-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 truncate">{file.fileName}</p>
              {file.status === 'error' && (
                <p className="text-xs text-red-500 mt-1 break-words" title={file.errorMessage}>
                  {file.errorMessage || '文件处理失败'}
                </p>
              )}
              {file.status === 'processing' && (
                <p className="text-xs text-slate-400 mt-1">正在提取文本...</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessingList;
