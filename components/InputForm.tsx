import React, { useState } from 'react';
import { Rocket, Zap, CheckCircle as CheckCircleIcon } from './Icons';

interface InputFormProps {
  onSubmit: (title: string, description: string) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onSubmit(title, description);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      
      {/* 1. Hero / Value Prop Section */}
      <div className="text-center mb-10 max-w-3xl px-4">
        <div className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-500/30 rounded-full px-3 py-1 mb-6">
           <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
           <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">MVP Validator Engine</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6 transition-colors duration-500">
          Turn your raw idea into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-fuchsia-400 dark:drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">7-day MVP plan</span> in under 60 seconds.
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed transition-colors duration-500">
          Built for solo founders. No fluff. Binary decisions.
        </p>
      </div>

      {/* 2. Primary CTA Section (The Form) */}
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-indigo-500/10 dark:shadow-indigo-500/20 border border-slate-200 dark:border-indigo-500/30 p-6 md:p-8 relative transition-all duration-500">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-t-2xl"></div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 transition-colors duration-500">
              Idea Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
              placeholder="e.g. Airbnb for Camping"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-all placeholder:text-slate-400 font-medium"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 transition-colors duration-500">
              What does it do? (1-2 sentences)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              placeholder="It lets homeowners rent out their backyard for campers..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none transition-all placeholder:text-slate-400 font-medium resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !title || !description}
            className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all transform active:scale-[0.98] flex items-center justify-center space-x-2 shadow-lg
              ${isLoading || !title || !description 
                ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed text-slate-500 dark:text-slate-600 shadow-none' 
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:to-indigo-600 shadow-indigo-500/30 dark:shadow-[0_0_20px_rgba(99,102,241,0.4)]'}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analyzing Feasibility...</span>
              </>
            ) : (
              <>
                <span>Generate My MVP Blueprint</span>
                <Rocket className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* 3. Social Proof Substitute / Trust */}
      <div className="mt-8 flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-8 text-slate-400 dark:text-slate-500 text-sm font-medium transition-colors duration-500">
         <div className="flex items-center space-x-2">
            <CheckCircleIcon className="w-4 h-4 text-green-500" />
            <span>Instant Analysis</span>
         </div>
         <div className="flex items-center space-x-2">
            <CheckCircleIcon className="w-4 h-4 text-green-500" />
            <span>Actionable 7-Day Plan</span>
         </div>
         <div className="flex items-center space-x-2">
            <CheckCircleIcon className="w-4 h-4 text-green-500" />
            <span>100% Free</span>
         </div>
      </div>
    </div>
  );
};

export default InputForm;