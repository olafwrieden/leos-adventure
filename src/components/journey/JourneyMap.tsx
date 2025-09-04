import { JourneyStep } from '@/types';
import { CheckCircle, Circle } from '@phosphor-icons/react';

interface JourneyMapProps {
  steps: JourneyStep[];
}

export function JourneyMap({ steps }: JourneyMapProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div 
          key={step.id}
          className={`flex items-center space-x-4 p-3 rounded-lg transition-all ${
            step.current ? 'bg-primary/10 ring-2 ring-primary/20' : 
            step.completed ? 'bg-accent/10' : 'bg-muted/30'
          }`}
        >
          {/* Step Icon/Status */}
          <div className="flex-shrink-0">
            {step.completed ? (
              <CheckCircle className="w-8 h-8 text-accent" weight="fill" />
            ) : step.current ? (
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">{index + 1}</span>
              </div>
            ) : (
              <Circle className="w-8 h-8 text-muted-foreground" />
            )}
          </div>

          {/* Step Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{step.icon}</span>
              <h4 className={`font-fredoka font-semibold ${
                step.current ? 'text-primary' : 
                step.completed ? 'text-accent-foreground' : 'text-muted-foreground'
              }`}>
                {step.title}
              </h4>
            </div>
            <p className={`text-sm leading-relaxed ${
              step.current ? 'text-foreground' : 
              step.completed ? 'text-muted-foreground' : 'text-muted-foreground/70'
            }`}>
              {step.description}
            </p>
          </div>

          {/* Connection Line */}
          {index < steps.length - 1 && (
            <div className={`absolute left-8 mt-12 w-0.5 h-8 ${
              steps[index + 1].completed || steps[index + 1].current ? 'bg-accent' : 'bg-muted'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}