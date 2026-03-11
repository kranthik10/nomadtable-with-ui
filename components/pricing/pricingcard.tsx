import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface PricingPlan {
  id: string;
  duration: string;
  price: string;
  period: string;
  description: string;
  subDescription: string;
  discount?: string;
  isPopular?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
  isSelected: boolean;
  onSelect: (planId: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={() => onSelect(plan.id)}
    >
      {plan.isPopular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>Most Popular</Text>
        </View>
      )}
      
      <Text style={styles.duration}>{plan.duration}</Text>
      <Text style={styles.description}>{plan.description}</Text>
      <Text style={styles.subDescription}>{plan.subDescription}</Text>
      
      <Text style={styles.price}>{plan.price}</Text>
      <Text style={styles.period}>{plan.period}</Text>
      
      {plan.discount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{plan.discount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 8,
    minWidth: 140,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    position: 'relative',
  },
  selectedContainer: {
    borderColor: '#ef4444',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  popularText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  duration: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    marginTop: 0,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  subDescription: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  period: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  discountBadge: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: 'absolute',
    bottom: 16,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default PricingCard;
