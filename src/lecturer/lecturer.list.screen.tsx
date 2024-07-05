import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, ScrollView, StyleSheet, useColorScheme, View } from 'react-native';
import { Avatar, Divider, FAB, Icon, Input, ListItem, SearchBar, Text } from 'react-native-elements';
import Lecturer from '../Services/collections/lecturer';
import { useTheme } from '@react-navigation/native';
import FirebaseAuth from '../Services/firebase-auth';
import { LecturerCard } from './shared/Lecturer-card';

export function LecturerListScreen({ route, navigation }: any) {
    const { colors }: any = useTheme();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        if (data.length == 0) {
            setLoading(true);
        }
        if (FirebaseAuth.checkValidLoginSession()) {
            Lecturer.getLecturerList().then(querySnapshot => {
                const data: any = querySnapshot.docs;
                setData(data);
                console.log('Fetching data');
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                setLoading(false);
            });
        } else {
            //Alert.alert("Invalid login");
        }
    };

    const updateSearch = (search: any) => {
        setSearch(search);
        console.log(search);
    };

    const scheme = useColorScheme();

    return (
        <View style={{ backgroundColor: colors.background }}>

            <SearchBar
                placeholder="Type Here..."
                onChangeText={(search) => updateSearch(search)}
                platform='default'
                lightTheme={scheme === 'light'}
                value={search} />

            <ScrollView >
                {data.length == 0 && loading == false &&
                    <Text style={{ marginTop: 10, marginLeft: 15, fontSize: 12, color: colors.text }}> No records returned for your search.</Text>
                }
                <View >
                    {
                        data.map((item: any, i) => (
                            <LecturerCard lecturerData={item} keyVal={i} key={i}></LecturerCard>
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
        </View>
    );
}