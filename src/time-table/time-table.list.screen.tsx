import { removeComments, tsNonNullExpression } from '@babel/types';
import { useTheme } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Badge, Card, Chip, FAB, Icon, ListItem, Text } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import globalStyle from '../../styles/global.style';
import Lecturer from '../Services/collections/lecturer';
import TimeTable from '../Services/collections/time-table';
import CalendarStrip from 'react-native-calendar-strip';
import { color } from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import LinearGradient from 'react-native-linear-gradient';

export function TimeTableScreen({ route, navigation }: any) {
    const { colors }: any = useTheme();
    const [data, setData] = useState([]);
    const [day, setDay] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetchData()
    }, [day])

    const fetchData = async () => {
        if (data.length == 0) {
            setLoading(true);
        }
        TimeTable.getTimeTableByDay('Wednesday').then(querySnapshot => {
            const data: any = querySnapshot.docs;
            setData(data);
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
        <SafeAreaProvider>
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
                <CalendarStrip
                    scrollable
                    style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
                    calendarColor={colors.button}
                    calendarHeaderStyle={{ color: 'white' }}
                    dateNumberStyle={{ color: 'white' }}
                    dateNameStyle={{ color: 'white' }}
                    highlightDateNumberStyle={{ backgroundColor: 'red' }}
                    iconContainer={{ flex: 0.1 }}
                    onDateSelected={filterTable}
                />
                <ScrollView style={styles.ScrollViewContainer}>
                    <Text style={{ marginLeft: 10, marginTop: 20, fontWeight: 'bold', color: colors.button_shade }}> Saturday May 26th, 2021</Text>
                    <Text style={{ marginTop: 20, marginLeft: 10, fontSize: 14, color: colors.body_text }}> Scheduled classes</Text>


                    {data.length == 0 && loading == false &&
                        <Text style={{ marginTop: 10, marginLeft: 15, fontSize: 12, color: colors.text }}> No classes scheduled today.</Text>
                    }

                    <View style={styles.container}>
                        {
                            data.map((item: any, i) => (
                                <Card containerStyle={[styles.cardContainerStyle, , { backgroundColor: colors.card_container }]} key={i}>
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
                    </View>
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

                </ScrollView>
                <FAB placement="right"
                    icon={{ name: 'add', color: colors.background }}
                    color={colors.button}
                    titleStyle={{ color: colors.background }} style={{ marginBottom: 50 }}
                />
            </LinearGradient>
        </SafeAreaProvider>
    );
}

