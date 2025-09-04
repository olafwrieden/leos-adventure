import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGameState } from '@/hooks/use-game-state';
import { Heart, Settings } from '@phosphor-icons/react';

export function WelcomeScreen() {
  const { updateCurrentScreen, toggleStaffAccess, gameState, createTestProfile, createTestProfiles } = useGameState();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex flex-col items-center justify-center p-4">
      {/* Staff Access Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          console.log('Toggling staff access');
          toggleStaffAccess();
        }}
        className="absolute top-4 right-4 opacity-20 hover:opacity-100"
      >
        <Settings className="w-5 h-5" />
      </Button>

      {/* Main Welcome Content */}
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Logo/Title */}
        <div className="space-y-4">
          <div className="text-6xl animate-bounce-gentle">🦁</div>
          <h1 className="text-4xl font-fredoka font-bold text-foreground">
            Leo's Adventures
          </h1>
          <p className="text-xl font-fredoka text-muted-foreground">
            Your magical hospital journey starts here!
          </p>
        </div>

        {/* Welcome Card */}
        <Card className="p-8 space-y-6 hover-lift">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Heart className="w-12 h-12 text-destructive animate-glow-pulse" weight="fill" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-fredoka font-semibold text-foreground">
                Welcome, brave adventurer!
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Today you're going on a special adventure through the hospital. 
                You'll meet new friends, earn amazing badges, and become a real Health Hero!
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              size="lg"
              onClick={() => updateCurrentScreen('avatar-creation')}
              className="w-full touch-target font-fredoka text-lg hover-lift"
            >
              <span>Start My Adventure!</span>
              <span className="text-xl ml-2">✨</span>
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Ask a grown-up to help if you need it
            </p>
          </div>
        </Card>

        {/* Quick Info */}
        <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <span>🎮</span>
            <span>Fun & Safe</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>🏆</span>
            <span>Earn Badges</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>💝</span>
            <span>Share Feelings</span>
          </div>
        </div>
      </div>

      {/* Staff Dashboard Access */}
      {gameState.showStaffAccess && (
        <div className="absolute bottom-4 left-4 space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              console.log('Clicking staff dashboard');
              createTestProfiles(); // Create some test data
              updateCurrentScreen('staff-dashboard');
            }}
            className="opacity-50 hover:opacity-100 block"
          >
            Staff Dashboard
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              createTestProfiles();
            }}
            className="opacity-30 hover:opacity-100 block text-xs"
          >
            Add Test Data
          </Button>
        </div>
      )}

      {/* Test Navigation */}
      <div className="absolute bottom-4 right-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            console.log('Test celebration click');
            createTestProfile();
            updateCurrentScreen('celebration');
          }}
          className="opacity-50 hover:opacity-100"
        >
          Test Celebration
        </Button>
      </div>
    </div>
  );
}