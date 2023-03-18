import React, { useEffect } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { userAuthStateListener } from 'reduxs/actions'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {Modal} from 'components'
import {
    AuthScreen,
    EditProfileScreen,
    SavePostScreen,
    ChatSingleScreen,
    ProfileScreen,
    FeedScreen,
    EditProfileFieldScreen
} from 'screens'

import {HomeNavigator} from '../home'
// import {FeedNavigator} from '../feed'

const Stack = createStackNavigator()

export function Route() {
    const currentUserObj = useSelector(state => state.auth)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userAuthStateListener());
    }, [])

    if (!currentUserObj.loaded) {
        return (
            <View></View>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {currentUserObj.currentUser ?
                    <>
                        <Stack.Screen name="home" component={HomeNavigator} options={{ headerShown: false }} />
                        <Stack.Screen name="savePost" component={SavePostScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="userPosts" component={FeedScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="profileOther" component={ProfileScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="editProfile" component={EditProfileScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="editProfileField" component={EditProfileFieldScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="chatSingle" component={ChatSingleScreen} options={{ headerShown: false }} />
                    </>
                    :
                    <Stack.Screen name="auth" component={AuthScreen} options={{ headerShown: false }} />

                }
            </Stack.Navigator>
            <Modal />
        </NavigationContainer>
    )
}
