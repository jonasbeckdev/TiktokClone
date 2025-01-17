import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons';
import styles from './style';
import { useDispatch } from 'react-redux'
import { login, register } from 'reduxs/actions';

/**
 * Function that renders a component that renders a signin/signup
 * form.
 * 
 * @param props passed to component 
 * @param props.authPage if 0 it is in the signin state
 * if 1 is in the signup state 
 * @param props.setDetailsPage setter for the variable that chooses 
 * the type of page, if true show AuthMenu else show AuthDetails 
 * @returns Component 
 */
export function AuthDetails({ authPage, setDetailsPage }) {
    const [email, setEmail] = useState(__DEV__?'jonasbeck.dev@gmail.com':'')
    const [password, setPassword] = useState(__DEV__?'jonas123':'')

    const dispatch = useDispatch()

    /**
     * dispatch login action
     */
    const handleLogin = () => {
        dispatch(login(email, password))
            .then(() => {
                console.log('login successful')
            })
            .catch(() => {
                console.log('login unsuccessful')
            })
    }

    /**
     * dispatch register action
     */
    const handleRegister = () => {
        dispatch(register(email, password))
            .then(() => {
                console.log('register successful')
            })
            .catch((error) => {
                console.log('register unsuccessful:', error.message)
            })
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setDetailsPage(false)}>
                <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
                autoCapitalize='none'
                autoComplete='off'
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.textInput}
                placeholder='Email'
            />
            <TextInput
                onChangeText={(text) => setPassword(text)}
                style={styles.textInput}
                value={password}
                secureTextEntry
                placeholder='Password'
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => authPage == 0 ? handleLogin() : handleRegister()}>
                <Text style={styles.buttonText}>{authPage == 0 ? 'Sign In' : 'Sign Up'}</Text>
            </TouchableOpacity>
        </View >
    )
}
