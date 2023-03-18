import React, { useEffect, useState } from 'react'
import { TextInput, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {SearchUserItem} from 'components'
import { queryUsersByEmail } from '../../modules/services/user'
import styles from './styles'

export const SearchScreen = () => {
    const [textInput, setTextInput] = useState('')
    const [searchUsers, setSearchUsers] = useState([])

    useEffect(() => {
        console.log(textInput)
        queryUsersByEmail(textInput)
            .then(setSearchUsers)
    }, [textInput])

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                onChangeText={setTextInput}
                style={styles.textInput}
                placeholder={'Search'}
            />
            <FlatList
                data={searchUsers}
                renderItem={({ item }) => <SearchUserItem item={item} />}
                keyExtractor={(item) => item.id}

            />
        </SafeAreaView>
    )
}
