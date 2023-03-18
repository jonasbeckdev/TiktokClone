import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import {ChatSingleItem, NavBarGeneral} from 'components'
import { useMessages } from 'hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import { sendMessage } from 'modules/services'

export const ChatSingleScreen = ({ route }) => {
    const { chatId, contactId } = route.params
    const [message, setMessage] = useState('')

    const { messages, chatIdInst } = useMessages(chatId, contactId)
    const handleCommentSend = () => {
        if (message.length == 0) {
            return;
        }
        setMessage('')
        sendMessage(chatIdInst, message)
    }

    const renderItem = ({ item }) => {
        return <ChatSingleItem item={item} />
    }

    return (
        <SafeAreaView style={styles.container}>
            <NavBarGeneral title='chat' />
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.containerInput}>
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder='send Message...'
                    style={styles.input}
                />
                <TouchableOpacity onPress={() => handleCommentSend()}>
                    <Ionicons name="arrow-up-circle" size={34} color={'crimson'} />
                </TouchableOpacity>
            </View >
        </SafeAreaView >
    )
}
