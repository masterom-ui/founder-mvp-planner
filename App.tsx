import React, { useState } from 'react';
import InputForm from './components/InputForm';
import BlueprintDisplay from './components/BlueprintDisplay';
import { MVPBlueprint } from './types';
import { generateBlueprint } from './services/geminiService';
import { AlertTriangle } from './components/Icons';

const App = () => {
  const [blueprint, setBlueprint] = useState<MVPBlueprint | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900 font-inter">
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {error && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
            <AlertTriangle className="text-red-500 w-5 h-5 flex-shrink-0" />
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        {!blueprint ? (
          <div className="flex items-center justify-center min-h-[80vh] flex-col">
             {/* Wraps the InputForm in a vertically centered container for the 'Hero' feel */}
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