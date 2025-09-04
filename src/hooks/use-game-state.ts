import { useState, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { GameState, ChildProfile, JourneyStep } from '@/types';
import { DEFAULT_JOURNEY_STEPS } from '@/lib/constants';
import { useAllProfiles } from './use-all-profiles';

export function useGameState() {
  const [gameState, setGameState] = useKV<GameState>('leos-adventures-state', {
    currentScreen: 'welcome',
    journeySteps: DEFAULT_JOURNEY_STEPS,
    showStaffAccess: false,
  });

  const { addOrUpdateProfile } = useAllProfiles();

  const updateCurrentScreen = (screen: GameState['currentScreen']) => {
    console.log('Updating screen to:', screen);
    setGameState(current => ({
      ...current,
      currentScreen: screen
    }));
  };

  const createChildProfile = (profile: ChildProfile) => {
    setGameState(current => ({
      ...current,
      childProfile: profile,
      currentScreen: 'journey'
    }));
    addOrUpdateProfile(profile);
  };

  const updateJourneyStep = (stepId: string, completed: boolean = true) => {
    console.log('updateJourneyStep called with:', stepId, completed);
    setGameState(current => {
      console.log('Current journey steps:', current.journeySteps);
      
      const stepIndex = current.journeySteps.findIndex(s => s.id === stepId);
      console.log('Found step index:', stepIndex);
      
      if (stepIndex === -1) {
        console.error('Step not found:', stepId);
        return current;
      }

      const updatedSteps = current.journeySteps.map((step, index) => {
        if (step.id === stepId) {
          return { ...step, completed, current: false };
        }
        return step;
      });

      // Mark next step as current if we completed this step
      if (completed && stepIndex < updatedSteps.length - 1) {
        updatedSteps[stepIndex + 1].current = true;
      }

      const updatedProfile = current.childProfile ? {
        ...current.childProfile,
        currentStep: completed ? Math.min(current.childProfile.currentStep + 1, updatedSteps.length - 1) : current.childProfile.currentStep,
        completedSteps: completed 
          ? [...current.childProfile.completedSteps.filter(id => id !== stepId), stepId]
          : current.childProfile.completedSteps.filter(id => id !== stepId)
      } : current.childProfile;

      if (updatedProfile) {
        addOrUpdateProfile(updatedProfile);
      }

      const newState = {
        ...current,
        journeySteps: updatedSteps,
        childProfile: updatedProfile
      };
      
      console.log('New state:', newState);
      return newState;
    });
  };

  const addEmotionEntry = (emotion: ChildProfile['emotions'][0]) => {
    setGameState(current => {
      const updatedProfile = current.childProfile ? {
        ...current.childProfile,
        emotions: [...current.childProfile.emotions, emotion]
      } : current.childProfile;

      if (updatedProfile) {
        addOrUpdateProfile(updatedProfile);
      }

      return {
        ...current,
        childProfile: updatedProfile
      };
    });
  };

  const addPainEntry = (pain: ChildProfile['painLevels'][0]) => {
    setGameState(current => {
      const updatedProfile = current.childProfile ? {
        ...current.childProfile,
        painLevels: [...current.childProfile.painLevels, pain]
      } : current.childProfile;

      if (updatedProfile) {
        addOrUpdateProfile(updatedProfile);
      }

      return {
        ...current,
        childProfile: updatedProfile
      };
    });
  };

  const awardBadge = (badgeId: string) => {
    setGameState(current => {
      const updatedProfile = current.childProfile ? {
        ...current.childProfile,
        badges: current.childProfile.badges.includes(badgeId) 
          ? current.childProfile.badges 
          : [...current.childProfile.badges, badgeId]
      } : current.childProfile;

      if (updatedProfile) {
        addOrUpdateProfile(updatedProfile);
      }

      return {
        ...current,
        childProfile: updatedProfile
      };
    });
  };

  const toggleStaffAccess = () => {
    console.log('Toggling staff access, current:', gameState.showStaffAccess);
    setGameState(current => ({
      ...current,
      showStaffAccess: !current.showStaffAccess
    }));
  };

  const resetGame = () => {
    setGameState({
      currentScreen: 'welcome',
      journeySteps: DEFAULT_JOURNEY_STEPS,
      showStaffAccess: false,
    });
  };

  return {
    gameState,
    updateCurrentScreen,
    createChildProfile,
    updateJourneyStep,
    addEmotionEntry,
    addPainEntry,
    awardBadge,
    toggleStaffAccess,
    resetGame
  };
}