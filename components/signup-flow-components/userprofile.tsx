import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Button from '../ui/button';

interface UserProfileScreenProps {
  onNext?: (photoUri?: string) => void;
}

export default function UserProfileScreen({ onNext }: UserProfileScreenProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Please allow access to your photo library to select a profile picture.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Please allow access to your camera to take a profile picture.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      "Select Photo",
      "Choose how you'd like to add your profile photo",
      [
        { text: "Camera", onPress: takePhoto },
        { text: "Photo Library", onPress: pickImage },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const onPressNext = () => {
    onNext?.(selectedImage || undefined);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.inner}>
        <View style={styles.logoWrap}>
          <Text style={styles.logo}>nomadtable</Text>
        </View>

        <View style={styles.headingWrap}>
          <Text style={styles.heading}>add a profile photo</Text>
          <Text style={styles.sub}>help others recognize you with a photo - make sure{'\n'}your face is visible!</Text>
        </View>

        <View style={styles.photoContainer}>
          <TouchableOpacity
            style={styles.photoCircle}
            onPress={showImageOptions}
            activeOpacity={0.8}
          >
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.cameraIcon}>📷</Text>
                <Text style={styles.photoText}>tap to add photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.buttonWrap}>
          <Button
            title="create your account 🎉"
            onPress={onPressNext}
            variant="primary"
            size="large"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { paddingHorizontal: 24, paddingTop: 24, flex: 1 },
  logoWrap: { alignItems: 'center', marginBottom: 24 },
  logo: { fontSize: 28, fontWeight: '700' },
  headingWrap: { marginBottom: 40 },
  heading: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  sub: { color: '#6b7280', fontSize: 16, lineHeight: 24 },
  photoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 60,
  },
  photoCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  photoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  photoText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  buttonWrap: { marginTop: 'auto', paddingHorizontal: 4, paddingBottom: 20 },
});
