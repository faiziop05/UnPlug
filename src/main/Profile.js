import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Switch,
    Linking,
    Platform,
    TextInput,
    ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../utlils/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser, updateUserProfile, changeUserPassword, deleteUserAccount } from "../redux/slices/authSlice";
import { selectThemeId } from "../redux/slices/themeSlice";
import { THEMES } from "../../utlils/theme";
import CustomAlert from "../../components/CustomAlert";
import CustomSheet from "../../components/CustomSheet";


const Profile = ({ navigation }) => {
    const dispatch = useDispatch();
    const { isPro, user } = useSelector((state) => state.auth);
    const themeId = useSelector(selectThemeId);
    const t = useTheme(themeId);
    const currentTheme = THEMES[themeId];



    // Edit Profile State
    const [editProfileVisible, setEditProfileVisible] = useState(false);
    const [newName, setNewName] = useState("");
    const [updatingProfile, setUpdatingProfile] = useState(false);

    // Change Password State
    const [changePasswordVisible, setChangePasswordVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [updatingPassword, setUpdatingPassword] = useState(false);

    // Delete Account State
    const [deleteAccountVisible, setDeleteAccountVisible] = useState(false);
    const [deletePassword, setDeletePassword] = useState("");
    const [deletingAccount, setDeletingAccount] = useState(false);

    // Alert State
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        title: "",
        message: "",
        buttons: [],
    });

    useEffect(() => {
        if (user?.displayName || user?.fullName) {
            setNewName(user.displayName || user.fullName);
        }
    }, [user]);



    const showAlert = (title, message, buttons = []) => {
        setAlertConfig({ title, message, buttons });
        setAlertVisible(true);
    };

    const handleLogout = () => {
        showAlert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                    onPress: () => setAlertVisible(false),
                },
                {
                    text: "Sign Out",
                    onPress: () => {
                        setAlertVisible(false);
                        dispatch(signOutUser());
                    },
                },
            ]
        );
    };

    const handleManageSubscription = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('https://apps.apple.com/account/subscriptions');
        } else {
            Linking.openURL('https://play.google.com/store/account/subscriptions');
        }
    };

    const handleUpdateProfile = async () => {
        if (!newName.trim()) {
            showAlert("Error", "Name cannot be empty", [{ text: "OK", onPress: () => setAlertVisible(false) }]);
            return;
        }
        setUpdatingProfile(true);
        const result = await dispatch(updateUserProfile({ displayName: newName }));
        setUpdatingProfile(false);
        setEditProfileVisible(false);

        if (updateUserProfile.fulfilled.match(result)) {
            showAlert("Success", "Profile updated successfully!", [{ text: "OK", onPress: () => setAlertVisible(false) }]);
        } else {
            showAlert("Error", "Failed to update profile. Please try again.", [{ text: "OK", onPress: () => setAlertVisible(false) }]);
        }
    };

    const handleChangePassword = async () => {
        if (newPassword.length < 6) {
            showAlert("Error", "Password must be at least 6 characters", [{ text: "OK", onPress: () => setAlertVisible(false) }]);
            return;
        }
        if (!currentPassword) {
            showAlert("Error", "Please enter your current password", [{ text: "OK", onPress: () => setAlertVisible(false) }]);
            return;
        }

        setUpdatingPassword(true);
        const result = await dispatch(changeUserPassword({ currentPassword, newPassword }));
        setUpdatingPassword(false);
        setChangePasswordVisible(false);
        setNewPassword("");
        setCurrentPassword("");

        if (changeUserPassword.fulfilled.match(result)) {
            showAlert("Success", "Password changed successfully!", [{ text: "OK", onPress: () => setAlertVisible(false) }]);
        } else {
            showAlert("Error", "Failed to change password. " + result.payload, [{ text: "OK", onPress: () => setAlertVisible(false) }]);
        }
    };

    const handleDeleteAccount = async () => {
        if (!deletePassword) {
            showAlert("Error", "Please enter your password to confirm deletion", [{ text: "OK", onPress: () => setAlertVisible(false) }]);
            return;
        }

        setDeletingAccount(true);
        const result = await dispatch(deleteUserAccount(deletePassword));
        setDeletingAccount(false);
        setDeleteAccountVisible(false);
        setDeletePassword("");

        if (deleteUserAccount.fulfilled.match(result)) {
            // User will be signed out automatically by the thunk
        } else {
            showAlert("Error", "Failed to delete account. " + result.payload, [{ text: "OK", onPress: () => setAlertVisible(false) }]);
        }
    };

    const SettingItem = ({ icon, title, value, type = "arrow", onPress, subtitle, rightElement, color }) => (
        <TouchableOpacity
            style={[styles.itemContainer, { backgroundColor: t.background.surface, borderWidth: 0.5, borderColor: t.border.subtle }]}
            onPress={onPress}
            disabled={type === "switch" || type === "info"}
        >
            <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: (color || t.brand.primary) + "20" }]}>
                    <Ionicons name={icon} size={22} color={color || t.brand.primary} />
                </View>
                <View>
                    <Text style={[styles.itemTitle, { color: color || t.text.primary }]}>{title}</Text>
                    {subtitle && <Text style={[styles.itemSubtitle, { color: t.text.secondary }]}>{subtitle}</Text>}
                </View>
            </View>

            <View style={styles.itemRight}>
                {type === "switch" && (
                    <Switch
                        trackColor={{ false: t.border.subtle, true: t.brand.primary }}
                        thumbColor={t.background.surface}
                        ios_backgroundColor={t.border.subtle}
                        onValueChange={onPress}
                        value={value}
                    />
                )}
                {type === "arrow" && (
                    <Ionicons name="chevron-forward" size={20} color={t.text.secondary} />
                )}
                {rightElement}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: t.background.main }]} edges={['top', 'left', 'right']}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={[styles.headerTitle, { color: t.text.primary }]}>Profile</Text>

                {/* User Info Section */}
                <View style={[styles.profileCard, { backgroundColor: t.background.surface, borderWidth: 0.5, borderColor: t.border.subtle }]}>
                    <View style={[styles.avatar, { backgroundColor: t.brand.primary }]}>
                        <Text style={styles.avatarText}>{user?.email ? user.email[0].toUpperCase() : "U"}</Text>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={[styles.userName, { color: t.text.primary }]}>{user?.displayName || user?.fullName || "User"}</Text>
                        <Text style={[styles.userEmail, { color: t.text.secondary }]}>{user?.email}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setEditProfileVisible(true)} style={styles.editBtn}>
                        <Ionicons name="pencil" size={20} color={t.brand.primary} />
                    </TouchableOpacity>
                </View>

                {/* Subscription Section */}
                <View style={styles.section}>
                    <Text style={[styles.sectionHeader, { color: t.text.secondary }]}>Subscription Plan</Text>
                    <View style={[styles.subscriptionCard, { backgroundColor: isPro ? t.brand.primary + "10" : t.background.surface, borderColor: isPro ? t.brand.primary : t.border.subtle, borderWidth: 1 }]}>
                        <View style={styles.subHeader}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name={isPro ? "diamond" : "leaf-outline"} size={24} color={isPro ? t.brand.primary : t.text.secondary} />
                                <Text style={[styles.subTitle, { color: isPro ? t.brand.primary : t.text.primary }]}>
                                    {isPro ? "Premium Member" : "Free Plan"}
                                </Text>
                            </View>
                            {isPro && <View style={[styles.badge, { backgroundColor: t.brand.primary }]}><Text style={styles.badgeText}>PRO</Text></View>}
                        </View>

                        <Text style={[styles.subDesc, { color: t.text.secondary }]}>
                            {isPro
                                ? "You have access to all premium features."
                                : "Upgrade to unlock unlimited plans, analytics, and more."}
                        </Text>

                        {isPro && user?.subscription?.renewalDate && (
                            <Text style={[styles.subDesc, { color: t.text.secondary, fontSize: 12, marginTop: -10 }]}>
                                Expires on: {new Date(user.subscription.renewalDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </Text>
                        )}

                        <TouchableOpacity
                            style={[styles.subBtn, { backgroundColor: isPro ? t.background.surface : t.brand.primary, borderColor: t.brand.primary, borderWidth: isPro ? 1 : 0 }]}
                            onPress={() => isPro ? handleManageSubscription() : navigation.navigate("Subscription")}
                        >
                            <Text style={[styles.subBtnText, { color: isPro ? t.brand.primary : t.text.inverted }]}>
                                {isPro ? "Manage Subscription" : "Upgrade to Pro"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionHeader, { color: t.text.secondary }]}>Account Security</Text>
                    <SettingItem
                        icon="lock-closed-outline"
                        title="Change Password"
                        onPress={() => setChangePasswordVisible(true)}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionHeader, { color: t.text.secondary }]}>Preferences</Text>
                    <SettingItem
                        icon="color-palette-outline"
                        title="Theme"
                        subtitle={currentTheme?.name || 'Teal Breeze'}
                        type="arrow"
                        onPress={() => navigation.navigate("ThemeSelector")}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionHeader, { color: t.text.secondary }]}>Support</Text>
                    <SettingItem
                        icon="help-circle-outline"
                        title="Help & Support"
                        onPress={() => navigation.navigate("HelpSupport")}
                    />
                    <SettingItem
                        icon="document-text-outline"
                        title="Terms & Privacy"
                        onPress={() => navigation.navigate("TermsPrivacy")}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionHeader, { color: t.text.secondary }]}>Danger Zone</Text>
                    <SettingItem
                        icon="trash-outline"
                        title="Delete Account"
                        color={t.status.error}
                        onPress={() => setDeleteAccountVisible(true)}
                    />
                </View>

                <TouchableOpacity
                    style={[styles.logoutBtn, { borderColor: t.status.error }]}
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out-outline" size={20} color={t.status.error} />
                    <Text style={[styles.logoutText, { color: t.status.error }]}>Sign Out</Text>
                </TouchableOpacity>

                <Text style={[styles.versionText, { color: t.text.secondary }]}>Version 1.0.0</Text>
            </ScrollView>

            {/* Edit Profile Sheet */}
            <CustomSheet
                visible={editProfileVisible}
                onClose={() => setEditProfileVisible(false)}
                title="Edit Profile"
                height={300}
            >
                <View style={styles.sheetContent}>
                    <Text style={[styles.inputLabel, { color: t.text.secondary }]}>Display Name</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: t.background.surfaceHighlight, color: t.text.primary, borderColor: t.border.subtle }]}
                        value={newName}
                        onChangeText={setNewName}
                        placeholder="Enter your name"
                        placeholderTextColor={t.text.secondary}
                    />
                    <TouchableOpacity
                        style={[styles.saveBtn, { backgroundColor: t.brand.primary }]}
                        onPress={handleUpdateProfile}
                        disabled={updatingProfile}
                    >
                        {updatingProfile ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.saveBtnText}>Save Changes</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </CustomSheet>

            {/* Change Password Sheet */}
            <CustomSheet
                visible={changePasswordVisible}
                onClose={() => setChangePasswordVisible(false)}
                title="Change Password"
                height={380}
            >
                <View style={styles.sheetContent}>
                    <Text style={[styles.inputLabel, { color: t.text.secondary }]}>Current Password</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: t.background.surfaceHighlight, color: t.text.primary, borderColor: t.border.subtle }]}
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        placeholder="Enter current password"
                        placeholderTextColor={t.text.secondary}
                        secureTextEntry
                    />

                    <Text style={[styles.inputLabel, { color: t.text.secondary }]}>New Password</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: t.background.surfaceHighlight, color: t.text.primary, borderColor: t.border.subtle }]}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder="Enter new password"
                        placeholderTextColor={t.text.secondary}
                        secureTextEntry
                    />
                    <TouchableOpacity
                        style={[styles.saveBtn, { backgroundColor: t.brand.primary }]}
                        onPress={handleChangePassword}
                        disabled={updatingPassword}
                    >
                        {updatingPassword ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.saveBtnText}>Update Password</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </CustomSheet>

            {/* Delete Account Sheet */}
            <CustomSheet
                visible={deleteAccountVisible}
                onClose={() => setDeleteAccountVisible(false)}
                title="Delete Account"
                height={350}
            >
                <View style={styles.sheetContent}>
                    <Text style={{ color: t.status.error, marginBottom: 20, textAlign: 'center' }}>
                        Warning: This action is irreversible. All your data including plans, notes, and progress will be permanently deleted.
                    </Text>
                    <Text style={[styles.inputLabel, { color: t.text.secondary }]}>Confirm Password</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: t.background.surfaceHighlight, color: t.text.primary, borderColor: t.border.subtle }]}
                        value={deletePassword}
                        onChangeText={setDeletePassword}
                        placeholder="Enter your password"
                        placeholderTextColor={t.text.secondary}
                        secureTextEntry
                    />
                    <TouchableOpacity
                        style={[styles.saveBtn, { backgroundColor: t.status.error }]}
                        onPress={handleDeleteAccount}
                        disabled={deletingAccount}
                    >
                        {deletingAccount ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.saveBtnText}>Delete Permanently</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </CustomSheet>

            <CustomAlert
                visible={alertVisible}
                title={alertConfig.title}
                message={alertConfig.message}
                buttons={alertConfig.buttons}
                onClose={() => setAlertVisible(false)}
            />
        </SafeAreaView >
    );
};

export default Profile;

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    scrollContainer: { padding: 20, paddingBottom: 40 },
    headerTitle: {
        fontSize: 32,
        fontWeight: "800",
        marginBottom: 20,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
        marginBottom: 30,

    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    avatarText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
    },
    section: {
        marginBottom: 25,
    },
    sectionHeader: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 10,
        marginLeft: 5,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderRadius: 16,
        marginBottom: 10,

    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "600",
    },
    itemSubtitle: {
        fontSize: 12,
        marginTop: 2,
    },
    logoutBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 20,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: "700",
        marginLeft: 8,
    },
    versionText: {
        textAlign: "center",
        fontSize: 12,
    },
    subscriptionCard: {
        padding: 20,
        borderRadius: 20,
    },
    subHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 10,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    subDesc: {
        fontSize: 14,
        marginBottom: 15,
        lineHeight: 20,
    },
    subBtn: {
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    subBtnText: {
        fontWeight: '600',
        fontSize: 14,
    },
    editBtn: {
        padding: 8,
    },
    sheetContent: {
        padding: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        fontSize: 16,
        marginBottom: 20,
    },
    saveBtn: {
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
});
