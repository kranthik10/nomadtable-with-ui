import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ListProps {
  onPress?: () => void;
}

const List: React.FC<ListProps> = ({ onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name="list" size={20} color="#000" />
      <Text style={styles.text}>List</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    marginLeft: -50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginLeft: 8,
  },
});

export default List;