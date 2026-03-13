
import React, { useState, useCallback, useEffect } from 'react';
import { DAW, Genre, MixArea, EffectGoal, SelectionState, ProductionGuidance, PluginDetail, ProTip, AnalysisGenre, AnalysisGoal, MixAnalysisReport, User } from './types';
import { DAWS, GENRES, MIX_AREAS, EFFECT_GOALS } from './constants';
import { Dropdown } from './core-ui/DropdownMenu';
import { PluginNode } from './core-ui/PluginNode';
import { PluginInspector } from './core-ui/PluginInspector';
import { MixAnalyzer } from './core-ui/MixAnalyzer';
import { ScalesChords } from './core-ui/ScalesChords';
import { FrequencyMap } from './core-ui/FrequencyMap';
import { SplashScreen } from './core-ui/SplashScreen';
import { AuthSystem } from './core-ui/AuthSystem';
import { getProductionGuidance } from './services/gemini-service';

const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [mode, setMode] = useState<'knowledge' | 'analysis' | 'scales' | 'freqmap'>('knowledge');
  const [selection, setSelection] = useState<SelectionState>({
    daw: 'Ableton Live',
    genre: 'Melodic House',
    area: 'Drum Bus',
    effect: 'Punchy',
  });

  const [guidance, setGuidance] = useState<ProductionGuidance | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPluginId, setSelectedPluginId] = useState<string | null>(null);
  const [activeTip, setActiveTip] = useState<ProTip | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selection.effect === 'Polished Final Master' && selection.area !== 'Master Bus') {
      setSelection(prev => ({ ...prev, area: 'Master Bus' }));
    }
  }, [selection.effect]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setSelectedPluginId(null);
    try {
      const result = await getProductionGuidance(selection);
      setGuidance(result);
    } catch (err) {
      console.error(err);
      setError("ANALYSIS FAILED. RE-CONNECTING TO PRODUCTION CORE...");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setShowAuth(false);
    setHasEntered(true);
  };

  const handleLogout = () => {
    setHasEntered(false);
    setShowAuth(true); 
    setCurrentUser(null);
    setGuidance(null);
    setSelectedPluginId(null);
    setActiveTip(null);
    setError(null);
  };

  const selectedPlugin = guidance?.chain.find(p => p.id === selectedPluginId) || null;

  if (!hasEntered && !showAuth) {
    return <SplashScreen onEnter={() => setShowAuth(true)} />;
  }

  if (showAuth) {
    return <AuthSystem onAuthSuccess={handleAuthSuccess} onAdminExit={() => setShowAuth(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-[#ff007f] selection:text-white relative font-['Inter'] animate-in fade-in duration-1000">
      {/* Detailed Directive Modal */}
      {activeTip && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActiveTip(null)}></div>
          <div className="relative bg-[#0d0d0d] border-2 border-[#ff007f] w-full max-w-lg p-8 rounded-2xl shadow-[0_0_50px_rgba(255,0,127,0.4)] animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setActiveTip(null)}
              className="absolute top-4 right-4 text-white/40 hover:text-[#ff007f] transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <h3 className="text-[#ff007f] font-black uppercase tracking-[0.2em] mb-4 text-xs italic flex items-center gap-2">
              <span className="w-2 h-2 bg-[#ffff00] rounded-full"></span> Technical Briefing
            </h3>
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight italic">
              {activeTip.summary}
            </h2>
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <p className="text-lg text-white/90 leading-relaxed font-medium">
                {activeTip.explanation}
              </p>
            </div>
            <div className="mt-8 flex justify-end">
               <button 
                onClick={() => setActiveTip(null)}
                className="px-6 py-2 bg-[#ff007f] text-white font-black uppercase text-xs tracking-widest rounded hover:bg-black hover:text-[#ff007f] border border-[#ff007f] transition-all"
               >
                 OK
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="h-16 border-b border-white/5 bg-black flex items-center px-6 justify-between shrink-0 z-50 sticky top-0 backdrop-blur-md">
        <div className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded border-2 border-[#ff007f] flex items-center justify-center bg-[#ff007f]/10 shadow-[0_0_30px_rgba(255,0,127,0.4)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff007f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/>
              <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
              <line x1="2" y1="14" x2="6" y2="14"/><line x1="10" y1="8" x2="14" y2="8"/><line x1="18" y1="16" x2="22" y2="16"/>
            </svg>
          </div>
          <h1 className="font-black text-2xl tracking-tighter uppercase italic">
            Mix<span className="text-[#ff007f]">Brain</span>
          </h1>
        </div>
        
        <nav className="flex items-center gap-1 p-1 bg-white/5 rounded-lg border border-white/10">
          <button 
            onClick={() => setMode('knowledge')}
            className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'knowledge' ? 'bg-[#ff007f] text-white shadow-[0_0_10px_rgba(255,0,127,0.5)]' : 'text-white/40 hover:text-white'}`}
          >
            Knowledge Base
          </button>
          <button 
            onClick={() => setMode('analysis')}
            className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'analysis' ? 'bg-[#ff007f] text-white shadow-[0_0_10px_rgba(255,0,127,0.5)]' : 'text-white/40 hover:text-white'}`}
          >
            Studio Analyzer
          </button>
          <button 
            onClick={() => setMode('scales')}
            className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'scales' ? 'bg-[#ff007f] text-white shadow-[0_0_10px_rgba(255,0,127,0.5)]' : 'text-white/40 hover:text-white'}`}
          >
            Scales/Chords
          </button>
          <button 
            onClick={() => setMode('freqmap')}
            className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'freqmap' ? 'bg-[#ff007f] text-white shadow-[0_0_10px_rgba(255,0,127,0.5)]' : 'text-white/40 hover:text-white'}`}
          >
            Frequency Map
          </button>
        </nav>

        <div className="flex items-center gap-4">
           <div className="flex flex-col items-end">
             <div className="text-[10px] mono text-[#00ffff] bg-[#00ffff]/10 px-3 py-1 rounded border border-[#00ffff]/30 uppercase tracking-[0.2em] font-black hidden sm:block">
              {currentUser?.name || 'Producer'}
             </div>
           </div>
           <button 
            onClick={handleLogout}
            title="Return to Access Screen"
            className="p-2 text-white/40 hover:text-[#ff007f] transition-colors border border-white/10 rounded-lg hover:border-[#ff007f] bg-white/5"
           >
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
           </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {mode === 'knowledge' && (
          <div className="flex h-full flex-col lg:flex-row overflow-hidden">
            {/* Left Sidebar: Controls */}
            <div className="w-full lg:w-80 border-r border-white/5 p-6 space-y-8 shrink-0 bg-[#050505]">
              <div className="space-y-6">
                <Dropdown label="DAW Environment" options={DAWS} value={selection.daw} onChange={(v) => setSelection({...selection, daw: v})} />
                <Dropdown label="Musical Genre" options={GENRES} value={selection.genre} onChange={(v) => setSelection({...selection, genre: v})} />
                <Dropdown label="Target Group" options={MIX_AREAS} value={selection.area} onChange={(v) => setSelection({...selection, area: v})} />
                <Dropdown label="Effect Goal" options={EFFECT_GOALS} value={selection.effect} onChange={(v) => setSelection({...selection, effect: v})} />
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-lg active:scale-95 ${isLoading ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-[#ff007f] hover:bg-[#ff007f]/80 shadow-[#ff007f]/20'}`}
              >
                {isLoading ? 'Processing Signal...' : 'Generate Guidance'}
              </button>

              {error && (
                <div className="p-4 rounded-lg bg-[#ff007f]/10 border border-[#ff007f]/30 text-[#ff007f] text-[10px] font-bold uppercase tracking-widest text-center animate-pulse">
                  {error}
                </div>
              )}

              {guidance && (
                <div className="space-y-4 pt-4">
                   <h3 className="text-[10px] font-black text-white/30 uppercase tracking-widest">Master Directives</h3>
                   <div className="space-y-2">
                     {guidance.proTips.map((tip, i) => (
                       <button
                         key={i}
                         onClick={() => setActiveTip(tip)}
                         className="w-full p-3 rounded bg-white/5 border border-white/10 hover:border-[#ff007f]/50 text-left transition-all group"
                       >
                         <div className="text-[10px] font-black text-[#ff007f] uppercase mb-1">Tip #{i+1}</div>
                         <div className="text-xs font-bold text-white/80 group-hover:text-white truncate">{tip.summary}</div>
                       </button>
                     ))}
                   </div>
                </div>
              )}
            </div>

            {/* Center: Plugin Chain Representation & Mixing Advice */}
            <div className="flex-1 bg-black relative overflow-y-auto flex flex-col items-center justify-center p-8 lg:p-12">
              {!guidance && !isLoading && (
                <div className="text-center space-y-4 max-w-sm">
                  <div className="w-16 h-16 rounded-full border-2 border-white/5 flex items-center justify-center mx-auto mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-20"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  </div>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-white/20">Awaiting Signal Data</h3>
                  <p className="text-xs text-white/10 uppercase tracking-[0.2em] font-bold">Configure parameters and execute generate</p>
                </div>
              )}

              {isLoading && (
                <div className="flex flex-col items-center gap-6">
                   <div className="flex items-end gap-1.5 h-16">
                     {[...Array(12)].map((_, i) => (
                       <div 
                        key={i} 
                        className="w-1.5 bg-[#ff007f] rounded-full shadow-[0_0_15px_#ff007f]"
                        style={{ 
                          height: `${20 + Math.random() * 80}%`,
                          animation: `fader-move ${0.4 + Math.random() * 0.8}s ease-in-out infinite`
                        }}
                       ></div>
                     ))}
                   </div>
                   <p className="text-[10px] font-black text-[#ff007f] animate-pulse uppercase tracking-[0.4em] italic">Synthesizing Technical Path...</p>
                </div>
              )}

              {guidance && !isLoading && (
                <div className="w-full max-w-4xl space-y-12 animate-in fade-in zoom-in-95 duration-500">
                  {/* Mixing Advice Summary (Restored) */}
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ffff] to-[#ff007f] rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative p-8 bg-[#0d0d0d] border border-white/10 rounded-2xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="px-2 py-0.5 bg-[#ff007f] text-white text-[9px] font-black uppercase italic tracking-widest rounded">Technical Overview</div>
                        <div className="h-px flex-1 bg-white/5"></div>
                      </div>
                      <p className="text-white/80 leading-relaxed font-medium text-lg italic border-l-2 border-[#00ffff] pl-6 py-1">
                        {guidance.introduction}
                      </p>
                    </div>
                  </div>

                  {/* Plugin Chain Representation */}
                  <div className="flex flex-col items-center space-y-6">
                    <div className="flex items-center gap-4">
                       <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Engineered Signal Path</h3>
                    </div>
                    <div className="flex items-center gap-0 overflow-x-auto pb-4 max-w-full">
                      {guidance.chain.map((plugin, i) => (
                        <PluginNode
                          key={plugin.id}
                          plugin={plugin}
                          index={i}
                          isActive={selectedPluginId === plugin.id}
                          onClick={() => setSelectedPluginId(plugin.id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side: Technical Inspector */}
            <div className="w-full lg:w-[400px] shrink-0 border-l border-white/5">
               <PluginInspector plugin={selectedPlugin} />
            </div>
          </div>
        )}

        {mode === 'analysis' && <MixAnalyzer />}
        {mode === 'scales' && <ScalesChords />}
        {mode === 'freqmap' && <FrequencyMap />}
      </main>

      <div className="fixed bottom-0 right-0 p-4 pointer-events-none z-0">
         <div className="text-[120px] font-black text-white/[0.02] uppercase italic leading-none select-none">MIXBRAIN</div>
      </div>
    </div>
  );
};

export default App;
