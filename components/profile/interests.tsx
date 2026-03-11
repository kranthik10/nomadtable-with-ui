import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface InterestsProps {
  interests?: string[];
  onEditPress?: () => void;
}

const Interests: React.FC<InterestsProps> = ({
  interests = ['Photography', 'Hiking', 'Food', 'Culture', 'Adventure'],
  onEditPress
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Interests</Text>
        <TouchableOpacity onPress={onEditPress}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tagsContainer}>
        {interests.map((interest, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{interest}</Text>
          </View>
        ))}
      </View>
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
  edit: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#e0f2fe',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#0369a1',
    fontWeight: '500',
  },
});

export default Interests;