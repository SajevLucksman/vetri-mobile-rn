
import { useTheme } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, ScrollView, StyleSheet, useColorScheme, View } from 'react-native';
import { Avatar, Divider, FAB, Icon, Input, ListItem, SearchBar, Text } from 'react-native-elements';

export function LecturerCard(props: any) {
    const { colors }: any = useTheme();
    
    const AVATAR_COLOR_CODES = [
        '#f6bd36',
        '#afd385',
        '#fe8b6b',
        '#0096E0',
        '#7888ca',
        '#8c6e64',
        '#465a65',
        '#00796B',
        '#D16BA6',
        '#C2185B'
    ];

    const getRandomColor = (key: number) => {
        let colorKey = 0;
        if (key < 10) {
            return AVATAR_COLOR_CODES[key];
        } else {
            // Create numbers between 1 to 9.
            const max = 9;
            colorKey = Math.floor(Math.random() * max) + 1;
        }
        return AVATAR_COLOR_CODES[colorKey];
    };


    const getPlural = (count: any) => {
        return count > 1 ? 'Hours' : 'Hour';
    };

    const avatarInitialGenarator = (fullName: string) => {
        const nameSegmets = fullName.split(' ');
        if (nameSegmets.length > 1) {
            return nameSegmets[0].charAt(0).toUpperCase() + '' + nameSegmets[1].charAt(0).toUpperCase();
        } else {
            return fullName.charAt(0) + fullName.charAt(1);
        }
    };

    const tConvert = (time: any) => {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    };

    const getClassTypeBadgeStatus = (type: any) => {
        if (type === 'Class') {
            return 'success';
        } else if (type === 'Online') {
            return 'warning';
        } else {
            return 'error';
        }
    };

    const styles = StyleSheet.create({
        ScrollViewContainer: {
            //backgroundColor: colors.background
        },
        container: {
            flex: 1,
            //backgroundColor: colors.background
        },
        cardContainerStyle: {
            //backgroundColor: colors.background,
            borderWidth: 0,
            elevation: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            borderTopRightRadius: 8,
            //borderBottomLeftRadius: 5,
            borderBottomRightRadius: 8,
        },
        cardColorDivider: {
            width: 5,
            borderBottomLeftRadius: 8,
            borderTopLeftRadius: 8
        },
        cardContent: {
            flex: 1,
            //borderTopLeftRadius: 5

        },
        cardMiddleContent: {
            marginLeft: 10,
            marginTop: 10
        },
        subjectTitle: {
            fontSize: 15,
            color: colors.button_shade,
            fontWeight: 'bold'
        },
        lecturerName: {
            fontSize: 13,
            color: colors.body_text,
            fontWeight: 'bold'
        },
        grade: {
            fontSize: 13,
            color: colors.body_text
        },
        location: {
            fontSize: 13,
            color: colors.body_text,
            marginTop: 10
        },
        timeContainer: {
            //backgroundColor: 'rgba(128, 159, 255, 0.2)',
            height: Platform.OS === 'ios' ? 100 : 110,
            marginLeft: 0,
            borderTopRightRadius: 5,
            //borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5
        },
        contentContainer: {
            //backgroundColor: 'rgba(128, 159, 255, 0.2)',
            height: Platform.OS === 'ios' ? 100 : 110,
            marginLeft: 0
        },
        badgeStyle: {
            alignSelf: 'flex-end',
            marginTop: -5,
            marginBottom: 5,
            marginRight: 5
        },
        timeFieldStyle: {
            fontSize: 13,
            color: colors.body_text,
            textAlign: 'right',
            marginRight: 5,
            fontWeight: 'bold'
        },
        timeSurationStyle: {
            fontSize: 13,
            color: colors.body_text,
            textAlign: 'right',
            marginRight: 5,
            marginTop: 10
        }
    });

    return (
        <ListItem containerStyle={{ backgroundColor: colors.background }} key={props.keyVal} bottomDivider>
            <Avatar
                size="medium"
                rounded
                title={avatarInitialGenarator(props.lecturerData.data().name)}
                overlayContainerStyle={{ backgroundColor: getRandomColor(props.keyVal) }}
                activeOpacity={0.7}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: 'bold', color: colors.text }}><Text style={{ fontSize: 16, color: colors.primary }}>{props.lecturerData.data().name}</Text></ListItem.Title>
                <ListItem.Title><Text style={{ fontSize: 13, color: colors.body_text }}>{props.lecturerData.data().qualification}</Text></ListItem.Title>
                <ListItem.Title ><Text style={{ fontSize: 13, color: colors.body_text }}>{props.lecturerData.data().subjects}</Text></ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    );
}

