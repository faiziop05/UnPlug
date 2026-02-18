# React Native Illustrations Library

A comprehensive collection of SVG illustrations for React Native mobile applications, perfect for onboarding, authentication, error states, and feature screens.

## Installation

These illustrations use `react-native-svg`. Make sure you have it installed:

```bash
npm install react-native-svg
# or
yarn add react-native-svg
```

## Usage

Import any illustration from the index:

```tsx
import { 
  WelcomeIllustration, 
  LoginIllustration,
  Onboarding1 
} from './components/illustrations';

// Use in your component
<WelcomeIllustration width={300} height={300} />
```

## Available Illustrations

### 📚 Onboarding Screens (5 screens)

1. **Onboarding1** - Welcome/Introduction
   - Person with phone and floating books
   - Use for: App introduction, first screen

2. **Onboarding2** - Choose Topics
   - Category icons (Code, Design, Business, Music, Science)
   - Use for: Topic/interest selection

3. **Onboarding3** - Daily Goals
   - Calendar with checkmarks and progress
   - Use for: Goal setting, habits, streaks

4. **Onboarding4** - Progress Tracking
   - Growth chart with upward trend
   - Use for: Analytics, progress showcase

5. **Onboarding5** - Community
   - Connected people network
   - Use for: Social features, community intro

### 🎯 Authentication

- **LoginIllustration** - Person with key and security shield
- **SignupIllustration** - Uses existing signup carousel components

### ✨ Screen States

- **WelcomeIllustration** - Rocket launching (getting started)
- **NetworkErrorIllustration** - Broken WiFi, disconnected cloud
- **EmptyStateIllustration** - Empty box with question marks
- **SuccessIllustration** - Checkmark with confetti celebration
- **LoadingIllustration** - Hourglass with orbiting dots
- **NotFoundIllustration** - 404 with person and magnifying glass

### 🎨 Feature Screens

- **ProfileIllustration** - Profile card with avatar and badges
- **NotificationIllustration** - Bell with alerts and messages
- **SearchIllustration** - Magnifying glass with documents
- **SettingsIllustration** - Gears and control sliders

### 📖 Learning App Specific

- **LearningIllustration** - Open book with lightbulb
- **FocusIllustration** - Person meditating with focus circles
- **GrowthIllustration** - Plant growing from phone

## Customization

All illustrations accept width and height props:

```tsx
<Onboarding1 width={250} height={250} />
<NetworkErrorIllustration width={200} height={200} />
```

Default size is 300x300px.

## Color Scheme

Illustrations use a consistent color palette:
- Primary: `#6366f1` (Indigo)
- Success: `#10b981` (Green)
- Warning: `#fbbf24` (Amber)
- Error: `#ef4444` (Red)
- Purple: `#8b5cf6`
- Pink: `#ec4899`
- Cyan: `#06b6d4`

## Example Implementation

### Onboarding Carousel

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Onboarding1, Onboarding2, Onboarding3 } from './components/illustrations';

const slides = [
  {
    illustration: Onboarding1,
    title: 'Welcome to LearnApp',
    description: 'Start your learning journey today'
  },
  {
    illustration: Onboarding2,
    title: 'Choose Your Topics',
    description: 'Select what you want to learn'
  },
  {
    illustration: Onboarding3,
    title: 'Set Your Goals',
    description: 'Track your daily progress'
  }
];

export function OnboardingScreen() {
  return (
    <View style={styles.container}>
      {slides.map((slide, index) => (
        <View key={index} style={styles.slide}>
          <slide.illustration width={280} height={280} />
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>
        </View>
      ))}
    </View>
  );
}
```

### Error State

```tsx
import { NetworkErrorIllustration } from './components/illustrations';

function ErrorScreen() {
  return (
    <View style={styles.center}>
      <NetworkErrorIllustration width={200} height={200} />
      <Text>No Internet Connection</Text>
      <Button title="Retry" onPress={handleRetry} />
    </View>
  );
}
```

### Loading State

```tsx
import { LoadingIllustration } from './components/illustrations';

function LoadingScreen() {
  return (
    <View style={styles.center}>
      <LoadingIllustration width={150} height={150} />
      <Text>Loading...</Text>
    </View>
  );
}
```

### Success Modal

```tsx
import { SuccessIllustration } from './components/illustrations';

function SuccessModal() {
  return (
    <Modal visible={showSuccess}>
      <View style={styles.modal}>
        <SuccessIllustration width={180} height={180} />
        <Text>Success!</Text>
        <Text>Your account has been created</Text>
      </View>
    </Modal>
  );
}
```

## File Structure

```
components/illustrations/
├── index.tsx                          # Main export file
├── README.md                          # This file
├── onboarding/
│   ├── Onboarding1.tsx               # Welcome
│   ├── Onboarding2.tsx               # Topics
│   ├── Onboarding3.tsx               # Goals
│   ├── Onboarding4.tsx               # Progress
│   └── Onboarding5.tsx               # Community
├── LearningIllustration.tsx          # Book with lightbulb
├── FocusIllustration.tsx             # Meditation
├── GrowthIllustration.tsx            # Plant from phone
├── WelcomeIllustration.tsx           # Rocket
├── NetworkErrorIllustration.tsx      # Broken WiFi
├── LoginIllustration.tsx             # Key & shield
├── EmptyStateIllustration.tsx        # Empty box
├── SuccessIllustration.tsx           # Checkmark confetti
├── LoadingIllustration.tsx           # Hourglass
├── NotFoundIllustration.tsx          # 404 search
├── ProfileIllustration.tsx           # Profile card
├── NotificationIllustration.tsx      # Bell alerts
├── SearchIllustration.tsx            # Magnifying glass
└── SettingsIllustration.tsx          # Gears

```

## Tips

1. **Performance**: These are pure SVG components, very lightweight
2. **Customization**: Edit colors directly in the TSX files
3. **Animation**: Wrap with Animated.View for animations
4. **Responsive**: Scale illustrations based on screen size
5. **Accessibility**: Add meaningful descriptions for screen readers

## License

Free to use in your React Native projects.
