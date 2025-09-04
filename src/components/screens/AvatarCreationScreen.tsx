import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useGameState } from '@/hooks/use-game-state';
import { AVATAR_TYPES, AVATAR_COLORS } from '@/lib/constants';
import { Avatar, ChildProfile } from '@/types';
import { ArrowLeft, Check } from '@phosphor-icons/react';
import { toast } from 'sonner';

export function AvatarCreationScreen() {
  const { updateCurrentScreen, createChildProfile, awardBadge, gameState } = useGameState();
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [childName, setChildName] = useState<string>(gameState?.patientName || '');
  const [step, setStep] = useState<'type' | 'color' | 'name'>('type');

  const handleCreateProfile = () => {
    if (!selectedType || !selectedColor || !childName.trim()) {
      toast.error('Please complete all steps!');
      return;
    }

    const avatar: Avatar = {
      id: `${selectedType}-${selectedColor}-${Date.now()}`,
      name: `${childName}'s ${AVATAR_TYPES.find(t => t.id === selectedType)?.name || 'Friend'}`,
      type: selectedType as Avatar['type'],
      color: selectedColor,
    };

    const profile: ChildProfile = {
      id: `child-${Date.now()}`,
      name: childName,
      avatar,
      emotions: [],
      painLevels: [],
      currentStep: 0,
      completedSteps: [],
      badges: ['brave-start'],
      visitStartTime: new Date(),
    };

    createChildProfile(profile);
    awardBadge('brave-start');
    toast.success(`Welcome ${childName}! Let's start your adventure! 🌟`);
  };

  const selectedAvatarType = AVATAR_TYPES.find(t => t.id === selectedType);
  const selectedAvatarColor = AVATAR_COLORS.find(c => c.id === selectedColor);

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-background to-primary/10 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => updateCurrentScreen('welcome')}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-fredoka font-bold text-foreground">
          Create Your Friend
        </h1>
        <div className="w-16" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-8">
        {/* Avatar Preview */}
        <Card className="p-6 text-center hover-lift">
          <div className="space-y-4">
            <div 
              className="text-6xl"
              style={{ 
                color: selectedAvatarColor?.color || 'currentColor',
                filter: selectedAvatarColor ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' : 'none'
              }}
            >
              {selectedAvatarType?.emoji || '🤗'}
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-fredoka font-semibold">
                {selectedAvatarType ? 
                  `${childName || 'Your'} ${selectedAvatarType.name}` : 
                  'Choose your adventure friend!'
                }
              </h3>
              <p className="text-sm text-muted-foreground">
                {selectedAvatarColor?.name && `Wearing ${selectedAvatarColor.name}`}
              </p>
            </div>
          </div>
        </Card>

        {/* Step Content */}
        <div className="max-w-md w-full space-y-6">
          {step === 'type' && (
            <div className="space-y-4">
              <h2 className="text-xl font-fredoka font-semibold text-center">
                Choose your adventure friend:
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {AVATAR_TYPES.map((type) => (
                  <Card 
                    key={type.id}
                    className={`p-4 cursor-pointer touch-target hover-lift transition-all ${
                      selectedType === type.id ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                    onClick={() => {
                      setSelectedType(type.id);
                      setTimeout(() => setStep('color'), 500);
                    }}
                  >
                    <div className="text-center space-y-2">
                      <div className="text-3xl">{type.emoji}</div>
                      <p className="text-sm font-fredoka font-medium">
                        {type.name}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {step === 'color' && selectedType && (
            <div className="space-y-4">
              <h2 className="text-xl font-fredoka font-semibold text-center">
                Pick a color for {selectedAvatarType?.name}:
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {AVATAR_COLORS.map((color) => (
                  <Card 
                    key={color.id}
                    className={`p-4 cursor-pointer touch-target hover-lift transition-all ${
                      selectedColor === color.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => {
                      setSelectedColor(color.id);
                      setTimeout(() => setStep('name'), 500);
                    }}
                  >
                    <div className="text-center space-y-2">
                      <div 
                        className="w-8 h-8 rounded-full mx-auto"
                        style={{ backgroundColor: color.color }}
                      />
                      <p className="text-xs font-fredoka font-medium">
                        {color.name}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {step === 'name' && selectedType && selectedColor && (
            <div className="space-y-4">
              <h2 className="text-xl font-fredoka font-semibold text-center">
                What's your name?
              </h2>
              <div className="space-y-4">
                <Input
                  placeholder="Type your name here..."
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="text-center text-lg font-fredoka touch-target"
                  maxLength={20}
                />
                <Button
                  size="lg"
                  onClick={handleCreateProfile}
                  disabled={!childName.trim()}
                  className="w-full touch-target font-fredoka text-lg hover-lift"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Start Adventure!
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Progress Steps */}
        <div className="flex space-x-2">
          {['type', 'color', 'name'].map((stepName, index) => (
            <div
              key={stepName}
              className={`w-3 h-3 rounded-full transition-colors ${
                step === stepName ? 'bg-primary' :
                ['type', 'color', 'name'].indexOf(step) > index ? 'bg-accent' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}