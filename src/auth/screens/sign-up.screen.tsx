import React, { Component, useState } from 'react';
import { Alert, Image, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
// npm i --save-dev @types/react-native-vector-icons
import * as Animatable from 'react-native-animatable';
import { useTheme, NavigationProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyle from '../../../styles/global.style';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FireBaseAuth from '../../Services/firebase-auth';
import User from '../../Services/collections/user';
import Spinner from 'react-native-loading-spinner-overlay';
import MessageBanner from '../../Services/message-banner';

export function SignUpScreen({ navigation }: any) {

    const { colors }: any = useTheme();

    const styles = StyleSheet.create({
        ScrollViewContainer: {
            backgroundColor: GlobalStyle.BACKGROUND_COLOR_LIGHT
        },
        container: {
            flex: 1,
            backgroundColor: GlobalStyle.HEADER_BACKGROUND_COLOR
        },
        header: {
            flex: 1,
            justifyContent: 'flex-end',
            paddingHorizontal: 20,
            paddingBottom: 20,
            alignItems: 'center',
            marginTop: 40
        },
        footer: {
            flex: 3,
            backgroundColor: GlobalStyle.BACKGROUND_COLOR_LIGHT,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 30
        },
        footer_body_text: {
            color: GlobalStyle.FOOTER_BODY_TEXT_COLOR
        },
        text_header: {
            color: GlobalStyle.HEADER_TEXT_COLOR,
            fontWeight: 'bold',
            fontSize: 30,
            marginTop: 10
        },
        text_footer: {
            color: colors.body_text,
            fontSize: 18,
            marginTop: 15
        },
        action: {
            flexDirection: 'row',
            marginTop: 30,
            borderBottomWidth: 1,
            borderBottomColor: GlobalStyle.TEXT_FIELD_BOTTOM_BORDER,
            paddingBottom: 5
        },
        actionError: {
            flexDirection: 'row',
            marginTop: 10,
            borderBottomWidth: 1,
            borderBottomColor: GlobalStyle.ACTION_ERROR,
            paddingBottom: 5
        },
        textInput: {
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 0 : -12,
            paddingLeft: 10,
            color: GlobalStyle.PRIMARY_COLOR,
        },
        button: {
            marginTop: 25
        },
        signIn: {
            color: colors.button,
            //fontWeight: 'bold',
            marginLeft: 5
        },
        spinnerTextStyle: {
            color: colors.background
        }
    });

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const [loading, setLoading] = useState(false);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');



    const loginPage = () => {
        navigation.navigate('SignIn');
    }

    const signUp = () => {
        if (password === confirmPassword) {
            setLoading(true);
            FireBaseAuth.signUp(email, password).then((loggedUser) => {
                const key = FireBaseAuth.getCurrentUserUid();
                const user = {
                    user_id: key,
                    full_name: fullName,
                    email: email,
                    user_role: 'student',
                    approved: false,
                    first_time_login: true,
                    mobile: mobile
                };
                User.saveUser(key, user).then(() => {
                    if (loggedUser.additionalUserInfo?.isNewUser) {
                        FireBaseAuth.updateFirebaseAuthUserInformation(user);
                        // ask the user to update the info.
                        // Alert.alert("Registration Sucess. Navigate to login screen and login.");
                        MessageBanner.showMessage("Success", "Registration Sucess. Navigate to login screen and login.", "default");
                    }
                }).catch((error) => {
                    MessageBanner.showErrorMessage(error);
                });
            }).catch((error) => {
                console.log(error);
                MessageBanner.showErrorMessage(error);
            }).finally(() => {
                setLoading(false);
            });
        } else {
            // Alert.alert("Please check confirm password.");
            MessageBanner.showMessage("Error", "Please check confirm password.", "warning");
        }
    }



    return (
        <SafeAreaProvider>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <ScrollView style={styles.ScrollViewContainer}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.text_header}> Let's get Started! </Text>
                        <Text style={{ color: GlobalStyle.BACKGROUND_COLOR_LIGHT, marginTop: 10 }}> Create an account to VETTRe Mobile app. </Text>
                    </View>

                    <View style={styles.footer}>
                        {/* <Text style={styles.text_footer}> Full Name</Text> */}
                        <View style={styles.action}>
                            <FontAwesome
                                name="user-o"
                                color={GlobalStyle.PRIMARY_COLOR}
                                size={20}
                            />
                            <TextInput
                                placeholder="Your full name"
                                placeholderTextColor={GlobalStyle.TEXT_PLACE_HOLDER_COLOR}
                                onChangeText={(fullName) => setFullName(fullName)}
                                style={[styles.textInput, {
                                    color: GlobalStyle.FORM_CONTROLS_COLOR
                                }]}
                                autoCapitalize="none"
                            />
                            <Feather
                                name="check-circle"
                                color={GlobalStyle.PRIMARY_COLOR}
                                size={20}
                            />
                        </View>
                        {/* <Text style={styles.text_footer}> Email</Text> */}
                        <View style={styles.action}>
                            <FontAwesome
                                name="envelope"
                                color={GlobalStyle.PRIMARY_COLOR}
                                size={20}
                            />
                            <TextInput
                                placeholder="Your e-mail"
                                placeholderTextColor={GlobalStyle.TEXT_PLACE_HOLDER_COLOR}
                                onChangeText={(userEmail) => setEmail(userEmail)}
                                style={[styles.textInput, {
                                    color: GlobalStyle.FORM_CONTROLS_COLOR
                                }]}
                                autoCapitalize="none"
                            />
                            <Feather
                                name="check-circle"
                                color={GlobalStyle.PRIMARY_COLOR}
                                size={20}
                            />
                        </View>
                        {/* <Text style={styles.text_footer}> Phone</Text> */}
                        <View style={styles.action}>
                            <FontAwesome
                                name="phone"
                                color={GlobalStyle.PRIMARY_COLOR}
                                size={20}
                            />
                            <TextInput
                                placeholder="Your Phone number"
                                placeholderTextColor={GlobalStyle.TEXT_PLACE_HOLDER_COLOR}
                                onChangeText={(userMobile) => setMobile(userMobile)}
                                style={[styles.textInput, {
                                    color: GlobalStyle.FORM_CONTROLS_COLOR
                                }]}
                                autoCapitalize="none"
                            />
                            <Feather
                                name="check-circle"
                                color={GlobalStyle.PRIMARY_COLOR}
                                size={20}
                            />
                        </View>
                        {/* <Text style={styles.text_footer}> Password</Text> */}
                        <View style={styles.action}>
                            <FontAwesome
                                name="lock"
                                color={GlobalStyle.PRIMARY_COLOR}
                                size={20}
                            />
                            <TextInput
                                placeholder="Enter Password"
                                placeholderTextColor={GlobalStyle.TEXT_PLACE_HOLDER_COLOR}
                                onChangeText={(userPassword) => setPassword(userPassword)}
                                style={[styles.textInput, {
                                    color: GlobalStyle.FORM_CONTROLS_COLOR
                                }]}
                                autoCapitalize="none"
                            />
                            <Feather
                                name="check-circle"
                                color={GlobalStyle.PRIMARY_COLOR}
                                size={20}
                            />
                        </View>
                        {/* <Text style={styles.text_footer}> Confirm Password</Text> */}
                        <View style={styles.action}>
                            <FontAwesome
                                name="lock"
                                color={GlobalStyle.PRIMARY_COLOR}
                                size={20}
                            />
                            <TextInput
                                placeholder="Confirm Password"
                                placeholderTextColor={GlobalStyle.TEXT_PLACE_HOLDER_COLOR}
                                onChangeText={(userPassword) => setConfirmPassword(userPassword)}
                                style={[styles.textInput, {
                                    color: GlobalStyle.FORM_CONTROLS_COLOR
                                }]}
                                autoCapitalize="none"
                            />
                            <Feather
                                name="check-circle"
                                color={GlobalStyle.PRIMARY_COLOR}
                                size={20}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button
                                title="Create"
                                onPress={signUp}
                                ViewComponent={LinearGradient} // Don't forget this!
                                linearGradientProps={{
                                    colors: [GlobalStyle.FORM_BUTTON_COLOR, GlobalStyle.FORM_BUTTON_COLOR_SHADE],
                                    start: { x: 0, y: 0.5 },
                                    end: { x: 1, y: 0.5 },
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 25 }}>
                            <Text style={styles.footer_body_text}>Already have an account? </Text>
                            <TouchableOpacity
                                onPress={loginPage}>
                                <Text style={styles.signIn}>Sign in</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    );
}

