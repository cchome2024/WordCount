import React, { useCallback, useState } from 'react';
import { UploadCloud, FileType, X } from 'lucide-react';
import { ACCEPTED_FILE_TYPES } from '../constants';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  isProcessing: boolean;
}

const DropZone: React.FC<DropZoneProps> = ({ onFilesSelected, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (isProcessing) return;

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = filterValidFiles(droppedFiles);
    
    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  }, [isProcessing, onFilesSelected]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && !isProcessing) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = filterValidFiles(selectedFiles);
      if (validFiles.length > 0) {
        onFilesSelected(validFiles);
      }
    }
    // Reset value so same file can be selected again if needed
    e.target.value = '';
  }, [isProcessing, onFilesSelected]);

  const filterValidFiles = (files: File[]) => {
    return files.filter(file => 
      file.type === 'application/pdf' || 
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative border-2 border-dashed rounded-xl p-10 transition-all duration-200 ease-in-out text-center cursor-pointer group
        ${isDragOver 
          ? 'border-indigo-500 bg-indigo-50/50 scale-[1.01]' 
          : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'
        }
        ${isProcessing ? 'opacity-50 pointer-events-none' : ''}
      `}
    >
      <input
        type="file"
        multiple
        accept=".pdf,.docx"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        disabled={isProcessing}
      />
      
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className={`p-4 rounded-full ${isDragOver ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-500'} transition-colors`}>
          <UploadCloud size={32} />
        </div>
        <div className="space-y-1">
          <p className="text-lg font-medium text-slate-700">
            {isDragOver ? 'Drop files now' : '点击选择文件'}
          </p>
          <p className="text-sm text-slate-500">
            支持 .docx (Word) 和 .pdf 文件
          </p>
          <p className="text-xs text-slate-400 mt-2">
            📱 手机用户：点击后可从"文件"app或iCloud选择
          </p>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
