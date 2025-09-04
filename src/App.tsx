import { useGameState } from "@/hooks/use-game-state";
import { WelcomeScreen } from "@/components/screens/WelcomeScreen";
import { AvatarCreationScreen } from "@/components/screens/AvatarCreationScreen";
import { JourneyScreen } from "@/components/screens/JourneyScreen";
import { CheckInScreen } from "@/components/screens/CheckInScreen";
import { CelebrationScreen } from "@/components/screens/CelebrationScreen";
import { StaffDashboard } from "@/components/screens/StaffDashboard";
import { JourneySetupScreen } from "@/components/screens/JourneySetupScreen";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const { gameState } = useGameState();

  const renderCurrentScreen = () => {
    switch (gameState?.currentScreen) {
      case "welcome":
        return <WelcomeScreen />;
      case "avatar-creation":
        return <AvatarCreationScreen />;
      case "journey":
        return <JourneyScreen />;
      case "check-in":
        return <CheckInScreen />;
      case "celebration":
        return <CelebrationScreen />;
      case "staff-dashboard":
        return <StaffDashboard />;
      case "journey-setup":
        return <JourneySetupScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      {renderCurrentScreen()}
      <Toaster />
    </div>
  );
}

export default App;
