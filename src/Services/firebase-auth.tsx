
import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

export default class FirebaseAuth {
    public static signIn = (email: string, password: string) => {
        return auth().signInWithEmailAndPassword(email, password);
    }

    public static signUp = (email: string, password: string) => {
        return auth().createUserWithEmailAndPassword(email, password);
    }

    public static signOut = () => {
        return auth().signOut();
    }

    public static getCurrentUserUid = () => {
        const currentUser = auth().currentUser;
        return currentUser ? currentUser.uid : '';
    }

    public static checkValidLoginSession = () => {
        return auth().currentUser;
    }

    public static getCurrentUserName = () => {
        const currentUser = auth().currentUser;
        return currentUser ? currentUser.displayName : '';
    }

    public static updateFirebaseAuthUserInformation = (user: any) => {
        const userProfile = {
            displayName: user.full_name,
            phoneNumber: user.mobile
        }
        auth().currentUser?.updateProfile(userProfile).catch(error => {
            console.log(error);
        });
    }

    public static resetPassword = (email: any) => {
        return auth().sendPasswordResetEmail(email);
    }
}
