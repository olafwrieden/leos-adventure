export interface Avatar {
  id: string;
  name: string;
  type: 'lion' | 'elephant' | 'giraffe' | 'panda';
  color: string;
  accessory?: string;
}

export interface EmotionEntry {
  id: string;
  emotion: 'happy' | 'excited' | 'worried' | 'scared' | 'angry' | 'sad';
  timestamp: Date;
  journeyStep: string;
}

export interface PainEntry {
  id: string;
  level: 0 | 1 | 2 | 3 | 4 | 5; // 0 = no pain, 5 = worst pain
  timestamp: Date;
  journeyStep: string;
}

export interface JourneyStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  current: boolean;
}

export interface JourneyTemplate {
  id: string;
  name: string;
  description: string;
  department: string;
  estimatedDuration: string;
  steps: Omit<JourneyStep, 'completed' | 'current'>[];
  color: string;
}

export interface ChildProfile {
  id: string;
  name: string;
  avatar: Avatar;
  emotions: EmotionEntry[];
  painLevels: PainEntry[];
  currentStep: number;
  completedSteps: string[];
  badges: string[];
  visitStartTime: Date;
}

export interface GameState {
  currentScreen: 'welcome' | 'avatar-creation' | 'journey' | 'check-in' | 'celebration' | 'staff-dashboard' | 'journey-setup';
  childProfile?: ChildProfile;
  journeySteps: JourneyStep[];
  selectedJourneyTemplate?: JourneyTemplate;
  patientName?: string; // Name entered during journey setup
  showStaffAccess: boolean;
}