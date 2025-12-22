import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import BlueprintDisplay from './components/BlueprintDisplay';
import { MVPBlueprint } from './types';
import { generateBlueprint } from './services/geminiService';
import { AlertTriangle, Sun, Moon } from './components/Icons';

const App = () => {
  const [blueprint, setBlueprint] = useState<MVPBlueprint | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleGenerate = async (title: string, description: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateBlueprint(title, description);
      setBlueprint(result);
    } catch (err: any) {
      setError(err.message || "Failed to generate blueprint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBlueprint(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100 font-inter">
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-indigo-500/50 shadow-lg dark:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all hover:scale-110 active:scale-95 group"
        aria-label="Toggle Theme"
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-600 group-hover:-rotate-12 transition-transform" />
        )}
      </button>

      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {error && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-500/50 rounded-lg p-4 flex items-center space-x-3 shadow-sm dark:shadow-[0_0_10px_rgba(239,68,68,0.2)]">
            <AlertTriangle className="text-red-500 w-5 h-5 flex-shrink-0" />
            <p className="text-red-700 dark:text-red-300 text-sm font-medium">{error}</p>
          </div>
        )}

        {!blueprint ? (
          <div className="flex items-center justify-center min-h-[80vh] flex-col">
            <InputForm onSubmit={handleGenerate} isLoading={loading} />
          </div>
        ) : (
          <div className="animate-fade-in">
            <BlueprintDisplay data={blueprint} onReset={handleReset} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;