import React, { useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import {FeedScreen, ProfileScreen} from 'screens'
import {CurrentUserProfileItemInViewContext} from 'modules/context'

const { Screen, Navigator } = createMaterialTopTabNavigator()

export const FeedNavigator = () => {
    const [currentUserProfileItemInView, setCurrentUserProfileItemInView] = useState(null)
    return (
        <CurrentUserProfileItemInViewContext.Provider value={currentUserProfileItemInView}>
            <Navigator
                initialRouteName="feedList"
                tabBar={() => <></>}>
                <Screen
                    name="feedList"
                    component={FeedScreen}
                    initialParams={{ setCurrentUserProfileItemInView, profile: false }} />
                <Screen
                    name="feedProfile"
                    component={ProfileScreen}
                    initialParams={{ initialUserId: null }}
                />
            </Navigator>
        </CurrentUserProfileItemInViewContext.Provider>

    )
}
