import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Badge, Button, Card } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
// npm i --save-dev @types/react-native-vector-icons
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyle from '../../../styles/global.style';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import TimeTable from '../../Services/collections/time-table';
import { useTheme } from '@react-navigation/native';

export function HomeScreen({ route, navigation }: any) {

    const { colors }: any = useTheme();

    const loginPage = () => {
        navigation.navigate('Login');
    }

    const [schdule, setSchdule] = useState([]);
    const [day, setDay] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetchData()
    }, [day])

    const fetchData = async () => {
        if (schdule.length == 0) {
            setLoading(true);
        }
        TimeTable.getTimeTableByDay('Wednesday').then(querySnapshot => {
            const data: any = querySnapshot.docs;
            setSchdule(data);
            console.log('Fetching data');
            console.log(data);
        }).finally(() => {
            setLoading(false);
        });
    };

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

    const filterTable = (date: any) => {
        console.log(date);
        setDay(date);
    };

    const getPlural = (count: any) => {
        return count > 1 ? 'Hours' : 'Hour';
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
            backgroundColor: colors.background
        },
        container: {
            flex: 1,
            backgroundColor: colors.header
        },
        header: {
            //flex: 1,
            justifyContent: 'flex-end',
            paddingHorizontal: 20,
            paddingBottom: 20,
            alignItems: 'center',
            marginTop: 10
        },
        footer: {
            flex: 3,
            backgroundColor: colors.background,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
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
        cardContainerStyle: {
            //backgroundColor: colors.background,
            borderWidth: 0,
            elevation: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            borderTopRightRadius: 7,
            //borderBottomLeftRadius: 5,
            borderBottomRightRadius: 7,
        },
        cardColorDivider: {
            width: 5,
            borderBottomLeftRadius: 7,
            borderTopLeftRadius: 7
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
            borderBottomRightRadius: 5,
            borderBottomWidth: 0
        },
        contentContainer: {
            //backgroundColor: '#DEF3F9 ',
            height: Platform.OS === 'ios' ? 100 : 110,
            marginLeft: 0,
            borderBottomWidth: 0
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
        <SafeAreaProvider>
            <ScrollView>
                <View style={[styles.container]}>
                    <View style={styles.header}>
                        <Text style={styles.text_header}> Welcome !</Text>
                        {/* <Text style={{ color: GlobalStyle.BACKGROUND_COLOR_LIGHT, marginTop: 10 }}> {route.params.user.full_name}</Text> */}
                    </View>
                    <View style={styles.footer}>
                        <LinearGradient
                            colors={[colors.background, colors.background]}
                            start={{
                                x: 0,
                                y: 0
                            }}
                            end={{
                                x: 1,
                                y: 1
                            }} style={styles.container}>

                            <Text style={{ marginLeft: 10, marginTop: 20, fontWeight: 'bold', color: colors.button_shade }}> Saturday May 26th, 2021</Text>
                            <Text style={{ marginTop: 20, marginLeft: 10, fontSize: 14, color: colors.body_text }}> Notifications</Text>
                            <Text style={{ marginTop: 10, marginLeft: 15, fontSize: 12, color: colors.text }}> No new notifications</Text>

                            <Text style={{ marginTop: 20, marginLeft: 10, fontSize: 14, color: colors.body_text }}> Scheduled classes today</Text>

                            {loading &&
                                <View style={[{
                                    flex: 1,
                                    marginTop: 20,
                                    justifyContent: "center"
                                }, {
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    padding: 10
                                }]}>
                                    <ActivityIndicator size="large" color={colors.button_shade} />
                                </View>
                            }

                            {schdule.length == 0 && loading == false &&
                                <Text style={{ marginTop: 10, marginLeft: 15, fontSize: 12, color: colors.text }}> No classes scheduled today.</Text>
                            }

                            {
                                schdule.map((item: any, i) => (
                                    <Card containerStyle={[styles.cardContainerStyle, { backgroundColor: colors.card_container }]} key={i}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={[styles.cardColorDivider, { backgroundColor: getRandomColor(i) }]}>
                                            </View>
                                            <View style={[styles.cardContent, styles.contentContainer]}>
                                                <View style={styles.cardMiddleContent}>
                                                    <Text style={styles.subjectTitle}>{item.get('subject')}</Text>
                                                    <Text style={[styles.lecturerName, { marginTop: 10 }]}>{item.get('lecturer')}</Text>
                                                    <Text style={styles.grade}>Grade: {item.get('grade')}</Text>
                                                    <Text style={[styles.location, { width: 250 }]}><Feather
                                                        name="map-pin"
                                                        color={colors.form_controls}
                                                        size={15}
                                                        style={{ marginRight: 10 }}
                                                    /> {item.get('location')}</Text>
                                                </View>
                                            </View>
                                            <View style={[styles.cardContent, styles.timeContainer]}>
                                                <Badge value={item.get('type')} status={getClassTypeBadgeStatus(item.get('type'))} containerStyle={styles.badgeStyle} />
                                                <Text style={styles.timeFieldStyle}>{tConvert(item.get('from').replace('.', ':'))} - {tConvert(item.get('to').replace('.', ':'))}</Text>
                                                <Text style={styles.timeSurationStyle}>
                                                    <Feather
                                                        name="clock"
                                                        color={colors.form_controls}
                                                        size={15}
                                                    /> {item.get('to') - item.get('from')} {getPlural(item.get('to') - item.get('from'))}</Text>
                                            </View>
                                        </View>
                                    </Card>
                                ))
                            }
                        </LinearGradient>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    );
}