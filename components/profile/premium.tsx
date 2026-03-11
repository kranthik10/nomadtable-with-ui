import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PremiumProps {
  onUpgradePress?: () => void;
}

const Premium: React.FC<PremiumProps> = ({ onUpgradePress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onUpgradePress}>
      <View style={styles.iconContainer}>
        <Ionicons name="diamond" size={24} color="#fbbf24" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Upgrade to Premium</Text>
        <Text style={styles.subtitle}>Unlock exclusive features</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fef3c7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default Premium;