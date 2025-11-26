import React, { useState, useCallback } from 'react';
import { BookOpen, RefreshCw, Filter } from 'lucide-react';
import DropZone from './components/DropZone';
import ProcessingList from './components/ProcessingList';
import FrequencyTable from './components/FrequencyTable';
import { parseDocx, parsePdf } from './services/fileParser';
import { processText } from './services/textProcessor';
import { FileProcessingStatus, TextProcessingResult } from './types';

const App: React.FC = () => {
  const [fileStatuses, setFileStatuses] = useState<FileProcessingStatus[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aggregatedText, setAggregatedText] = useState('');
  const [results, setResults] = useState<TextProcessingResult>({ allowedWords: [], otherWords: [] });
  const [minWordLength, setMinWordLength] = useState<number>(0); // 最小单词长度过滤，0表示不过滤

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
        const errorMessage = error instanceof Error ? error.message : '文件解析失败';
        setFileStatuses(prev => prev.map(s => 
          s.fileName === file.name ? { ...s, status: 'error', errorMessage } : s
        ));
      }
    }

    // Update aggregated text state using functional update to ensure we have previous texts if this was a sequential add
    setAggregatedText(prev => {
      const combinedText = prev + ' ' + newTextContent;
      // Calculate frequencies on the fly
      const processingResult = processText(combinedText);
      setResults(processingResult);
      return combinedText;
    });

    setIsProcessing(false);
  }, []);

  const handleReset = () => {
    setFileStatuses([]);
    setAggregatedText('');
    setResults({ allowedWords: [], otherWords: [] });
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
          {(results.allowedWords.length > 0 || results.otherWords.length > 0) && (
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
        {(results.allowedWords.length > 0 || results.otherWords.length > 0) && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Allowed Words Section */}
            {results.allowedWords.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-800 flex items-center">
                    <span className="w-1 h-8 bg-indigo-500 rounded mr-3"></span>
                    单词表中的单词统计
                  </h3>
                  <div className="bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100">
                    <p className="text-sm text-indigo-800">
                      找到 <strong>{results.allowedWords.length}</strong> 个单词，共 <strong>{fileStatuses.filter(f => f.status === 'completed').length}</strong> 个文件。 
                      最高频词: "<strong>{results.allowedWords[0]?.word}</strong>" ({results.allowedWords[0]?.count} 次)
                    </p>
                  </div>
                </div>
                <FrequencyTable data={results.allowedWords} />
              </div>
            )}

            {/* Other Words Section */}
            {results.otherWords.length > 0 && (() => {
              // Filter other words by minimum length
              const filteredOtherWords = minWordLength > 0
                ? results.otherWords.filter(word => word.word.length >= minWordLength)
                : results.otherWords;

              return (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-slate-800 flex items-center">
                        <span className="w-1 h-8 bg-violet-500 rounded mr-3"></span>
                        其他单词统计（排除日常用词）
                      </h3>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-sm text-slate-600">
                          <span>最小长度:</span>
                          <select
                            value={minWordLength}
                            onChange={(e) => setMinWordLength(Number(e.target.value))}
                            className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg bg-white hover:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                          >
                            <option value={0}>不过滤</option>
                            <option value={3}>3个字母及以上</option>
                            <option value={4}>4个字母及以上</option>
                            <option value={5}>5个字母及以上</option>
                            <option value={6}>6个字母及以上</option>
                            <option value={7}>7个字母及以上</option>
                            <option value={8}>8个字母及以上</option>
                            <option value={9}>9个字母及以上</option>
                            <option value={10}>10个字母及以上</option>
                          </select>
                        </label>
                      </div>
                    </div>
                    <div className="bg-violet-50 px-4 py-2 rounded-lg border border-violet-100">
                      <p className="text-sm text-violet-800">
                        {minWordLength > 0 ? (
                          <>
                            找到 <strong>{filteredOtherWords.length}</strong> 个单词（已过滤{minWordLength}个字母以下的单词），共 <strong>{fileStatuses.filter(f => f.status === 'completed').length}</strong> 个文件。
                            {filteredOtherWords.length > 0 && (
                              <> 最高频词: "<strong>{filteredOtherWords[0]?.word}</strong>" ({filteredOtherWords[0]?.count} 次)</>
                            )}
                          </>
                        ) : (
                          <>
                            找到 <strong>{filteredOtherWords.length}</strong> 个单词，共 <strong>{fileStatuses.filter(f => f.status === 'completed').length}</strong> 个文件。 
                            最高频词: "<strong>{filteredOtherWords[0]?.word}</strong>" ({filteredOtherWords[0]?.count} 次)
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  {filteredOtherWords.length > 0 ? (
                    <FrequencyTable data={filteredOtherWords} />
                  ) : (
                    <div className="text-center py-12 text-slate-400">
                      <p>没有符合条件的单词（所有单词都少于 {minWordLength} 个字母）</p>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;