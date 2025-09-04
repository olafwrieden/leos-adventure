import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGameState } from '@/hooks/use-game-state';
import { ArrowLeft, Heart, Smiley } from '@phosphor-icons/react';
import { JourneyMap } from '@/components/journey/JourneyMap';
import { AvatarDisplay } from '@/components/avatar/AvatarDisplay';
import { toast } from 'sonner';

export function JourneyScreen() {
  const { gameState, updateCurrentScreen, updateJourneyStep, awardBadge, createTestProfile, createTestProfiles } = useGameState();
  const { childProfile, journeySteps } = gameState;

  if (!childProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <Card className="p-8 space-y-6">
            <h2 className="text-2xl font-fredoka font-bold text-foreground">
              Let's create your adventure friend first!
            </h2>
            <Button
              size="lg"
              onClick={() => updateCurrentScreen('welcome')}
              className="w-full touch-target font-fredoka text-lg hover-lift"
            >
              Start Adventure
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const currentStep = journeySteps.find(step => step.current);
  const completedCount = journeySteps.filter(step => step.completed).length;
  const totalSteps = journeySteps.length;

  const handleStepComplete = (stepId: string) => {
    console.log('Completing step:', stepId);
    updateJourneyStep(stepId, true);
    awardBadge('step-completed');
    toast.success('🎉 Step completed! You\'re doing amazing!');
    
    // Check if this was the last step
    const stepIndex = journeySteps.findIndex(s => s.id === stepId);
    if (stepIndex === journeySteps.length - 1) {
      // Last step completed, go to celebration
      toast.success('🏆 Adventure complete! You\'re a Health Hero!');
      setTimeout(() => updateCurrentScreen('celebration'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card/50 backdrop-blur-sm">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => updateCurrentScreen('welcome')}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Home
        </Button>
        
        <div className="text-center">
          <h1 className="text-lg font-fredoka font-bold text-foreground">
            {childProfile.name}'s Adventure
          </h1>
          <p className="text-sm text-muted-foreground">
            Step {completedCount + 1} of {totalSteps}
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => updateCurrentScreen('check-in')}
        >
          <Heart className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Avatar and Current Step */}
        <Card className="p-6 hover-lift">
          <div className="flex items-center space-x-4">
            <AvatarDisplay avatar={childProfile.avatar} size="lg" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{currentStep?.icon}</span>
                <h2 className="text-xl font-fredoka font-bold text-foreground">
                  {currentStep?.title}
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                {currentStep?.description}
              </p>
            </div>
          </div>
        </Card>

        {/* Journey Map */}
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-fredoka font-semibold text-center">
              Your Adventure Map
            </h3>
            {currentStep && (
              <div className="bg-primary/10 p-3 rounded-lg text-center">
                <p className="text-sm font-fredoka text-primary font-medium">
                  💡 Tap the highlighted step below to mark it as complete!
                </p>
              </div>
            )}
            <JourneyMap steps={journeySteps} onStepComplete={handleStepComplete} />
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => updateCurrentScreen('check-in')}
            className="touch-target font-fredoka hover-lift"
          >
            <Smiley className="w-5 h-5 mr-2" weight="fill" />
            How I Feel
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => updateCurrentScreen('check-in')}
            className="touch-target font-fredoka hover-lift"
          >
            <Heart className="w-5 h-5 mr-2" weight="fill" />
            My Comfort
          </Button>
        </div>

        {/* Test Navigation Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              console.log('Navigating to celebration');
              // Create a test profile if none exists
              if (!childProfile) {
                createTestProfile();
              }
              updateCurrentScreen('celebration');
            }}
            className="touch-target font-fredoka hover-lift"
          >
            🏆 Test Celebration
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              console.log('Navigating to staff dashboard');
              createTestProfiles(); // Ensure we have test data
              updateCurrentScreen('staff-dashboard');
            }}
            className="touch-target font-fredoka hover-lift"
          >
            👩‍⚕️ Test Staff Dashboard
          </Button>
        </div>
        
        {/* Direct Home Button */}
        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            console.log('Direct home navigation');
            updateCurrentScreen('welcome');
          }}
          className="w-full touch-target font-fredoka hover-lift"
        >
          🏠 Back to Home
        </Button>

        {/* Recent Badges */}
        {childProfile.badges.length > 0 && (
          <Card className="p-4">
            <h3 className="text-lg font-fredoka font-semibold mb-3 text-center">
              Your Amazing Badges
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {childProfile.badges.slice(-3).map((badgeId) => (
                <div 
                  key={badgeId}
                  className="flex items-center space-x-1 bg-accent/20 rounded-full px-3 py-1"
                >
                  <span className="text-xl">🏆</span>
                  <span className="text-sm font-fredoka font-medium">
                    {badgeId.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Encouragement */}
        <Card className="p-4 bg-gradient-to-r from-accent/10 to-primary/10">
          <div className="text-center space-y-2">
            <div className="text-3xl animate-bounce-gentle">✨</div>
            <p className="font-fredoka font-medium text-foreground">
              You're doing amazing, {childProfile.name}!
            </p>
            <p className="text-sm text-muted-foreground">
              Keep going on your brave adventure!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}