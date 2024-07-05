import React, { Component, useState } from 'react';
import { Alert, Image, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
// npm i --save-dev @types/react-native-vector-icons
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyle from '../../../styles/global.style';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import FireBaseAuth from '../../Services/firebase-auth';
import MessageBanner from '../../Services/message-banner';
import Spinner from 'react-native-loading-spinner-overlay';

export function ForgotPasswordScreen({ navigation }: any) {
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

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
            color: GlobalStyle.PRIMARY_COLOR,
            fontSize: 18,
            marginTop: 15
        },
        action: {
            flexDirection: 'row',
            marginTop: 10,
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
        footer_body_title_text: {
            color: colors.body_text,
            marginBottom: 20
        },
        spinnerTextStyle: {
            color: colors.background
        }
    });

    const loginPage = () => {
        navigation.navigate('Login');
    }

    const [loginEmail, setLoginEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [loading, setLoading] = useState(false);


    const validateEmail = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const validateEmailAndSet = (email: string) => {
        setLoginEmail(email);
        if (validateEmail(email)) {
            // Valid email
            setValidEmail(true);
        } else {
            setValidEmail(false);
        }
    }

    const resetPassword = () => {
        setLoading(true);
        FireBaseAuth.resetPassword(loginEmail).then((loggedUser) => {
            MessageBanner.showMessage("Success", "Password reset request initiated successfully. Please check your mail and follow the instructions.", "info");
        }).catch((error) => {
            console.log(error);
            MessageBanner.showErrorMessage(error);
        }).finally(() => {
            setLoading(false);
        });

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
                        <Text style={styles.text_header}> Forgot Password ? </Text>
                        <Text style={{ color: GlobalStyle.BACKGROUND_COLOR_LIGHT, marginTop: 10 }}> Reset your password here. </Text>
                    </View>
                    <View style={styles.footer}>
                        <ScrollView style={styles.ScrollViewContainer}>
                            <Text style={styles.footer_body_title_text}> Provide the registerd e-mail address of the account. </Text>
                            <Text style={styles.text_footer}> Email</Text>
                            <View style={styles.action}>
                                <FontAwesome
                                    name="envelope"
                                    color={colors.form_controls}
                                    size={20}
                                />
                                <TextInput
                                    placeholder="Your e-mail"
                                    placeholderTextColor={GlobalStyle.TEXT_PLACE_HOLDER_COLOR}
                                    onChangeText={(userEmail) => validateEmailAndSet(userEmail)}
                                    style={[styles.textInput, {
                                        color: colors.form_controls
                                    }]}
                                    autoCapitalize="none"
                                />
                                <Feather
                                    name="check-circle"
                                    color={validEmail ? colors.button : colors.form_controls}
                                    size={20}
                                />
                            </View>
                            <View style={styles.button}>
                                <Button
                                    disabled={(!validEmail)}
                                    title="Reset Password"
                                    onPress={resetPassword}
                                    ViewComponent={LinearGradient} // Don't forget this!
                                    linearGradientProps={{
                                        colors: [colors.button, colors.button_shade],
                                        start: { x: 0, y: 0.5 },
                                        end: { x: 1, y: 0.5 },
                                    }}
                                />
                            </View>
                        </ScrollView>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    );
}

