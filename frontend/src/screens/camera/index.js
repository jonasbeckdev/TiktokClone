import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Camera, CameraType, FlashMode } from 'expo-camera'
import { Audio } from 'expo-av'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import * as VideoThumbnails from 'expo-video-thumbnails'

import { useIsFocused } from '@react-navigation/core'
import { Feather } from '@expo/vector-icons'

import styles from './styles'
import { useNavigation } from '@react-navigation/native'


/**
 * Function that renders a component responsible showing
 * a view with the camera preview, recording videos, controling the camera and
 * letting the user pick a video from the gallery
 * @returns Functional Component
 */
export function CameraScreen() {
    const [hasCameraPermissions, setHasCameraPermissions] = useState(false)
    const [hasAudioPermissions, setHasAudioPermissions] = useState(false)
    const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false)

    const [galleryItems, setGalleryItems] = useState([])

    const [cameraRef, setCameraRef] = useState(null)
    const [cameraPermission, cameraRequestPermission] = Camera.useCameraPermissions();
    const [cameraType, setCameraType] = useState(CameraType.back);
    const [cameraFlash, setCameraFlash] = useState(FlashMode.on)

    const [isCameraReady, setIsCameraReady] = useState(false)
    const isFocused = useIsFocused()
    const [mediaPermission, mediaRequestPermission] = MediaLibrary.usePermissions();

    const navigation = useNavigation()
    useEffect(() => {
        (async () => {
            const audioStatus = await Audio.requestPermissionsAsync()
            setHasAudioPermissions(audioStatus.status == 'granted')

            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasGalleryPermissions(galleryStatus.status == 'granted')
            await mediaRequestPermission()
            await cameraRequestPermission()

            if (galleryStatus.status == 'granted') {
                const userGalleryMedia = await MediaLibrary.getAssetsAsync({ sortBy: ['creationTime'], mediaType: ['video'] })
                setGalleryItems(userGalleryMedia.assets)
            }
        })()
    }, [])


    const recordVideo = async () => {
        if (cameraRef) {
            try {
                const options = { maxDuration: 60, quality: Camera.Constants.VideoQuality['480'] }
                const data = await cameraRef.recordAsync(options)
                const source = data.uri
                let sourceThumb = await generateThumbnail(source)
                console.log('sourceThumb:', sourceThumb)
                navigation.navigate('savePost', { source, sourceThumb })
            } catch (error) {
                console.warn(error)
            }
        }
    }

    const stopVideo = async () => {
        if (cameraRef) {
            cameraRef.stopRecording()
        }
    }

    const pickFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1
        })
        if (!result.cancelled) {
            let sourceThumb = await generateThumbnail(result.uri)
            navigation.navigate('savePost', { source: result.uri, sourceThumb })
        }
    }

    const generateThumbnail = async (source) => {
        console.log('generateThumbnail:', source)
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                source,
                {
                    time: 100,
                }
            );
            return uri;
        } catch (e) {
            console.log('generateThumbnail:', e.message);
        }
    };

    // if (!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions) {
    //     return (
    //         <View></View>
    //     )
    // }

    return (
        <View style={styles.container}>
            {isFocused ?
                <Camera
                    ref={ref => setCameraRef(ref)}
                    style={styles.camera}
                    ratio={'16:9'}
                    type={cameraType}
                    flashMode={cameraFlash}
                    onCameraReady={() => {
                        setIsCameraReady(true)
                    }}
                />
                : null}

            <View style={styles.sideBarContainer}>
                <TouchableOpacity
                    style={styles.sideBarButton}
                    onPress={() => setCameraType(cameraType === CameraType.back ? CameraType.front : CameraType.back)}>
                    <Feather name="refresh-ccw" size={24} color={'white'} />
                    <Text style={styles.iconText}>Flip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.sideBarButton}
                    onPress={() => setCameraFlash(cameraFlash === FlashMode.off ? FlashMode.torch : FlashMode.off)}>
                    <Feather name="zap" size={24} color={'white'} />
                    <Text style={styles.iconText}>Flash</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomBarContainer}>
                <View style={{ flex: 1 }}></View>
                <View style={styles.recordButtonContainer}>
                    <TouchableOpacity
                        disabled={!isCameraReady}
                        onLongPress={() => recordVideo()}
                        onPressOut={() => stopVideo()}
                        style={styles.recordButton}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => pickFromGallery()}
                        style={styles.galleryButton}>
                        {galleryItems[0] == undefined ?
                            <></>
                            :
                            <Image
                                style={styles.galleryButtonImage}
                                source={{ uri: galleryItems[0].uri }}
                            />}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
