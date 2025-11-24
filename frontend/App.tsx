import React, { useState, useCallback } from 'react';
import { BookOpen, RefreshCw, Filter } from 'lucide-react';
import DropZone from './components/DropZone';
import ProcessingList from './components/ProcessingList';
import FrequencyChart from './components/FrequencyChart';
import FrequencyTable from './components/FrequencyTable';
import { parseDocx, parsePdf } from './services/fileParser';
import { processText } from './services/textProcessor';
import { FileProcessingStatus, WordFrequency } from './types';

const App: React.FC = () => {
  const [fileStatuses, setFileStatuses] = useState<FileProcessingStatus[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aggregatedText, setAggregatedText] = useState('');
  const [results, setResults] = useState<WordFrequency[]>([]);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    setIsProcessing(true);
    
    // Initialize status for new files
    const newStatuses: FileProcessingStatus[] = files.map(f => ({
      fileName: f.name,
      status: 'pending'
    }));

    // Append to existing statuses
    setFileStatuses(prev => [...prev, ...newStatuses]);

    let newTextContent = '';

    for (const file of files) {
      // Update status to processing
      setFileStatuses(prev => prev.map(s => 
        s.fileName === file.name ? { ...s, status: 'processing' } : s
      ));

      try {
        let text = '';
        if (file.type === 'application/pdf') {
          text = await parsePdf(file);
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          text = await parseDocx(file);
        }

        newTextContent += ' ' + text;

        setFileStatuses(prev => prev.map(s => 
          s.fileName === file.name ? { ...s, status: 'completed' } : s
        ));
      } catch (error) {
        console.error(`Error parsing ${file.name}:`, error);
        setFileStatuses(prev => prev.map(s => 
          s.fileName === file.name ? { ...s, status: 'error', errorMessage: 'Failed to parse file' } : s
        ));
      }
    }

    // Update aggregated text state using functional update to ensure we have previous texts if this was a sequential add
    setAggregatedText(prev => {
      const combinedText = prev + ' ' + newTextContent;
      // Calculate frequencies on the fly
      const freqs = processText(combinedText);
      setResults(freqs);
      return combinedText;
    });

    setIsProcessing(false);
  }, []);

  const handleReset = () => {
    setFileStatuses([]);
    setAggregatedText('');
    setResults([]);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <BookOpen size={24} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              LexiCount Pro
            </h1>
          </div>
          {results.length > 0 && (
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg"
            >
              <RefreshCw size={16} />
              <span>Reset Analysis</span>
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Intro Section */}
        <section className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl mb-4">
            Text Frequency Analysis
          </h2>
          <p className="text-lg text-slate-600">
            Upload Word (.docx) or PDF files to generate a frequency report.
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-sm text-indigo-700">
            <Filter size={16} className="mr-2" />
            <span>Filters active: Common stop words, prepositions, articles & option markers (A, B, C, D)</span>
          </div>
        </section>

        {/* Upload Section */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <DropZone onFilesSelected={handleFilesSelected} isProcessing={isProcessing} />
          <ProcessingList files={fileStatuses} />
        </section>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Chart Column */}
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <span className="w-1 h-6 bg-indigo-500 rounded mr-3"></span>
                Top 20 Visual Analysis
              </h3>
              <FrequencyChart data={results} />
              
              <div className="mt-6 bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                <h4 className="font-semibold text-indigo-900 mb-2">Analysis Summary</h4>
                <p className="text-indigo-800/80 text-sm">
                  Found <strong>{results.length}</strong> unique meaningful words across <strong>{fileStatuses.filter(f => f.status === 'completed').length}</strong> file(s). 
                  The top word is "<strong>{results[0]?.word}</strong>" appearing {results[0]?.count} times.
                </p>
              </div>
            </div>

            {/* Table Column */}
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                <span className="w-1 h-6 bg-violet-500 rounded mr-3"></span>
                Top 200 Words
              </h3>
              <FrequencyTable data={results} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;