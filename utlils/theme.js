// Theme Definitions
export const THEMES = {
  ocean_dark: {
    id: 'ocean_dark',
    name: 'Ocean Dark',
    description: 'Deep blue waters with vibrant highlights',
    mode: 'dark',
    brand: {
      primary: "#06B6D4", // Cyan-500: Bright for dark mode
      primaryHover: "#0891B2", // Interaction state
      secondary: "#F472B6", // Pink-400: Softer pink for dark mode
      accent: "#FCD34D", // Yellow-300: Gold/Stars
    },
    background: {
      main: "#0C1222", // Very dark blue
      surface: "#1E293B", // Slate-800: Cards, Inputs
      surfaceHighlight: "#334155", // Pressed state
      modal: "#1E293B", // Popups
    },
    text: {
      primary: "#F1F5F9", // Slate-100: Headings
      secondary: "#CBD5E1", // Slate-300: Body text
      muted: "#64748B", // Slate-500: Captions
      inverted: "#0C1222", // Text on Primary Buttons
    },
    border: {
      subtle: "#334155", // Darker dividers
      focus: "#06B6D4", // Active Input border
    },
    status: {
      success: "#34D399", // Softer Green
      error: "#F87171", // Softer Red
      warning: "#FBBF24", // Softer Orange
      info: "#60A5FA", // Softer Blue
    },
  },
  teal_light: {
    id: 'teal_light',
    name: 'Teal Breeze',
    description: 'Fresh and clean with teal accents',
    mode: 'light',
    brand: {
      primary: "#0F766E", // Deep Teal: Main buttons, active tabs, brand headers
      primaryHover: "#115E59", // Slightly darker interaction state
      secondary: "#F43F5E", // Soft Coral: Streaks, 'Hot' items, badges
      accent: "#F59E0B", // Amber: XP, Levels, Stars
    },
    background: {
      main: "#F8FAFC", // Off-white/Slate-50: Main app background (not harsh white)
      surface: "#FFFFFF", // Pure White: Cards, Lists, Inputs
      surfaceHighlight: "#F1F5F9", // Slight grey for pressed list items
      modal: "#FFFFFF", // Popups/Bottom Sheets
    },
    text: {
      primary: "#0F172A", // Slate-900: Headings, Main Titles (High Contrast)
      secondary: "#475569", // Slate-600: Body text, descriptions
      muted: "#94A3B8", // Slate-400: Placeholders, captions, timestamps
      inverted: "#FFFFFF", // Text on Primary Buttons
    },
    border: {
      subtle: "#E2E8F0", // Divider lines, Input borders
      focus: "#0F766E", // Active Input border
    },
    status: {
      success: "#10B981", // Green: Task Completed
      error: "#EF4444", // Red: Validation errors, dangerous actions
      warning: "#F59E0B", // Orange: Alerts
      info: "#3B82F6", // Blue: Links, tips
    },
  },
  deep_night: {
    id: 'deep_night',
    name: 'Deep Night',
    description: 'Classic dark theme with teal accents',
    mode: 'dark',
    brand: {
      primary: "#2DD4BF", // Teal-400: Lighter/brighter for dark mode readability
      primaryHover: "#14B8A6", // Interaction state
      secondary: "#FB7185", // Rose-400: Softer coral for dark mode
      accent: "#FBBF24", // Amber-400: Gold/Stars
    },
    background: {
      main: "#0F172A", // Slate-900: Deep Blue-Black (Better than #000000)
      surface: "#1E293B", // Slate-800: Cards, Inputs (Lighter than background)
      surfaceHighlight: "#334155", // Pressed state
      modal: "#1E293B", // Popups
    },
    text: {
      primary: "#F1F5F9", // Slate-100: Headings (Soft White)
      secondary: "#CBD5E1", // Slate-300: Body text
      muted: "#64748B", // Slate-500: Captions
      inverted: "#0F172A", // Text on Primary Buttons
    },
    border: {
      subtle: "#334155", // Darker dividers
      focus: "#2DD4BF", // Active Input border
    },
    status: {
      success: "#34D399", // Softer Green
      error: "#F87171", // Softer Red
      warning: "#FBBF24", // Softer Orange
      info: "#60A5FA", // Softer Blue
    },
  },
  midnight_purple: {
    id: 'midnight_purple',
    name: 'Midnight Purple',
    description: 'Deep purple with warm accents',
    mode: 'dark',
    brand: {
      primary: "#A78BFA", // Purple-400: Vibrant for dark mode
      primaryHover: "#8B5CF6", // Purple-500: Interaction state
      secondary: "#FB7185", // Rose-400: Warm accent
      accent: "#FBBF24", // Amber-400: Gold highlights
    },
    background: {
      main: "#1E1B2E", // Deep purple-black
      surface: "#2D2938", // Lighter purple surface
      surfaceHighlight: "#3D3A4D", // Pressed state
      modal: "#2D2938", // Popups
    },
    text: {
      primary: "#F3F4F6", // Gray-100: Headings
      secondary: "#D1D5DB", // Gray-300: Body text
      muted: "#9CA3AF", // Gray-400: Captions
      inverted: "#1E1B2E", // Text on Primary Buttons
    },
    border: {
      subtle: "#3D3A4D", // Darker dividers
      focus: "#A78BFA", // Active Input border
    },
    status: {
      success: "#34D399", // Green-400
      error: "#F87171", // Red-400
      warning: "#FBBF24", // Amber-400
      info: "#60A5FA", // Blue-400
    },
  },
  forest_night: {
    id: 'forest_night',
    name: 'Forest Night',
    description: 'Dark forest with emerald highlights',
    mode: 'dark',
    brand: {
      primary: "#10B981", // Emerald-500: Bright green for dark
      primaryHover: "#059669", // Emerald-600: Interaction
      secondary: "#6EE7B7", // Emerald-300: Light accent
      accent: "#FCD34D", // Yellow-300: Highlights
    },
    background: {
      main: "#0C1A14", // Very dark green-black
      surface: "#1A2E23", // Dark green surface
      surfaceHighlight: "#2D4A3A", // Pressed state
      modal: "#1A2E23", // Popups
    },
    text: {
      primary: "#F0FDF4", // Green-50: Headings
      secondary: "#D1FAE5", // Green-100: Body text
      muted: "#86EFAC", // Green-300: Captions
      inverted: "#0C1A14", // Text on buttons
    },
    border: {
      subtle: "#2D4A3A", // Darker dividers
      focus: "#10B981", // Active borders
    },
    status: {
      success: "#34D399", // Emerald-400
      error: "#F87171", // Red-400
      warning: "#FBBF24", // Amber-400
      info: "#60A5FA", // Blue-400
    },
  },

};

// Legacy export for compatibility
export const COLORS = {
  light: THEMES.teal_light,
  dark: THEMES.deep_night,
};

// Helper to get theme by ID
export const getThemeById = (themeId) => {
  return THEMES[themeId] || THEMES.teal_light;
};

// Helper to get all theme IDs
export const getAllThemeIds = () => {
  return Object.keys(THEMES);
};

// Helper to get all themes as array
export const getAllThemes = () => {
  return Object.values(THEMES);
};

export const useTheme = (themeId = 'teal_light') => {
  return getThemeById(themeId);
};