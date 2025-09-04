import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGameState } from '@/hooks/use-game-state';
import { AvatarDisplay } from '@/components/avatar/AvatarDisplay';

export function CelebrationScreen() {
  const { gameState, updateCurrentScreen, resetGame } = useGameState();
  const { childProfile } = gameState;

  if (!childProfile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-background to-primary/20 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Celebration Animation */}
        <div className="space-y-4">
          <div className="text-8xl animate-sparkle">🏆</div>
          <div className="flex justify-center space-x-2">
            <span className="text-2xl animate-bounce-gentle">⭐</span>
            <span className="text-3xl animate-bounce-gentle" style={{animationDelay: '0.1s'}}>✨</span>
            <span className="text-2xl animate-bounce-gentle" style={{animationDelay: '0.2s'}}>🌟</span>
          </div>
        </div>

        {/* Achievement Card */}
        <Card className="p-8 space-y-6 hover-lift animate-glow-pulse">
          <div className="space-y-4">
            <AvatarDisplay avatar={childProfile.avatar} size="lg" showName />
            <div className="space-y-2">
              <h1 className="text-3xl font-fredoka font-bold text-accent-foreground">
                🎉 HEALTH HERO! 🎉
              </h1>
              <h2 className="text-2xl font-fredoka font-bold text-foreground">
                {childProfile.name}, you did AMAZING!
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                You completed your hospital adventure with courage and bravery. 
                You're officially a Health Hero!
              </p>
            </div>
          </div>

          {/* Badge Collection */}
          <div className="space-y-3">
            <h3 className="text-lg font-fredoka font-semibold">
              Your Amazing Badges:
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {childProfile.badges.map((badgeId) => (
                <div 
                  key={badgeId}
                  className="flex items-center space-x-2 bg-accent/20 rounded-lg px-3 py-2"
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
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-4">
          <Button
            size="lg"
            onClick={() => updateCurrentScreen('journey')}
            className="w-full touch-target font-fredoka text-lg hover-lift"
          >
            <span>See My Journey</span>
            <span className="text-xl ml-2">📍</span>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              resetGame();
              updateCurrentScreen('welcome');
            }}
            className="w-full touch-target font-fredoka text-lg hover-lift"
          >
            <span>Start New Adventure</span>
            <span className="text-xl ml-2">🚀</span>
          </Button>
        </div>

        {/* Final Message */}
        <Card className="p-4 bg-gradient-to-r from-accent/10 to-primary/10">
          <div className="space-y-2">
            <div className="text-2xl">💝</div>
            <p className="font-fredoka font-medium text-foreground">
              Remember: You are brave, you are strong, and you are loved!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}