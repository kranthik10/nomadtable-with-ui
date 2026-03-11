import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AddActivityProps {
  onPress?: () => void;
}

const AddActivity: React.FC<AddActivityProps> = ({ onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name="add" size={32} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e74c3c',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#e74c3c',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
});

export default AddActivity;