import React from 'react';
import { MVPBlueprint } from '../types';
import { BrainCircuit, CheckCircle, AlertTriangle, Clock, Target, Code, ArrowRight, XCircle, Layers, Lock, Calendar, GitBranch, Zap } from './Icons';

interface BlueprintDisplayProps {
  data: MVPBlueprint;
  onReset: () => void;
}

const BlueprintDisplay: React.FC<BlueprintDisplayProps> = ({ data, onReset }) => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-20">
      
      {/* 1. Meta Header */}
      <div className="bg-slate-900 dark:bg-black text-white rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden transition-all duration-500 dark:border dark:border-indigo-500/30 dark:shadow-[0_0_30px_rgba(99,102,241,0.1)]">
        <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-20">
          <BrainCircuit className="w-64 h-64 text-white transform rotate-12 translate-x-12 -translate-y-12 dark:text-indigo-400" />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
               <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/50 text-indigo-300 text-xs font-bold tracking-wider uppercase mb-4 dark:border-indigo-400 dark:shadow-[0_0_10px_rgba(129,140,248,0.4)]">
                Strategy Blueprint
              </span>
              <h1 className="text-4xl font-bold mb-2 tracking-tight">{data.meta.product_title}</h1>
              <p className="text-xl text-slate-300 dark:text-slate-400 font-light max-w-2xl">{data.meta.one_line_value_proposition}</p>
            </div>
            <button 
              onClick={onReset}
              className="hidden md:block text-slate-400 hover:text-white dark:hover:text-indigo-400 underline text-sm transition-colors"
            >
              Start Over
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-10 border-t border-slate-700/50 pt-8">
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Target User</p>
              <p className="font-medium text-white">{data.meta.target_user}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Core Problem</p>
              <p className="font-medium text-white">{data.meta.core_problem}</p>
            </div>
             <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Primary Outcome</p>
              <p className="font-medium text-indigo-300 dark:text-indigo-400">{data.meta.primary_outcome}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Founder Summary (TL;DR) */}
      <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-slate-950 border border-indigo-100 dark:border-indigo-500/20 rounded-2xl p-8 shadow-sm transition-colors duration-500">
        <div className="flex items-center space-x-3 mb-6">
          <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400 fill-indigo-100 dark:fill-indigo-950/50" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Founder Strategy</h2>
        </div>

        <div className="space-y-6">
           <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-indigo-50 dark:border-indigo-500/10 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 dark:shadow-[0_0_15px_rgba(99,102,241,0.8)]"></div>
              <p className="text-lg text-slate-800 dark:text-slate-200 font-medium leading-relaxed font-mono">
                {data.founder_summary.tldr}
              </p>
               <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Why this works:</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400 italic">{data.founder_summary.why_this_works}</span>
               </div>
           </div>

           <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wide mb-3">7-Day Sprint Goals</h3>
                <ul className="space-y-2">
                   {data.founder_summary.build_in_7_days.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2">
                         <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold dark:shadow-[0_0_10px_rgba(79,70,229,0.5)]">{i+1}</span>
                         <span className="text-slate-800 dark:text-slate-200 font-medium">{item}</span>
                      </li>
                   ))}
                </ul>
              </div>
              <div className="space-y-4">
                 <div>
                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wide mb-2">Failure Condition</h3>
                    <p className="text-sm text-red-800 dark:text-red-300 bg-red-50 dark:bg-red-950/20 p-3 rounded-lg border border-red-100 dark:border-red-500/30 font-medium">
                      <AlertTriangle className="w-4 h-4 inline mr-2 text-red-600 dark:text-red-400"/>
                      {data.founder_summary.failure_condition}
                    </p>
                 </div>
                 <div>
                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wide mb-2">Success Looks Like</h3>
                     <p className="text-sm text-green-800 dark:text-green-300 bg-green-50 dark:bg-green-950/20 p-3 rounded-lg border border-green-100 dark:border-green-500/30 font-medium">
                      {data.founder_summary.success_look}
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* 3. MVP Scope Lock */}
      <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-800 relative transition-colors duration-500">
        <div className="absolute -top-4 left-8 bg-slate-800 dark:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
           <Lock className="w-4 h-4" />
           <span className="font-bold text-sm tracking-wide">SCOPE LOCK</span>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6 mt-4">
           {/* Build Now */}
           <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-green-200 dark:border-green-500/20 p-5 dark:shadow-[0_0_15px_rgba(34,197,94,0.05)]">
              <div className="flex items-center justify-between mb-4 border-b border-green-100 dark:border-green-900/50 pb-3">
                 <h3 className="font-bold text-green-700 dark:text-green-400 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Build NOW
                 </h3>
                 <span className="text-xs font-mono bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300 px-2 py-1 rounded">Max 3</span>
              </div>
              <ul className="space-y-3">
                 {data.build_scope_guardrails.what_to_build_now.map((item, i) => (
                    <li key={i} className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-snug flex items-start">
                       <span className="mr-2 text-green-500 mt-1">●</span> {item}
                    </li>
                 ))}
              </ul>
           </div>

           {/* Delay */}
           <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-amber-200 dark:border-amber-500/20 p-5 dark:shadow-[0_0_15px_rgba(245,158,11,0.05)]">
               <div className="flex items-center justify-between mb-4 border-b border-amber-100 dark:border-amber-900/50 pb-3">
                 <h3 className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Delay (V2)
                 </h3>
                 <span className="text-xs font-mono bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-1 rounded">Limit 2</span>
              </div>
              <ul className="space-y-3">
                 {data.build_scope_guardrails.what_to_delay.map((item, i) => (
                    <li key={i} className="text-sm text-slate-600 dark:text-slate-400 leading-snug flex items-start">
                       <span className="mr-2 text-amber-500 mt-1">●</span> {item}
                    </li>
                 ))}
              </ul>
           </div>

           {/* Scope Traps */}
           <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-red-200 dark:border-red-500/20 p-5 dark:shadow-[0_0_15px_rgba(239,68,68,0.05)]">
               <div className="flex items-center justify-between mb-4 border-b border-red-100 dark:border-red-900/50 pb-3">
                 <h3 className="font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
                    <XCircle className="w-4 h-4" /> Scope Traps
                 </h3>
                 <span className="text-xs font-mono bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 px-2 py-1 rounded">Forbidden</span>
              </div>
               <ul className="space-y-3">
                 {data.features.scope_traps.map((item, i) => (
                    <li key={i} className="text-sm text-slate-500 dark:text-slate-500 line-through decoration-red-300 dark:decoration-red-900 leading-snug flex items-start">
                       <span className="mr-2 text-red-400 no-underline mt-1">●</span> {item}
                    </li>
                 ))}
              </ul>
           </div>
        </div>
      </div>

      {/* 4. Execution Path */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 transition-colors duration-500">
         <div className="flex items-center space-x-3 mb-8">
            <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">7-Day Execution Path</h2>
         </div>

         <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-4 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -z-10 transform translate-y-4"></div>

            {[
              { days: '1-2', data: data.execution_path.day_1_2, active: false },
              { days: '3-4', data: data.execution_path.day_3_4, active: false },
              { days: '5-7', data: data.execution_path.day_5_7, active: true },
            ].map((block, idx) => (
              <div key={idx} className="relative group">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-4 border-4 border-white dark:border-slate-900 shadow-sm z-10 relative transition-all duration-300 ${block.active ? 'bg-indigo-600 text-white dark:shadow-[0_0_15px_rgba(79,70,229,0.5)]' : 'bg-slate-900 dark:bg-slate-800 text-white'}`}>
                    {block.days}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{block.data.strategy}</h3>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-100 dark:border-slate-800 mt-2">
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Implementation Tasks</p>
                  <ul className="space-y-2">
                      {block.data.tasks.map((item, i) => (
                        <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start">
                            <span className="mr-2 text-indigo-500 dark:text-indigo-400">→</span> {item}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
         </div>
      </div>

       {/* 5. User Journey Flow */}
       <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-500">
        <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center space-x-3">
            <Layers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">User Journey Flow</h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-1">From entry to "Aha!" moment.</p>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {data.steps.map((step) => (
            <div key={step.step_id} className="p-6 md:p-8 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-32 flex-shrink-0 flex flex-col items-center md:items-start border-r border-slate-100 dark:border-slate-800 md:pr-6">
                   <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center font-bold text-sm mb-2 group-hover:bg-indigo-600 transition-colors">
                     {step.step_id}
                   </div>
                   <div className="text-xs font-mono text-slate-400 dark:text-slate-500">
                      {step.start_time} - {step.end_time}
                   </div>
                   <div className="mt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide text-center md:text-left">
                     {step.step_goal}
                   </div>
                </div>

                <div className="flex-grow space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-indigo-50/50 dark:bg-indigo-950/10 p-4 rounded-lg border border-indigo-100 dark:border-indigo-500/20">
                      <p className="text-xs text-indigo-400 dark:text-indigo-500 font-bold uppercase mb-1">User Action</p>
                      <p className="text-slate-800 dark:text-slate-200 font-medium">{step.user_action}</p>
                    </div>
                    <div className="bg-green-50/50 dark:bg-green-950/10 p-4 rounded-lg border border-green-100 dark:border-green-500/20">
                      <p className="text-xs text-green-600 dark:text-green-500 font-bold uppercase mb-1">System Response</p>
                      <p className="text-slate-800 dark:text-slate-200 font-medium">{step.system_response}</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 mt-4">
                    <div className="flex-1 space-y-3">
                      <div>
                          <p className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold mb-2">Core Logic</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400 font-mono bg-slate-50 dark:bg-black/30 p-3 rounded border border-slate-100 dark:border-slate-800">
                            {step.logic}
                          </p>
                      </div>
                      
                      {step.conditional_logic && step.conditional_logic.length > 0 && (
                          <div className="bg-amber-50 dark:bg-amber-950/10 p-3 rounded border border-amber-100 dark:border-amber-500/20">
                             <div className="flex items-center space-x-2 mb-2">
                                <GitBranch className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                                <p className="text-xs text-amber-600 dark:text-amber-400 uppercase font-bold">Decision Logic</p>
                             </div>
                             <ul className="space-y-1">
                                {step.conditional_logic.map((logic, idx) => (
                                    <li key={idx} className="text-xs text-slate-700 dark:text-slate-400 italic">"{logic}"</li>
                                ))}
                             </ul>
                          </div>
                      )}
                    </div>

                    <div className="flex-1">
                       <p className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold mb-2">Copy & Visuals</p>
                       <div className="space-y-2">
                          <div className="text-sm text-slate-700 dark:text-slate-300 italic border-l-2 border-indigo-300 dark:border-indigo-500/50 pl-3">
                            "{step.copy_text}"
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {step.visual_elements.map((viz, idx) => (
                              <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors">
                                {viz}
                              </span>
                            ))}
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

       {/* 6. Tech Stack */}
       <div className="bg-slate-800 dark:bg-black text-slate-300 dark:text-slate-400 p-8 rounded-xl shadow-lg border dark:border-indigo-500/20 transition-all duration-500">
          <div className="flex items-center space-x-3 mb-6">
            <Code className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-bold text-white tracking-tight">Tech Stack Recommendation</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs uppercase font-bold text-slate-500 mb-2">Frontend</p>
              <div className="flex flex-wrap gap-2">
                 {data.technical_suggestions.frontend_tools.map((tech, i) => (
                   <span key={i} className="px-3 py-1 bg-slate-700 dark:bg-slate-900 rounded-full text-sm text-white dark:text-slate-300 border dark:border-slate-800">{tech}</span>
                 ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-slate-500 mb-2">Backend / AI</p>
               <div className="flex flex-wrap gap-2">
                 {data.technical_suggestions.backend_or_ai_logic.map((tech, i) => (
                   <span key={i} className="px-3 py-1 bg-slate-700 dark:bg-slate-900 rounded-full text-sm text-white dark:text-slate-300 border dark:border-slate-800">{tech}</span>
                 ))}
              </div>
            </div>
             <div>
              <p className="text-xs uppercase font-bold text-slate-500 mb-2">No-Code Alternatives</p>
               <div className="flex flex-wrap gap-2">
                 {data.technical_suggestions.no_code_or_low_code_options.map((tech, i) => (
                   <span key={i} className="px-3 py-1 bg-slate-700 dark:bg-indigo-900/20 rounded-full text-sm text-indigo-200 dark:text-indigo-400 border dark:border-indigo-900/30">{tech}</span>
                 ))}
              </div>
            </div>
          </div>
        </div>

       {/* 7. Final Binary Outcome */}
      <div className="bg-slate-900 dark:bg-black rounded-xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl transition-all duration-500 dark:border dark:border-indigo-500/40 dark:shadow-[0_0_40px_rgba(99,102,241,0.15)]">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 dark:shadow-[0_0_20px_rgba(168,85,247,0.8)]"></div>
         <div className="relative z-10">
            <h2 className="text-indigo-400 dark:text-indigo-300 text-xs font-bold uppercase tracking-[0.2em] mb-4">The Binary Decision</h2>
            <p className="text-xl md:text-3xl font-bold text-white leading-tight mb-4">
              "Proceed ONLY if <span className="text-indigo-400 dark:text-indigo-400 underline decoration-indigo-400/30 underline-offset-4 dark:drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]">{data.mvp_overview.binary_success_criterion}</span> within 7 days."
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-lg">If not met, pause or discard the idea.</p>
         </div>
      </div>

       <div className="text-center md:hidden">
            <button 
              onClick={onReset}
              className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-sm rounded-lg text-slate-600 dark:text-slate-300 font-medium"
            >
              Start New Blueprint
            </button>
      </div>

    </div>
  );
};

export default BlueprintDisplay;