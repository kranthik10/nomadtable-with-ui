import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Feature {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  iconColor: string;
}

interface FeaturesDetailsProps {
  features?: Feature[];
}

const FeaturesDetails: React.FC<FeaturesDetailsProps> = ({
  features = [
    {
      icon: 'people',
      title: 'Unlock full traveler lists',
      description: 'Nearby and at your destinations',
      iconColor: '#ef4444'
    },
    {
      icon: 'star',
      title: 'Priority visibility',
      description: 'Your profile near the top of the nearby list',
      iconColor: '#ef4444'
    },
    {
      icon: 'eye',
      title: 'See who viewed your profile',
      description: 'Nearby travelers who viewed your profile',
      iconColor: '#ef4444'
    },
    {
      icon: 'bulb',
      title: 'Personalized activity ideas',
      description: 'Based off your location and interests',
      iconColor: '#ef4444'
    }
  ]
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Included with Nomadtable Plus</Text>
      
      {features.map((feature, index) => (
        <View key={index} style={styles.featureItem}>
          <View style={styles.iconContainer}>
            <Ionicons name={feature.icon} size={20} color={feature.iconColor} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignSelf: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    paddingTop: 2,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});

export default FeaturesDetails;
