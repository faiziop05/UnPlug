import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Home, CreatePlan, Achievements, Notes, Favorites } from "../src";
import { useTheme } from "../utlils/theme";
import { useSelector } from "react-redux";
import { selectThemeMode } from "../src/redux/slices/themeSlice";

const Tab = createBottomTabNavigator();

export default function BottomTabStack() {
  const themeMode = useSelector(selectThemeMode);
  const theme = useTheme(themeMode);
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background.surface,
          borderTopColor: theme.border.subtle,
          height: 55 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 5,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "layers-outline";
          if (route.name === "CreatePlan") iconName = "compass-outline";
          if (route.name === "Achievements") iconName = "medal-outline";
          if (route.name === "Favorites") iconName = "bookmark-outline";
          if (route.name === "Notes") iconName = "reader-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.brand.primary,
        tabBarInactiveTintColor: theme.text.secondary,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="CreatePlan" component={CreatePlan} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Achievements" component={Achievements} />
      <Tab.Screen name="Notes" component={Notes} />
    </Tab.Navigator>
  );
}
