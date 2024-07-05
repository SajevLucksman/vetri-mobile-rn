import React, { useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme, NavigationProp } from '@react-navigation/native';
import { Button, Overlay } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
// npm i --save-dev @types/react-native-vector-icons
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyle from '../../../styles/global.style';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FireBaseAuth from '../../Services/firebase-auth';
import User from '../../Services/collections/user';
import Spinner from 'react-native-loading-spinner-overlay';
import MessageBanner from '../../Services/message-banner';

export interface LoginScreenProps {
    navigation: NavigationProp<any,any>
  };

export function LoginScreen({ navigation }: LoginScreenProps) {

    const { colors }: any = useTheme();

    // Styles
    const styles = StyleSheet.create({
        ScrollViewContainer: {
            backgroundColor: colors.background
        },
        container: {
            flex: 1,
            //backgroundColor: colors.header
        },
        header: {
            flex: 1,
            justifyContent: 'flex-end',
            paddingHorizontal: 20,
            paddingBottom: 50,
            alignItems: 'center',
            marginTop: 100
        },
        footer: {
            flex: 3,
            backgroundColor: colors.background,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 30
        },
        footer_body_text: {
            color: colors.body_text
        },
        footer_body_title_text: {
            color: colors.body_text,
            marginBottom: 20
        },
        text_header: {
            color: GlobalStyle.HEADER_TEXT_COLOR,
            fontWeight: 'bold',
            fontSize: 30,
            marginTop: 10
        },
        text_footer: {
            color: colors.text,
            fontSize: 18
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
            color: colors.form_controls,
        },
        errorMsg: {
            marginTop: 20,
            color: GlobalStyle.ACTION_ERROR,
            fontSize: 14,
        },
        button: {
            marginTop: 25
        },
        signUp: {
            color: colors.button,
            //fontWeight: 'bold',
            marginLeft: 5
        },
        signIn: {
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10
        },
        textSign: {
            fontSize: 18,
            fontWeight: 'bold'
        },
        spinnerTextStyle: {
            color: colors.background
        }
    });


    // functions
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });



    const [loginEmail, setLoginEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setshowPassword] = useState(true);
    const [validEmail, setValidEmail] = useState(false);

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

    const signUp = () => {
        navigation.navigate('SignUp');
    }

    const setShowPassword = () => {
        setshowPassword(!showPassword);
    }

    const signIn = () => {
        setLoading(true);
        FireBaseAuth.signIn(loginEmail, password).then((loggedUser) => {
            console.log(loggedUser);
            const currentUserId = FireBaseAuth.getCurrentUserUid();
            return User.getUser(currentUserId).then((user) => {
                const userData: any = user.data();
                // Set session variable userå
                navigation.navigate('Root', {
                   
                    params: { user: userData }
                });
            });
        }).catch((error) => {
            console.log(error);
            MessageBanner.showErrorMessage(error);
        }).finally(async () => {
            await setLoading(false);
        });
    }

    const forgotPassword = () => {
        navigation.navigate('ForgotPassword');
    }

    // HTMl code
    return (
        <SafeAreaProvider>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <LinearGradient
                colors={[colors.header, colors.header_shade]}
                start={{
                    x: 0,
                    y: 0
                }}
                end={{
                    x: 1,
                    y: 1
                }} style={styles.container}>
                <View style={styles.header}>
                    {/* <Image source={{ uri: 'https://triviumpackaging.com/images/circle-v.png' }}
                        style={{ width: 120, height: 120 }} /> */}
                    <Image source={require('../../../assets/img/logo.png')} style={{ width: 120, height: 120 }} />
                    {/* <Text style={styles.text_header}> VETTRe ACADEMY </Text> */}
                </View>

                <View style={styles.footer}>
                    <ScrollView style={styles.ScrollViewContainer}>
                        <Text style={styles.footer_body_title_text}> Log in to your existant account. </Text>
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
                        {/* {validEmail &&
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                            </Animatable.View>
                        } */}

                        <Text style={[styles.text_footer, {
                            color: colors.form_controls,
                            marginTop: 35
                        }]}>Password</Text>
                        <View style={[styles.action]}>
                            <Feather
                                name="lock"
                                color={colors.form_controls}
                                size={20}
                            />
                            <TextInput
                                placeholder="Your Password"
                                placeholderTextColor={GlobalStyle.TEXT_PLACE_HOLDER_COLOR}
                                onChangeText={(userPassword) => setPassword(userPassword)}
                                secureTextEntry={showPassword}
                                style={[styles.textInput, {
                                    color: colors.form_controls
                                }]}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity>
                                <Feather
                                    name={showPassword ? "eye" : "eye-off"}
                                    color={showPassword ? colors.form_controls : colors.button}
                                    size={20}
                                    onPress={setShowPassword}
                                />

                            </TouchableOpacity>
                        </View>
                        {/* {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                    </Animatable.View>
                } */}
                        <TouchableOpacity onPress={forgotPassword}>
                            <Text style={{ color: colors.button, marginTop: 20, }}>Forgot password?</Text>
                        </TouchableOpacity>
                        <View style={styles.button}>
                            <Button
                                disabled={(!validEmail)}
                                title="Sign in"
                                onPress={signIn}
                                ViewComponent={LinearGradient} // Don't forget this!
                                linearGradientProps={{
                                    colors: [colors.button, colors.button_shade],
                                    start: { x: 0, y: 0.5 },
                                    end: { x: 1, y: 0.5 },
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 25 }}>
                            <Text style={styles.footer_body_text}>Don't you have an account? </Text>
                            <TouchableOpacity
                                onPress={signUp}>
                                <Text style={styles.signUp}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </SafeAreaProvider>
    );
}

