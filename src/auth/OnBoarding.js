import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Vibration,
  Platform,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../../utlils/theme";
import { useDispatch, useSelector } from "react-redux";
import { completeOnboarding } from "../redux/slices/authSlice";

// Import SVGs
import { Onboarding1, Onboarding2, Onboarding3, Onboarding4, GrowthIllustration } from "../../assets/SVGS";
import { selectThemeMode } from "../redux/slices/themeSlice";

const { width, height } = Dimensions.get("window");

const pages = [
  {
    id: "1",
    Img: GrowthIllustration,
    title: "Welcome to\nUnPlug ✨",
    desc: "Your sanctuary from the noise. We're here to help you reclaim your time and focus on what truly matters.",
  },
  {
    id: "2",
    Img: Onboarding1,
    title: "Master Your\nFocus",
    desc: "Your attention is your currency. Stop spending it on distractions and invest it in your dreams.",
  },
  {
    id: "3",
    Img: Onboarding2,
    title: "Build Better\nHabits",
    desc: "Replace mindless scrolling with meaningful growth. Learn, create, and move—one day at a time.",
  },
  {
    id: "4",
    Img: Onboarding3,
    title: "Achieve Your\nGoals",
    desc: "Turn ambitions into actions. Set daily targets, crush your tasks, and watch your potential unfold.",
  },
  {
    id: "5",
    Img: Onboarding4,
    title: "Level Up Your\nLife 📈",
    desc: "Gamify your growth. Earn XP, maintain streaks, and celebrate every milestone on your journey.",
  },
];

// --- Expanding Dot Component ---
const Dot = ({ index, scrollX, themeColors }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const dotWidth = scrollX.interpolate({
    inputRange,
    outputRange: [8, 24, 8], // Expands to 24px when active
    extrapolate: "clamp",
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.3, 1, 0.3],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          width: dotWidth,
          backgroundColor: themeColors.brand.primary,
          opacity,
        },
      ]}
    />
  );
};

export const OnBoarding = ({ navigation }) => {
  const themeMode = useSelector(selectThemeMode);
  const themeColors = useTheme(themeMode);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const [pageIndex, setPageIndex] = useState(0);
  const pageIndexRef = useRef(0); // Ref to track current index for onViewableItemsChanged

  // --- ANIMATION VALUES ---
  const imageScale = useRef(new Animated.Value(1)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  // Use useRef for the event handler to ensure stability and correct config
  const scrollHandler = useRef(
    Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
      { useNativeDriver: false } // Disable native driver for width animation
    )
  ).current;

  // --- EFFECTS ---

  // 1. Image Breathing Animation (continuous)
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(imageScale, {
          toValue: 1.05,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(imageScale, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // 2. Button Pulse Animation (continuous)
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleNext = () => {
    if (pageIndex < pages.length - 1) {
      slidesRef.current.scrollToIndex({ index: pageIndex + 1 });
    } else {
      dispatch(completeOnboarding());
    }
  };

  const handleSkip = () => dispatch(completeOnboarding());

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      // Use ref to check against current index to avoid stale closure issues
      if (newIndex !== pageIndexRef.current) {
        setPageIndex(newIndex);
        pageIndexRef.current = newIndex;
        // Haptic Feedback
        Vibration.vibrate(10);
      }
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // --- RENDER ITEM UPDATE ---
  const renderItem = useCallback(({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Animated.View style={[styles.imageContent, { transform: [{ scale: imageScale }] }]}>
          <item.Img width={width * 0.85} height={width * 0.85} />
        </Animated.View>
      </View>
    );
  }, []);

  const Background = () => {
    const translateX = scrollX.interpolate({
      inputRange: [0, width * pages.length],
      outputRange: [0, -width * 1.5],
    });

    const rotate = scrollX.interpolate({
      inputRange: [0, width * pages.length],
      outputRange: ['0deg', '45deg'],
    });

    return (
      <Animated.View style={[StyleSheet.absoluteFillObject, { zIndex: -1, overflow: 'hidden' }]}>
        <Animated.View
          style={[
            styles.blob,
            {
              backgroundColor: themeColors.brand.primary,
              opacity: 0.08,
              top: -width * 0.2,
              right: -width * 0.2,
              width: width * 1.2,
              height: width * 1.2,
              borderRadius: (width * 1.2) / 2,
              transform: [{ translateX }, { rotate }]
            }
          ]}
        />
        <Animated.View
          style={[
            styles.blob,
            {
              backgroundColor: themeColors.brand.secondary,
              opacity: 0.08,
              bottom: height * 0.1,
              left: -width * 0.2,
              width: width,
              height: width,
              borderRadius: width / 2,
              transform: [{ translateX: Animated.multiply(translateX, -0.8) }]
            }
          ]}
        />
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background.main }]}>

      <Background />

      {/* LIST */}
      <Animated.FlatList
        ref={slidesRef}
        data={pages}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
        style={{ flex: 1 }}
      />

      <SafeAreaView style={styles.skipContainer}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipBtn}>
          <Text style={[styles.skipText, { color: themeColors.text.secondary }]}>Skip</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Floating Card Container */}
      <View
        style={[
          styles.floatingCardContainer,
          { paddingBottom: 20 + insets.bottom }
        ]}
        pointerEvents="box-none"
      >
        <View style={[styles.floatingCard, { backgroundColor: themeColors.background.surface }]}>

          {/* Text Mask with Scroll Interpolation */}
          <View style={styles.textMask} pointerEvents="none">
            {pages.map((item, index) => {
              const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

              const translateX = scrollX.interpolate({
                inputRange,
                outputRange: [width * 0.2, 0, -width * 0.2],
              });

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
              });

              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.textWrapper,
                    { opacity, transform: [{ translateX }] }
                  ]}
                >
                  <Text style={[styles.title, { color: themeColors.text.primary }]}>{item.title}</Text>
                  <Text style={[styles.desc, { color: themeColors.text.secondary }]}>{item.desc}</Text>
                </Animated.View>
              );
            })}
          </View>

          {/* Footer */}
          <View style={styles.footer} pointerEvents="auto">
            <View style={styles.paginatorContainer}>
              {pages.map((_, i) => (
                <Dot key={i} index={i} scrollX={scrollX} themeColors={themeColors} />
              ))}
            </View>

            <TouchableOpacity
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Animated.View style={[
                styles.nextBtn,
                {
                  backgroundColor: themeColors.brand.primary,
                  shadowColor: themeColors.brand.primary,
                  transform: [{ scale: buttonScale }]
                }
              ]}>
                <Ionicons
                  name={pageIndex === pages.length - 1 ? "checkmark" : "arrow-forward"}
                  size={32}
                  color={themeColors.text.inverted}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  blob: { position: 'absolute' },
  skipContainer: { position: 'absolute', top: 10, right: 20, zIndex: 10 },
  skipBtn: { padding: 10 },
  skipText: { fontSize: 16, fontWeight: '600' },

  itemContainer: {
    width: width,
    height: height,
    justifyContent: 'flex-start',
    paddingTop: height * 0.1, // Push image down slightly
  },
  imageContent: {
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  floatingCardContainer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  floatingCard: {
    borderRadius: 32,
    padding: 24,
    paddingTop: 32,
    // Shadows
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },

  textMask: {
    height: 160,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 20,
  },
  textWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    textAlign: "left",
    marginBottom: 16,
    lineHeight: 42,
    letterSpacing: -1,
  },
  desc: {
    fontSize: 16,
    textAlign: "left",
    lineHeight: 26,
    fontWeight: "500",
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paginatorContainer: {
    flexDirection: "row",
    height: 40,
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  nextBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    // Glow effect
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
});

export default OnBoarding;