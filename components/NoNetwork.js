import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../src/redux/slices/themeSlice';
import { NetworkErrorIllustration } from '../assets/SVGS/NetworkErrorIllustration';

const NoNetwork = ({ onRetry }) => {
    const colors = useSelector(selectThemeColors);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background.main,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
        },
        illustration: {
            marginBottom: 40,
            opacity: 0.9,
        },
        title: {
            fontSize: 28,
            fontWeight: '700',
            color: colors.text.primary,
            marginBottom: 12,
            textAlign: 'center',
            letterSpacing: -0.5,
        },
        message: {
            fontSize: 16,
            color: colors.text.secondary,
            textAlign: 'center',
            marginBottom: 40,
            lineHeight: 24,
            maxWidth: '80%',
        },
        retryButton: {
            backgroundColor: colors.brand.primary,
            paddingHorizontal: 32,
            paddingVertical: 16,
            borderRadius: 16,
            shadowColor: colors.brand.primary,
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 4,
            width: '100%',
            maxWidth: 200,
            alignItems: 'center',
        },
        retryText: {
            color: colors.text.inverted,
            fontSize: 16,
            fontWeight: '600',
            letterSpacing: 0.5,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.illustration}>
                <NetworkErrorIllustration width={220} height={220} />
            </View>

            <Text style={styles.title}>No Connection</Text>

            <Text style={styles.message}>
                Unable to connect to the internet. Please check your settings and try again.
            </Text>

            {onRetry && (
                <TouchableOpacity
                    style={styles.retryButton}
                    onPress={onRetry}
                    activeOpacity={0.8}
                >
                    <Text style={styles.retryText}>Try Again</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default NoNetwork;
