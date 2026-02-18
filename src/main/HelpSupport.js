import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../utlils/theme';
import { useSelector } from 'react-redux';
import { selectThemeMode } from '../redux/slices/themeSlice';
import { Ionicons } from "@expo/vector-icons";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import CustomBtn from "../../components/CustomBtn";
import CustomTextInput from "../../components/CustomTextInput";

const HelpSupport = ({ navigation }) => {
    const themeMode = useSelector(selectThemeMode);
    const t = useTheme(themeMode);
    const [expandedId, setExpandedId] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSendFeedback = async () => {
        if (!feedback.trim()) return;
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "feedback"), {
                content: feedback,
                createdAt: new Date().toISOString(),
                type: "in-app",
                status: "new"
            });
            alert("Thank you for your feedback!");
            setFeedback("");
        } catch (error) {
            console.log("Error sending feedback:", error);
            alert("Failed to send feedback. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const FAQS = [
        {
            id: '1',
            question: "How do I create a new plan?",
            answer: "Go to the Home screen and tap the '+' button in the bottom navigation bar. You can choose a template or create a custom plan."
        },
        {
            id: '2',
            question: "Can I edit a plan after creating it?",
            answer: "Currently, you can edit tasks within a plan, but the plan title and duration are fixed. We are working on full edit functionality!"
        },
        {
            id: '3',
            question: "How does the streak system work?",
            answer: "Your streak increases every day you complete at least one task. If you miss a day, your streak will reset to zero."
        },
        {
            id: '4',
            question: "What is included in the Pro subscription?",
            answer: "Pro includes unlimited plans, advanced analytics, custom plan creation, and exclusive premium templates."
        },
        {
            id: '5',
            question: "How do I delete my account?",
            answer: "You can delete your account directly from the Profile screen under the 'Danger Zone' section."
        }
    ];

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleContactSupport = () => {
        Linking.openURL('mailto:support@unplugapp.com?subject=UnPlug Support Request');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: t.background.main }]} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={t.text.primary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: t.text.primary }]}>Help & Support</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={[styles.contactCard, { backgroundColor: t.brand.primary, borderWidth: 0.5, borderColor: t.border.subtle }]}>
                    <Ionicons name="headset" size={40} color="white" />
                    <Text style={styles.contactTitle}>Need Personal Assistance?</Text>
                    <Text style={styles.contactSub}>Our team is here to help you 24/7.</Text>
                    <TouchableOpacity style={styles.contactBtn} onPress={handleContactSupport}>
                        <Text style={[styles.contactBtnText, { color: t.brand.primary }]}>Contact Support</Text>
                    </TouchableOpacity>
                </View>

                <Text style={[styles.sectionHeader, { color: t.text.primary }]}>Frequently Asked Questions</Text>

                {FAQS.map((faq) => (
                    <TouchableOpacity
                        key={faq.id}
                        style={[styles.faqItem, { backgroundColor: t.background.surface, borderWidth: 0.5, borderColor: t.border.subtle }]}
                        onPress={() => toggleExpand(faq.id)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.faqHeader}>
                            <Text style={[styles.question, { color: t.text.primary }]}>{faq.question}</Text>
                            <Ionicons
                                name={expandedId === faq.id ? "chevron-up" : "chevron-down"}
                                size={20}
                                color={t.text.secondary}
                            />
                        </View>
                        {expandedId === faq.id && (
                            <Text style={[styles.answer, { color: t.text.secondary }]}>{faq.answer}</Text>
                        )}
                    </TouchableOpacity>
                ))}

                <Text style={[styles.sectionHeader, { color: t.text.primary, marginTop: 30 }]}>Send us Feedback</Text>
                <View style={[styles.feedbackCard, { backgroundColor: t.background.surface, borderColor: t.border.subtle, borderWidth: 0.5 }]}>
                    <CustomTextInput
                        placeholder="Have multiple login options? Improve onboarding? Let us know!"
                        value={feedback}
                        onChange={setFeedback}
                        multiline
                        numberOfLines={4}
                        style={{ height: 100, textAlignVertical: 'top', width: '100%' }}
                    />
                    <View style={{ marginTop: 15 }}>
                        <CustomBtn
                            style={{ flex: 1, width: '100%' }}
                            title={isSubmitting ? "Sending..." : "Submit Feedback"}
                            onPress={handleSendFeedback}
                            disabled={isSubmitting}
                        />
                    </View>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        paddingBottom: 10
    },
    headerTitle: { fontSize: 20, fontWeight: '700' },
    backBtn: { padding: 5 },
    scrollContent: { padding: 20 },
    contactCard: {
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 30,

    },
    contactTitle: { color: 'white', fontSize: 18, fontWeight: '700', marginTop: 10, marginBottom: 5 },
    contactSub: { color: 'rgba(255,255,255,0.9)', fontSize: 14, marginBottom: 20, textAlign: 'center' },
    contactBtn: { backgroundColor: 'white', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 25 },
    contactBtnText: { fontWeight: '700', fontSize: 14 },
    sectionHeader: { fontSize: 18, fontWeight: '700', marginBottom: 15 },
    faqItem: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
    },
    faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    question: { fontSize: 15, fontWeight: '600', flex: 1, marginRight: 10 },
    answer: { marginTop: 10, fontSize: 14, lineHeight: 20 },
    feedbackCard: {
        padding: 20,
        borderRadius: 16,
    }
});

export default HelpSupport;
