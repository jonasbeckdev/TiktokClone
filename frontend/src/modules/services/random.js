import storage from '@react-native-firebase/storage'

export const saveMediaToStorage = (media, path) => new Promise((resolve, reject) => {
    const fileRef = storage().ref().child(path)
    fileRef.putFile(media).then(()=>{
        fileRef.getDownloadURL().then(downloadUrl => resolve(downloadUrl)).catch(error=>reject(error))
    }).catch(error=>reject(error))
})