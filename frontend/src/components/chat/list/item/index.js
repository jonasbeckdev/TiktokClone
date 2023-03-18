import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useUser } from 'hooks'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth';


export const ChatListItem = ({ chat }) => {
    const navigation = useNavigation()
    const { data: userData } = useUser(chat.members[0] === auth().currentUser.uid ? chat.members[1] : chat.members[0])

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('chatSingle', { chatId: chat.id })}>
            <Image style={styles.image} source={{ uri: userData.photoURL }} />
            <View style={{ flex: 1 }}>
                <Text style={styles.userDisplayName}>{userData.displayName}</Text>
                <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
            </View>
            <Text style={styles.date}>{chat.lastUpdate ? new Date(chat.lastUpdate.seconds * 1000).toISOString().slice(0, 10) : 'Now'}</Text>
        </TouchableOpacity>
    )
}
