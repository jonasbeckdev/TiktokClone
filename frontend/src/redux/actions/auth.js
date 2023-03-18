import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { USER_STATE_CHANGE } from '../constants/constants'
import { getPostsByUser } from './post'

export const userAuthStateListener = () => dispatch => {
    auth().onAuthStateChanged((user) => {
        if (user) {
            dispatch(getCurrentUserData())
            dispatch(getPostsByUser(auth().currentUser.uid))
        } else {
            dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true })
        }
    })
}

export const getCurrentUserData = () => dispatch => {
    firestore().collection('user')
        .doc(auth().currentUser.uid)
        .onSnapshot((res) => {
            if (res.exists) {
                const currentUser = res.data()
                return dispatch({
                    type: USER_STATE_CHANGE,
                    currentUser,
                    loaded: true
                })
            }
        })
}

export const login = (email, password) => dispatch => new Promise((resolve, reject) => {
    console.log('login:', email, password)
    auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            resolve()
        })
        .catch((error) => {
            console.log('login:', error.message)
            reject()
        })
})

export const register = (email, password) => dispatch => new Promise((resolve, reject) => {
    console.log('register:', email, password)
    auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log('register:', 'success')
            resolve()
        })
        .catch((error) => {
            console.log('register:', error.message)
            reject(error)
        })
})