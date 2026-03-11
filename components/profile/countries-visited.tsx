import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CountriesVisitedProps {
  countries?: string[];
  onViewAllPress?: () => void;
}

const CountriesVisited: React.FC<CountriesVisitedProps> = ({
  countries = ['🇬🇧', '🇫🇷', '🇮🇹', '🇪🇸', '🇩🇪', '🇳🇱'],
  onViewAllPress
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Countries Visited ({countries.length})</Text>
        <TouchableOpacity onPress={onViewAllPress}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.flagsContainer}>
          {countries.map((flag, index) => (
            <View key={index} style={styles.flagItem}>
              <Text style={styles.flag}>{flag}</Text>
            </View>
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
  flagsContainer: {
    flexDirection: 'row',
  },
  flagItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  flag: {
    fontSize: 24,
  },
});

export default CountriesVisited;