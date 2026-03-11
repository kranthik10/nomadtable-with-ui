import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PhotosProps {
  photos?: string[];
  onAddPress?: () => void;
  onViewAllPress?: () => void;
}

const Photos: React.FC<PhotosProps> = ({
  photos = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=150&h=150&fit=crop'
  ],
  onAddPress,
  onViewAllPress
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Photos ({photos.length})</Text>
        <TouchableOpacity onPress={onViewAllPress}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.photosContainer}>
          <TouchableOpacity style={styles.addPhoto} onPress={onAddPress}>
            <Ionicons name="add" size={24} color="#9ca3af" />
          </TouchableOpacity>
          {photos.map((photo, index) => (
            <Image key={index} source={{ uri: photo }} style={styles.photo} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  viewAll: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  photosContainer: {
    flexDirection: 'row',
  },
  addPhoto: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
});

export default Photos;