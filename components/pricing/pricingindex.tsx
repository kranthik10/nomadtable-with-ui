import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PricingCard from './pricingcard';
import FeaturesDetails from './featuresdetails';

interface PricingIndexProps {
  onClose?: () => void;
  onContinue?: (planId: string) => void;
}

const PricingIndex: React.FC<PricingIndexProps> = ({ onClose, onContinue }) => {
  const [selectedPlan, setSelectedPlan] = useState('1week');

  const pricingPlans = [
    {
      id: '1week',
      duration: '1 Week',
      price: '£3.79',
      period: 'per week',
      description: 'Perfect for a',
      subDescription: 'quick trip',
      isPopular: true,
    },
    {
      id: '1month',
      duration: '1 Month',
      price: '£8.49',
      period: 'per month',
      description: 'Most flexible',
      subDescription: 'option',
      discount: '30% off',
    },
    {
      id: '1year',
      duration: '1 Year',
      price: '£66.99',
      period: 'per year',
      description: 'For frequent',
      subDescription: 'travelers',
      discount: '50% off',
    },
  ];

  const handleContinue = () => {
    onContinue?.(selectedPlan);
  };

  const getSelectedPlanPrice = () => {
    const plan = pricingPlans.find(p => p.id === selectedPlan);
    return plan ? `${plan.price}/${plan.id === '1week' ? 'week' : plan.id === '1month' ? 'month' : 'year'}` : '';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.dragHandle} />
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#1f2937" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Logo and Title */}
        <View style={styles.logoSection}>
          <View style={styles.logo}>
            <Ionicons name="flower" size={32} color="#ef4444" />
          </View>
          <Text style={styles.title}>Unlock all nearby travelers!</Text>
          <Text style={styles.subtitle}>Upgrade to Nomadtable Plus</Text>
        </View>

        {/* Pricing Cards */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.pricingCardsContainer}
          contentContainerStyle={styles.pricingCardsContent}
        >
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isSelected={selectedPlan === plan.id}
              onSelect={setSelectedPlan}
            />
          ))}
        </ScrollView>

        {/* Features */}
        <FeaturesDetails />

        {/* Terms */}
        <Text style={styles.termsText}>
          Recurring billing for same price and duration, cancel anytime
        </Text>
        <View style={styles.linksRow}>
          <TouchableOpacity>
            <Text style={styles.linkText}>Restore Purchases</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.linksRow}>
          <TouchableOpacity>
            <Text style={styles.linkText}>Terms</Text>
          </TouchableOpacity>
          <Text style={styles.separator}> • </Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue - {getSelectedPlanPrice()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 20,
    position: 'relative',
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#d1d5db',
    borderRadius: 2,
    marginBottom: 16,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    padding: 4,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  pricingCardsContainer: {
    marginBottom: 20,
  },
  pricingCardsContent: {
    paddingHorizontal: 8,
  },
  termsText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 16,
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  linkText: {
    fontSize: 12,
    color: '#6b7280',
    textDecorationLine: 'underline',
  },
  separator: {
    fontSize: 12,
    color: '#6b7280',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 16,
  },
  continueButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PricingIndex;
