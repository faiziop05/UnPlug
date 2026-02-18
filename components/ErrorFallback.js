import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../src/redux/slices/themeSlice';
import { NotFoundIllustration } from '../assets/SVGS/NotFoundIllustration';
import * as Updates from 'expo-updates';

const ErrorFallback = ({ error, resetError }) => {
    const colors = useSelector(selectThemeColors);

    const handleRestart = async () => {
        try {
            await Updates.reloadAsync();
        } catch (e) {
            // If reload fails (e.g. in dev client), try the reset callback if provided
            if (resetError) resetError();
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
        },
        contentContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
        },
        illustration: {
            marginBottom: 32,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.text,
            marginBottom: 12,
            textAlign: 'center',
        },
        message: {
            fontSize: 16,
            color: colors.textSecondary,
            textAlign: 'center',
            marginBottom: 32,
            lineHeight: 24,
            maxWidth: '80%',
        },
        button: {
            backgroundColor: colors.primary,
            paddingHorizontal: 32,
            paddingVertical: 14,
            borderRadius: 12,
            borderWidth: 0.5,
            borderColor: colors.border,
        },
        buttonText: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '600',
        },
        errorDetails: {
            marginTop: 20,
            padding: 10,
            backgroundColor: colors.surface,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.border,
            width: '100%',
            maxHeight: 100,
        },
        errorText: {
            color: colors.error,
            fontSize: 12,
            fontFamily: 'monospace',
        }
    });

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.illustration}>
                    <NotFoundIllustration width={200} height={200} />
                </View>

                <Text style={styles.title}>Oops! Something went wrong</Text>

                <Text style={styles.message}>
                    We encountered an unexpected error. We're sorry for the inconvenience.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleRestart}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Restart App</Text>
                </TouchableOpacity>

                {/* Optional: Show error details in dev mode or if needed */}
                {__DEV__ && error && (
                    <ScrollView style={styles.errorDetails}>
                        <Text style={styles.errorText}>{error.toString()}</Text>
                    </ScrollView>
                )}
            </ScrollView>
        </View>
    );
};

export default ErrorFallback;
