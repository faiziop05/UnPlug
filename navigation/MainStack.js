import React, { useEffect } from "react";
import { View, StatusBar, ActivityIndicator } from "react-native";
import SignIn from "../src/auth/SignIn";
import SignUp from "../src/auth/SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "../utlils/theme";
import VerifyOTP from "../src/auth/VerifyOTP";
import { AuthSelection, OnBoarding, XPLevel, Subscription, CompletedPlans, NoteEditor, Profile, ThemeSelector } from "../src";
import PersonalizationQuiz from "../src/main/PersonalizationQuiz";
import TermsPrivacy from "../src/main/TermsPrivacy";
import HelpSupport from "../src/main/HelpSupport";
import BottomTabStack from "./BottomTabStack";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData } from "../src/redux/thunks/fetchAllData";
import { selectThemeId } from "../src/redux/slices/themeSlice";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const theme = useSelector(selectThemeId);
  const { userToken, isLoading, isFirstLaunch, hasCompletedQuiz } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userToken) {
      dispatch(fetchAllData());
    }
  }, [dispatch, userToken]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: useTheme(theme).background.main }}>
        <ActivityIndicator size="large" color={useTheme(theme).brand.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: useTheme(theme).background.main }}>
      <StatusBar barStyle={useTheme(theme).mode === 'light' ? 'dark-content' : 'light-content'} backgroundColor={useTheme(theme).background.main} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right", // smooth native slide
          contentStyle: { backgroundColor: useTheme(theme).background.main },
        }}
      >
        {userToken ? (
          <>
            {!hasCompletedQuiz && (
              <Stack.Screen
                name="PersonalizationQuiz"
                component={PersonalizationQuiz}
                options={{ gestureEnabled: false }}
              />
            )}
            <Stack.Screen name="BottomTabStack" component={BottomTabStack} />
            <Stack.Screen name="XPLevel" component={XPLevel} options={{ presentation: 'modal' }} />
            <Stack.Screen name="Subscription" component={Subscription} options={{ presentation: 'modal' }} />
            <Stack.Screen name="CompletedPlans" component={CompletedPlans} />

            <Stack.Screen name="NoteEditor" component={NoteEditor} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ThemeSelector" component={ThemeSelector} />
            <Stack.Screen name="TermsPrivacy" component={TermsPrivacy} />
            <Stack.Screen name="HelpSupport" component={HelpSupport} />
          </>
        ) : (
          <>
            {isFirstLaunch && (
              <Stack.Screen name="OnBoarding" component={OnBoarding} />
            )}
            <Stack.Screen name="AuthSelection" component={AuthSelection} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
          </>
        )}
      </Stack.Navigator>
    </View>
  );
};

export default MainStack;
