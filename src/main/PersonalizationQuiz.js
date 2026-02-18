import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../utlils/theme';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode } from '../redux/slices/themeSlice';
import { completeQuiz } from '../redux/slices/authSlice';
import { Ionicons } from "@expo/vector-icons";
import { PieChart } from "react-native-gifted-charts";
import { checkAndRequestReview } from '../utils/ratingUtils';


const { width, height } = Dimensions.get('window');

const QUESTIONS = [
    {
        id: 'q1',
        question: "What's your primary goal?",
        options: [
            { id: 'productivity', label: 'Boost Productivity', icon: 'rocket-outline' },
            { id: 'health', label: 'Improve Health', icon: 'fitness-outline' },
            { id: 'skills', label: 'Learn New Skills', icon: 'school-outline' },
            { id: 'balance', label: 'Work-Life Balance', icon: 'happy-outline' },
        ]
    },
    {
        id: 'q2',
        question: "How much time can you dedicate daily?",
        options: [
            { id: '15min', label: '15 Minutes', icon: 'time-outline' },
            { id: '30min', label: '30 Minutes', icon: 'timer-outline' },
            { id: '1hr', label: '1 Hour', icon: 'hourglass-outline' },
            { id: '2hr+', label: '2+ Hours', icon: 'watch-outline' },
        ]
    },
    {
        id: 'q3',
        question: "What interests you the most?",
        multiSelect: true,
        options: [
            { id: 'Technology', label: 'Technology', icon: 'hardware-chip-outline' },
            { id: 'Health', label: 'Health & Fitness', icon: 'heart-outline' },
            { id: 'Business', label: 'Business', icon: 'briefcase-outline' },
            { id: 'Art', label: 'Creativity & Arts', icon: 'color-palette-outline' },
            { id: 'Personal Growth', label: 'Personal Growth', icon: 'leaf-outline' },
        ]
    },
    {
        id: 'q4',
        question: "What's your experience level?",
        options: [
            { id: 'Beginner', label: 'Beginner', icon: 'walk-outline' },
            { id: 'Intermediate', label: 'Intermediate', icon: 'bicycle-outline' },
            { id: 'Advanced', label: 'Advanced', icon: 'rocket-outline' },
        ]
    },
    {
        id: 'q5',
        question: "How do you prefer to learn?",
        options: [
            { id: 'Visual', label: 'Visual (Video)', icon: 'videocam-outline' },
            { id: 'Reading', label: 'Reading', icon: 'book-outline' },
            { id: 'Hands-on', label: 'Hands-on (Practice)', icon: 'construct-outline' },
        ]
    },
    {
        id: 'q6',
        question: "What drives you?",
        options: [
            { id: 'Career', label: 'Career Growth', icon: 'briefcase-outline' },
            { id: 'Personal', label: 'Personal Fulfillment', icon: 'heart-outline' },
            { id: 'Fun', label: 'Just for Fun', icon: 'game-controller-outline' },
        ]
    },
    {
        id: 'q7',
        question: "What's your occupation?",
        options: [
            { id: 'Student', label: 'Student', icon: 'school-outline' },
            { id: 'Professional', label: 'Professional', icon: 'briefcase-outline' },
            { id: 'Entrepreneur', label: 'Entrepreneur', icon: 'bulb-outline' },
            { id: 'Hobbyist', label: 'Hobbyist', icon: 'color-palette-outline' },
        ]
    },
    {
        id: 'q8',
        question: "When are you most productive?",
        options: [
            { id: 'Morning', label: 'Morning', icon: 'sunny-outline' },
            { id: 'Afternoon', label: 'Afternoon', icon: 'partly-sunny-outline' },
            { id: 'Evening', label: 'Evening', icon: 'moon-outline' },
            { id: 'Night', label: 'Late Night', icon: 'bed-outline' },
        ]
    },
    {
        id: 'q9',
        question: "What is your commitment level?",
        options: [
            { id: 'Casual', label: 'Casual (Flexible)', icon: 'cafe-outline' },
            { id: 'Regular', label: 'Regular (Steady)', icon: 'calendar-outline' },
            { id: 'Intense', label: 'Intense (Fast-paced)', icon: 'flame-outline' },
        ]
    },
    {
        id: 'q10',
        question: "How often should we remind you?",
        options: [
            { id: 'Daily', label: 'Daily', icon: 'notifications-outline' },
            { id: 'Weekly', label: 'Weekly', icon: 'calendar-outline' },
            { id: 'None', label: 'Don\'t remind me', icon: 'notifications-off-outline' },
        ]
    }
];

const PersonalizationQuiz = ({ navigation }) => {
    const themeMode = useSelector(selectThemeMode);
    const t = useTheme(themeMode);
    const dispatch = useDispatch();
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    const handleAnswer = (questionId, optionId, multiSelect) => {
        if (multiSelect) {
            const current = answers[questionId] || [];
            const updated = current.includes(optionId)
                ? current.filter(id => id !== optionId)
                : [...current, optionId];
            setAnswers({ ...answers, [questionId]: updated });
        } else {
            setAnswers({ ...answers, [questionId]: optionId });
            // Auto advance for single select
            if (currentIndex < QUESTIONS.length) {
                setTimeout(() => {
                    flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
                }, 300);
            }
        }
    };

    const handleNext = () => {
        if (currentIndex < QUESTIONS.length) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
        }
    };

    const handleFinish = async () => {
        const preferences = {
            goal: answers['q1'],
            time: answers['q2'],
            interests: answers['q3'] || [],
            experience: answers['q4'],
            learningStyle: answers['q5'],
            motivation: answers['q6'],
            occupation: answers['q7'],
            productiveTime: answers['q8'],
            commitment: answers['q9'],
            reminderFreq: answers['q10']
        };



        // Navigate to Subscription screen for payment flow
        navigation.navigate("Subscription", {
            preferences: preferences,
            fromQuiz: true
        });
        checkAndRequestReview();
    };

    const renderQuestion = ({ item, index }) => {
        const isLastSlide = index === QUESTIONS.length;

        if (isLastSlide) {
            // Summary Slide
            const interestCount = (answers['q3'] || []).length;
            const pieData = [
                { value: 20, color: t.brand.primary, text: 'Goals' },
                { value: 20, color: t.brand.secondary, text: 'Time' },
                { value: 20, color: t.status.info, text: 'Interests' },
                { value: 20, color: t.status.warning, text: 'Level' },
                { value: 20, color: t.status.success, text: 'Style' },
            ];

            return (
                <View style={[styles.slide, { width }]}>
                    <View style={styles.summaryContainer}>
                        <Text style={[styles.summaryTitle, { color: t.text.primary }]}>Your Profile is Ready!</Text>
                        <Text style={[styles.summarySubtitle, { color: t.text.secondary }]}>
                            We've personalized your experience based on your answers.
                        </Text>

                        <View style={styles.chartContainer}>
                            <PieChart
                                data={pieData}
                                donut
                                radius={80}
                                innerRadius={60}
                                innerCircleColor={t.background.main}
                                centerLabelComponent={() => (
                                    <Ionicons name="person" size={40} color={t.text.primary} />
                                )}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.finishBtn, { backgroundColor: t.brand.primary }]}
                            onPress={handleFinish}
                        >
                            <Text style={styles.finishBtnText}>Get Started</Text>
                            <Ionicons name="arrow-forward" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        return (
            <View style={[styles.slide, { width }]}>
                <Text style={[styles.question, { color: t.text.primary }]}>{item.question}</Text>
                <View style={styles.optionsContainer}>
                    {item.options.map((option) => {
                        const isSelected = item.multiSelect
                            ? (answers[item.id] || []).includes(option.id)
                            : answers[item.id] === option.id;

                        return (
                            <TouchableOpacity
                                key={option.id}
                                style={[
                                    styles.optionCard,
                                    {
                                        backgroundColor: isSelected ? t.brand.primary : t.background.surface,
                                        borderColor: isSelected ? t.brand.primary : t.border.default
                                    }
                                ]}
                                onPress={() => handleAnswer(item.id, option.id, item.multiSelect)}
                            >
                                <Ionicons
                                    name={option.icon}
                                    size={24}
                                    color={isSelected ? "white" : t.text.primary}
                                />
                                <Text style={[
                                    styles.optionLabel,
                                    { color: isSelected ? "white" : t.text.primary }
                                ]}>
                                    {option.label}
                                </Text>
                                {isSelected && (
                                    <Ionicons name="checkmark-circle" size={20} color="white" style={styles.checkIcon} />
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
                {item.multiSelect && (
                    <TouchableOpacity
                        style={[styles.nextBtn, { backgroundColor: t.background.surfaceHighlight }]}
                        onPress={handleNext}
                    >
                        <Text style={[styles.nextBtnText, { color: t.text.primary }]}>Continue</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const handleBack = () => {
        if (currentIndex > 0) {
            flatListRef.current?.scrollToIndex({ index: currentIndex - 1, animated: true });
        }
    };

    return (
        <SafeAreaView edges={['top', 'bottom']} style={[styles.container, { backgroundColor: t.background.main }]}>
            <View style={styles.header}>
                <View style={styles.navRow}>
                    {currentIndex > 0 ? (
                        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
                            <Ionicons name="arrow-back" size={24} color={t.text.primary} />
                        </TouchableOpacity>
                    ) : (
                        <View style={{ width: 24 }} />
                    )}

                    <View style={[styles.progressBarContainer, { backgroundColor: t.border.default }]}>
                        <Animated.View
                            style={[
                                styles.progressFill,
                                {
                                    backgroundColor: t.brand.primary,
                                    width: `${((currentIndex + 1) / (QUESTIONS.length + 1)) * 100}%`
                                }
                            ]}
                        />
                    </View>
                    <View style={{ width: 24 }} />
                </View>
            </View>

            <FlatList
                ref={flatListRef}
                data={[...QUESTIONS, { id: 'summary' }]}
                renderItem={renderQuestion}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false} // Force navigation via selection
                keyExtractor={item => item.id}
                onViewableItemsChanged={onViewableItemsChanged}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { padding: 20, paddingTop: 10 },
    navRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
    backBtn: { padding: 5 },
    progressBarContainer: { height: 8, borderRadius: 4, flex: 1, marginHorizontal: 15, overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: 4 },
    slide: { flex: 1, padding: 20, alignItems: 'center' },
    question: { fontSize: 24, fontWeight: '800', textAlign: 'center', marginBottom: 40, marginTop: 20 },
    optionsContainer: { width: '100%', gap: 15 },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 10,
    },
    optionLabel: { fontSize: 16, fontWeight: '600', marginLeft: 15, flex: 1 },
    checkIcon: { marginLeft: 10 },
    nextBtn: {
        marginTop: 30,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
    },
    nextBtnText: { fontSize: 16, fontWeight: '600' },
    summaryContainer: { alignItems: 'center', justifyContent: 'center', flex: 1 },
    summaryTitle: { fontSize: 28, fontWeight: '800', marginBottom: 10 },
    summarySubtitle: { fontSize: 16, textAlign: 'center', marginBottom: 40, paddingHorizontal: 20 },
    chartContainer: { marginBottom: 50 },
    finishBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
    },
    finishBtnText: { color: 'white', fontSize: 18, fontWeight: '700', marginRight: 10 },
});

export default PersonalizationQuiz;
