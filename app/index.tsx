import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import {
    Button,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export default function Index() {
    const [permission, requestPermission] = useCameraPermissions();
    const ref = useRef<CameraView>(null);
    const [recording, setRecording] = useState(false);

    if (!permission) {
        return null;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>
                    We need your permission to use the camera
                </Text>
                <Button
                    onPress={requestPermission}
                    title="Grant permission"
                />
            </View>
        );
    }

    const recordVideo = async () => {
        if (recording) {
            setRecording(false);
            ref.current?.stopRecording();
            return;
        }
        setRecording(true);
        const video = await ref.current?.recordAsync();
        console.log({ video });
    };

    const renderCamera = () => {
        return (
            <CameraView
                style={styles.camera}
                ref={ref}
                mode="video"
                mute={false}
                responsiveOrientationWhenOrientationLocked
                onCameraReady={() => {
                    console.log(ref.current);
                }}
            >
                <View style={styles.shutterContainer}>
                    <Pressable onPress={recordVideo}>
                        <Feather
                            name="video"
                            size={32}
                            color="white"
                        />
                    </Pressable>
                </View>
            </CameraView>
        );
    };

    return <View style={styles.container}>{renderCamera()}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    camera: {
        flex: 1,
        width: '100%'
    },
    shutterContainer: {
        position: 'absolute',
        bottom: 44,
        left: 0,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 30
    }
});
