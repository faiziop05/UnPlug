import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../utlils/theme';
import { useSelector } from 'react-redux';
import { selectThemeMode } from '../redux/slices/themeSlice';
import { Ionicons } from "@expo/vector-icons";

const TermsPrivacy = ({ navigation }) => {
    const themeMode = useSelector(selectThemeMode);
    const t = useTheme(themeMode);

    const Section = ({ title, content }) => (
        <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: t.text.primary }]}>{title}</Text>
            <Text style={[styles.sectionContent, { color: t.text.secondary }]}>{content}</Text>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: t.background.main }]} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={t.text.primary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: t.text.primary }]}>Terms & Privacy</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={[styles.lastUpdated, { color: t.text.secondary }]}>Last Updated: December 2, 2025</Text>

                <Text style={[styles.mainHeading, { color: t.brand.primary }]}>Privacy Policy</Text>
                <Section
                    title="1. Data Collection"
                    content="UnPlug collects minimal data necessary to provide our services. This includes your name, email address, and usage data related to your plans and tasks. We store your preferences and progress locally on your device and sync it securely to our servers."
                />
                <Section
                    title="2. Data Usage"
                    content="Your data is used exclusively to personalize your experience, track your progress, and improve app features. We do not sell your personal data to third parties."
                />
                <Section
                    title="3. Data Security"
                    content="We implement industry-standard security measures to protect your data. Your account is protected by Firebase Authentication."
                />

                <View style={styles.divider} />

                <Text style={[styles.mainHeading, { color: t.brand.primary }]}>Terms of Service</Text>
                <Section
                    title="1. Acceptance of Terms"
                    content="By accessing or using UnPlug, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service."
                />
                <Section
                    title="2. User Accounts"
                    content="You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password."
                />
                <Section
                    title="3. Pro Subscription"
                    content="Pro features are available via a monthly or yearly subscription. You can cancel at any time through your device's subscription management settings."
                />
                <Section
                    title="4. Termination"
                    content="We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms."
                />

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
    lastUpdated: { fontSize: 12, marginBottom: 20, fontStyle: 'italic' },
    mainHeading: { fontSize: 24, fontWeight: '800', marginBottom: 20, marginTop: 10 },
    section: { marginBottom: 24 },
    sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
    sectionContent: { fontSize: 14, lineHeight: 22 },
    divider: { height: 1, backgroundColor: '#ccc', opacity: 0.2, marginVertical: 30 }
});

export default TermsPrivacy;
