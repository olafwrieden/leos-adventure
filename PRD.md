# Leo's Adventure - Hospital Journey MVP

A gamified web app to support non-verbal children through hospital visits with interactive avatars, emotional check-ins, and visual journey mapping.

**Experience Qualities**:

1. **Comforting** - Creates a sense of safety and reassurance through friendly visuals and positive reinforcement
2. **Engaging** - Maintains child's attention through interactive elements, rewards, and gamification
3. **Empowering** - Gives children agency to express themselves and understand their journey

**Complexity Level**: Light Application (multiple features with basic state)
The app includes avatar creation, emotional tracking, pain reporting, journey progression, and data collection - multiple interconnected features that require state management but remain focused on a single core purpose.

## Essential Features

**Avatar Creation & Selection**

- Functionality: Child selects and customizes a friendly animal companion (Leo the Lion, other options)
- Purpose: Creates personal connection and reduces anxiety through companionship
- Trigger: App launch after QR code scan
- Progression: Welcome screen → Avatar gallery → Customization (colors/accessories) → Name selection → Journey begins
- Success criteria: Child successfully creates avatar and shows engagement with chosen companion

**Emotional Check-in System**

- Functionality: Visual emotion selection with large, colorful emoji-style faces (happy, worried, scared, excited, etc.)
- Purpose: Enables non-verbal communication of emotional state to medical staff
- Trigger: At journey start and key transition points
- Progression: Avatar asks "How are you feeling?" → Child taps emotion → Positive reinforcement → Data logged
- Success criteria: Child can easily select emotions and staff receive real-time updates

**Pain Level Reporting**

- Functionality: Child-friendly visual pain scale using faces or simple icons (no pain = smile, high pain = tears)
- Purpose: Provides critical medical information without requiring verbal communication
- Trigger: During triage and periodically throughout visit
- Progression: Avatar asks about comfort → Child selects pain level → Gentle response → Medical team notified
- Success criteria: Accurate pain assessment captured and communicated to medical staff

**Visual Hospital Journey Map**

- Functionality: Game-like level progression showing hospital departments as colorful destinations
- Purpose: Reduces anxiety by showing what comes next and gamifies the medical experience
- Trigger: After initial check-ins, progresses through visit
- Progression: Current location highlights → Next step preview → Movement animation → Level completion celebration
- Success criteria: Child understands journey progression and anticipates next steps calmly

**Reward & Recognition System**

- Functionality: Instant positive feedback, badge collection, and "Health Hero" final certificate
- Purpose: Motivates participation and creates positive associations with medical care
- Trigger: Completion of each journey step or check-in
- Progression: Action completed → Celebration animation → Badge awarded → Progress toward final reward
- Success criteria: Child remains engaged and shows pride in earned rewards

**Real-time Data Dashboard (Medical Staff View)**

- Functionality: Live updates of child's emotional state, pain levels, and journey progress
- Purpose: Enables personalized, responsive medical care based on child's expressed needs
- Trigger: Staff access through separate interface
- Progression: Login → Patient selection → Real-time status view → Historical data review
- Success criteria: Medical staff can quickly assess child's state and adjust care accordingly

## Edge Case Handling

- **App crashes or network issues**: Local storage saves progress, app gracefully restarts at last checkpoint
- **Child becomes unresponsive**: Avatar provides gentle encouragement, allows parent/caregiver assistance
- **Missed check-ins**: System sends gentle reminders, doesn't penalize, maintains positive tone
- **Incorrect selections**: Easy undo/change options, no negative feedback for "wrong" choices
- **Multiple children using same device**: Quick profile switching, separate data tracking
- **Medical emergency interruption**: App pauses gracefully, data preserved for later continuation

## Design Direction

The design should feel warm, playful, and reassuring - like a gentle children's book come to life, with soft rounded edges, cheerful colors, and animations that feel magical rather than clinical.

## Color Selection

Triadic color scheme creating a balanced, energetic yet calming environment suitable for reducing medical anxiety.

- **Primary Color**: Warm Sky Blue (oklch(0.7 0.15 220)) - Communicates trust, calm, and reliability like a clear sky
- **Secondary Colors**:
  - Soft Mint Green (oklch(0.8 0.12 150)) - Associated with healing and growth
  - Warm Coral (oklch(0.75 0.18 30)) - Friendly and approachable, energizing without being overwhelming
- **Accent Color**: Golden Yellow (oklch(0.85 0.15 85)) - Captures attention for important actions, represents achievement and joy
- **Foreground/Background Pairings**:
  - Background (Cream White oklch(0.98 0.02 70)): Dark Navy text (oklch(0.25 0.08 220)) - Ratio 12.8:1 ✓
  - Card (Pure White oklch(1 0 0)): Dark Navy text (oklch(0.25 0.08 220)) - Ratio 14.1:1 ✓
  - Primary (Sky Blue oklch(0.7 0.15 220)): White text (oklch(1 0 0)) - Ratio 5.2:1 ✓
  - Secondary (Mint Green oklch(0.8 0.12 150)): Dark Navy text (oklch(0.25 0.08 220)) - Ratio 8.9:1 ✓
  - Accent (Golden Yellow oklch(0.85 0.15 85)): Dark Navy text (oklch(0.25 0.08 220)) - Ratio 7.1:1 ✓

## Font Selection

Typography should be friendly, highly legible, and slightly playful to appeal to children while maintaining clarity for medical staff interfaces.

- **Typographic Hierarchy**:
  - H1 (App Title): Fredoka Bold/32px/normal letter spacing - Playful rounded letters that feel approachable
  - H2 (Section Headers): Fredoka Semi-bold/24px/normal - Maintains consistency with friendly feel
  - H3 (Instructions): Fredoka Medium/20px/normal - Clear hierarchy for step-by-step guidance
  - Body Text: Inter Regular/16px/relaxed line height - Excellent readability for longer content
  - Button Labels: Fredoka Medium/18px/normal - Stands out as interactive elements
  - Dashboard Text (Staff): Inter Regular/14px/normal - Professional and efficient for medical use

## Animations

Animations should feel magical and encouraging, creating moments of delight that help children associate positive feelings with their hospital experience.

- **Purposeful Meaning**: Gentle bounces and soft glows reinforce the caring, magical atmosphere while celebrating child achievements
- **Hierarchy of Movement**:
  - Avatar interactions get primary animation focus with expressive movements
  - Progress and rewards receive celebratory animations
  - Transitions use soft, cloud-like movements rather than sharp geometric slides

## Component Selection

- **Components**:

  - Cards for journey steps and avatar selection with soft shadows and rounded corners
  - Buttons with large touch targets and satisfying press animations
  - Progress indicators showing journey completion as a visual path
  - Dialogs for emotion check-ins with full-screen friendly overlays
  - Badges/Avatar components for character display and customization
  - Tabs for staff dashboard organization

- **Customizations**:

  - Large emoji-style emotion selector grid (custom component)
  - Interactive hospital journey map with animated paths (custom)
  - Avatar creator with drag-drop accessories (custom)
  - Celebration animation overlay for achievements (custom)

- **States**:

  - Buttons have gentle hover glows and satisfying tap animations
  - Interactive elements grow slightly on touch to provide immediate feedback
  - Selected states use the golden accent color with soft highlighting
  - Disabled states fade gracefully rather than becoming harsh

- **Icon Selection**:

  - Phosphor icons for navigation and UI controls (gentle, rounded style)
  - Custom illustrated emotions and medical equipment icons
  - Playful avatar customization icons (hats, colors, accessories)

- **Spacing**:

  - Generous padding (16px-24px) for child-friendly touch targets
  - Consistent 8px spacing grid with larger gaps around primary actions
  - Extra whitespace to reduce visual overwhelm

- **Mobile**:
  - Mobile-first design with portrait orientation priority
  - Large touch targets (minimum 44px, preferred 56px)
  - Swipe gestures for journey navigation
  - Collapsible staff dashboard optimized for tablet viewing
  - Progressive enhancement from basic emoji selection to rich animations
