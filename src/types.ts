
export interface Setting {
  knob: string;
  value: string;
}

export interface ProTip {
  summary: string;
  explanation: string;
}

export interface PluginDetail {
  id: string;
  name: string;
  category: string;
  icon: 'eq' | 'comp' | 'reverb' | 'delay' | 'dist' | 'util' | 'limiting';
  purpose: string;
  settings: Setting[];
  alternative: string;
  alternativeUrl: string;
  isStock: boolean;
}

export interface ProductionGuidance {
  introduction: string;
  chain: PluginDetail[];
  proTips: ProTip[];
}

export type DAW = 'Ableton Live' | 'Logic Pro' | 'FL Studio' | 'Studio One' | 'Cubase' | 'Bitwig';
export type Genre = 'House' | 'Melodic House' | 'Deep House' | 'Tech House' | 'Techno' | 'Garage' | 'Afro House' | 'Disco House' | 'Funky House' | 'Soulful House' | 'Trance' | 'EDM' | 'Bass House' | 'Jackin House' | 'Piano House';
export type MixArea = 'Drum Bus' | 'Kick Drum' | 'Snare/Clap' | 'Vocals' | 'Bassline' | 'Master Bus' | 'Synths' | 'Percussion' | 'Piano';
export type EffectGoal = 'Punchy' | 'Warm/Analog' | 'Clean/Transparent' | 'Aggressive' | 'Beefy Low End' | 'Wide Stereo' | 'Clarity/Air' | 'Polished Final Master' | 'Layering' | 'Adding Groove' | 'Bring Forward';

export interface SelectionState {
  daw: DAW;
  genre: Genre;
  area: MixArea;
  effect: EffectGoal;
}

// Analysis Types
export type AnalysisGenre = 'House' | 'EDM' | 'Trance' | 'Garage' | 'Pop' | 'Commercial';
export type AnalysisGoal = 'Club-Ready Track' | 'Radio' | 'Streaming platforms' | 'Pre-Master Mix';

export interface MixAnalysisReport {
  summary: string;
  frequencyAnalysis: {
    description: string;
    lowEnd: string;
    mids: string;
    highs: string;
  };
  stereoImaging: {
    width: string;
    monoCompatibility: string;
  };
  dynamicsAndLoudness: {
    perceivedLoudness: string;
    dynamicRange: string;
  };
  technicalDirectives: string[];
}

// Scale & Chord Types
export type MusicalKey = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';
export type MusicalScaleType = 'Major' | 'Minor (Natural)' | 'Harmonic Minor' | 'Dorian' | 'Phrygian' | 'Lydian' | 'Mixolydian' | 'Locrian' | 'Melodic Minor' | 'Pentatonic Major' | 'Pentatonic Minor';

export interface ChordInfo {
  numeral: string;
  name: string;
  notes: string[];
  type: string;
  mood: string;
}

export interface ScaleAnalysis {
  notes: string[];
  pianoIndices: number[]; // 0-11 for C-B
  chords: ChordInfo[];
  description: string;
  electronicUse: string;
}

// Simplified Auth Types
export interface User {
  name: string;
  entryTimestamp: number;
}
