import React, { useContext, useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import styles from './styles'
import {ProfileNavBar, ProfileHeader, ProfilePostList} from 'components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CurrentUserProfileItemInViewContext } from 'modules/context'
import { useUser } from 'hooks'
import { getPostsByUserId } from 'modules/services'


export function ProfileScreen({ route }) {
    const { initialUserId } = route.params
    const [userPosts, setUserPosts] = useState([])

    const providerUserId = useContext(CurrentUserProfileItemInViewContext)

    const user = useUser(initialUserId ? initialUserId : providerUserId).data

    useEffect(() => {
        if (user) {
            getPostsByUserId(user.uid).then(setUserPosts)
        }
    }, [user])

    if (!user) {
        return <></>
    }
    return (
        <SafeAreaView style={styles.container}>
            <ProfileNavBar user={user} />
            <ScrollView>
                <ProfileHeader user={user} />
                <ProfilePostList posts={userPosts} />
            </ScrollView>
        </SafeAreaView>
    )
}
