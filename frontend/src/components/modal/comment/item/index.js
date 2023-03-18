import React from 'react'
import { View, Text, Image } from 'react-native'
import { useUser } from 'hooks'
import { generalStyles } from 'styles'
import styles from './styles'

export const CommentItem = ({ item }) => {
    const user = useUser(item.creator).data
    return (
        <View style={styles.container}>
            <Image style={generalStyles.avatarSmall} source={{ uri: user.photoURL }} />

            <View style={styles.containerText}>
                <Text style={styles.displayName}>{user.displayName}</Text>
                <Text>{item.comment}</Text>
            </View>
        </View>
    )
}
