import { Text, FlatList } from 'react-native'
import React from 'react'
import {NavBarGeneral} from 'components'
import { ChatListItem, SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

export const ChatScreen = () => {
    const chats = useSelector(state => state.chat.list)

    const renderItem = ({ item }) => {
        return (<ChatListItem chat={item} />)
    }
    return (
        <SafeAreaView>
            <NavBarGeneral leftButton={{ display: false }} title='Direct messages' />
            <FlatList
                data={chats}
                removeClippedSubviews
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <Text></Text>
        </SafeAreaView>
    )
}
