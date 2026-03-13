
import { DAW, Genre, MixArea, EffectGoal, MusicalKey, MusicalScaleType } from './types';

export const DAWS: DAW[] = ['Ableton Live', 'Logic Pro', 'FL Studio', 'Studio One', 'Cubase', 'Bitwig'];

export const GENRES: Genre[] = [
  'House', 'Melodic House', 'Deep House', 'Tech House', 'Techno', 'Garage', 'Afro House', 'Disco House',
  'Funky House', 'Soulful House', 'Trance', 'EDM', 'Bass House', 'Jackin House', 'Piano House'
];

export const MIX_AREAS: MixArea[] = [
  'Drum Bus', 'Kick Drum', 'Snare/Clap', 'Vocals', 'Bassline', 'Master Bus', 'Synths', 'Percussion', 'Piano'
];

export const EFFECT_GOALS: EffectGoal[] = [
  'Punchy', 'Warm/Analog', 'Clean/Transparent', 'Aggressive', 'Beefy Low End', 'Wide Stereo', 'Clarity/Air', 'Polished Final Master', 'Layering', 'Adding Groove', 'Bring Forward'
];

export const MUSICAL_KEYS: MusicalKey[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const SCALE_TYPES: MusicalScaleType[] = [
  'Major', 'Minor (Natural)', 'Harmonic Minor', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Locrian', 'Melodic Minor', 'Pentatonic Major', 'Pentatonic Minor'
];
