import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileInfoProps {
  name?: string;
  age?: number;
  location?: string;
  profileImage?: string;
  onEditPress?: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  name = "John Doe",
  age = 28,
  location = "London, UK",
  profileImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  onEditPress
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
          <Ionicons name="pencil" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.details}>{age} years old • {location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileHeader: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  details: {
    fontSize: 16,
    color: '#6b7280',
  },
});

export default ProfileInfo;
