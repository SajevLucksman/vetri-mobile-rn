import * as React from 'react';
import { Button, View, Text, Alert, useColorScheme, Linking } from 'react-native';
import { DarkTheme, DefaultTheme, Link, NavigationContainer, Theme, useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { LoginScreen } from './src/auth/screens/login.screen';
import { SignUpScreen } from './src/auth/screens/sign-up.screen';
import { HomeScreen } from './src/home/screens/home.screen';
import { ForgotPasswordScreen } from './src/auth/screens/forgot-password.screen';
import Feather from 'react-native-vector-icons/Feather';
import { Drawer as DrawerCustom } from 'react-native-paper';
import FireBaseAuth from './src/Services/firebase-auth';
import { LecturerListScreen } from './src/lecturer/lecturer.list.screen';
import { TimeTableScreen } from './src/time-table/time-table.list.screen';
import globalStyle from './styles/global.style';
import FlashMessage from "react-native-flash-message";
import { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import MessageBanner from './src/Services/message-banner';



const dark = {
  dark: true,
  colors: {
    primary: 'rgb(255, 255, 255)',
    secondary: 'rgb(44, 102, 254)',
    background: '#2f3239',
    header: globalStyle.HEADER_BACKGROUND_COLOR,
    header_shade: globalStyle.HEADER_BACKGROUND_COLOR_SHADE,
    card: globalStyle.PRIMARY_COLOR,
    card_container: '#373a41',
    text_Header2: globalStyle.BACKGROUND_COLOR_LIGHT,
    text: globalStyle.BACKGROUND_COLOR_LIGHT,
    body_text: globalStyle.BACKGROUND_COLOR_LIGHT,
    border: globalStyle.TEXT_FIELD_BOTTOM_BORDER,
    button: globalStyle.FORM_BUTTON_COLOR,
    button_shade: globalStyle.FORM_BUTTON_COLOR_SHADE,
    form_controls: globalStyle.BACKGROUND_COLOR_LIGHT,
    place_holder: globalStyle.BACKGROUND_COLOR_LIGHT,
    notification: 'rgb(255, 69, 58)'
  }
}

const standard = {
  dark: false,
  colors: {
    primary: globalStyle.PRIMARY_COLOR,
    secondary: 'rgb(44, 102, 254)',
    background: '#ffffff',
    header: globalStyle.HEADER_BACKGROUND_COLOR,
    header_shade: globalStyle.HEADER_BACKGROUND_COLOR_SHADE,
    card: 'rgb(255, 255, 255)',
    card_container: '#e2f2fb',
    text_Header2: '#0b0908',
    text: globalStyle.PRIMARY_COLOR,
    body_text: globalStyle.FOOTER_BODY_TEXT_COLOR,
    border: globalStyle.TEXT_FIELD_BOTTOM_BORDER,
    button: globalStyle.FORM_BUTTON_COLOR,
    button_shade: globalStyle.FORM_BUTTON_COLOR_SHADE,
    form_controls: globalStyle.FORM_CONTROLS_COLOR,
    place_holder: globalStyle.TEXT_PLACE_HOLDER_COLOR,
    notification: 'rgb(255, 69, 58)'
  }
}


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const loggedUserName: any = FireBaseAuth.getCurrentUserName();
function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      {FireBaseAuth.checkValidLoginSession() ?
        <>
          <DrawerCustom.Section>
            <DrawerCustom.Item label={loggedUserName} onPress={async () => { await Linking.openURL('http://vettre.edu.lk/'); }} icon="account" />
          </DrawerCustom.Section>
          <DrawerItemList {...props} />
          <DrawerCustom.Section>
            <DrawerCustom.Item label="Help" onPress={async () => { await Linking.openURL('http://vettre.edu.lk/'); }} icon="help" />
          </DrawerCustom.Section>
          <DrawerCustom.Section>
            <DrawerCustom.Item label="Logout" onPress={() => {
              FireBaseAuth.signOut().finally(() => {
                props.navigation.navigate('SignIn');
              });
            }} icon="logout" />
          </DrawerCustom.Section>
        </> :
        <>
        </>
      }

    </DrawerContentScrollView>
  );
}

function Root(props: any) {
  const { colors }: any = useTheme();
  function onAuthStateChanged(user: any) {
    FireBaseAuth.checkValidLoginSession()?.reload();
    if (!FireBaseAuth.checkValidLoginSession()) {
      // Navigate to login when user session not available
      //MessageBanner.showMessage("Session expired.", "Authentication session expired. Please re-login to continue.", "warning");
      props.navigation.navigate('SignIn');
    }
  }


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  return (
    <Drawer.Navigator
      initialRouteName="Root" drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{ headerStyle: { backgroundColor: colors.card } }}>
      {FireBaseAuth.checkValidLoginSession() ?
        <>
          <Drawer.Screen name="Home" component={HomeScreen} options={{
            title: 'Home',
            drawerIcon: ({ focused, size }) => (
              <Feather
                color={colors.text}
                name="home"
                size={20}
              />
            ),
          }} />
          <Drawer.Screen name="Lecturers" component={LecturerListScreen} options={{
            title: 'Lecturers',
            drawerIcon: ({ focused, size }) => (
              <Feather
                color={colors.text}
                name="users"
                size={20}
              />
            ),
          }} />
          <Drawer.Screen name="Time Table" component={TimeTableScreen} options={{
            title: 'Time Table',
            drawerIcon: ({ focused, size }) => (
              <Feather
                color={colors.text}
                name="calendar"
                size={20}
              />
            ),
          }} />
        </>
        :
        <>
          {/* <Stack.Screen name="SignIn" component={LoginScreen} options={{ headerShown: false, title: 'Login' }} /> */}
        </>}

    </Drawer.Navigator>
  );
}

export default function App(props: any) {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? dark : standard;
  // Handle user state changes
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: theme.colors.card } }}>
        {FireBaseAuth.checkValidLoginSession() ?
          <>
            <Stack.Screen name="Root" component={Root} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={LoginScreen} options={{ headerShown: false, title: 'Login' }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign up' }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Forgot Password' }} />
          </>
          :
          <>
            <Stack.Screen name="SignIn" component={LoginScreen} options={{ headerShown: false, title: 'Login' }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign up' }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Forgot Password' }} />
            <Stack.Screen name="Root" component={Root} options={{ headerShown: false }} />
          </>
        }
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
