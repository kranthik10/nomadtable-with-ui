import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../ui/button';

interface UserInterestsScreenProps {
  onNext?: (interests: string[]) => void;
}

const interests = [
  { id: 'foodie', name: 'Foodie', emoji: '🍜' },
  { id: 'cooking', name: 'Cooking', emoji: '👨‍🍳' },
  { id: 'coffee', name: 'Coffee', emoji: '☕' },
  { id: 'wine-tasting', name: 'Wine Tasting', emoji: '🍷' },
  { id: 'craft-beer', name: 'Craft Beer', emoji: '🍺' },
  { id: 'alcohol-free', name: 'Alcohol-Free', emoji: '☀️' },
  { id: 'nightlife', name: 'Nightlife', emoji: '🌙' },
  { id: 'cocktail-bars', name: 'Cocktail Bars', emoji: '🍸' },
  { id: 'rooftop-bars', name: 'Rooftop Bars', emoji: '🏢' },
  { id: 'clubbing', name: 'Clubbing', emoji: '🕺' },
  { id: 'live-music', name: 'Live Music', emoji: '🎸' },
  { id: 'music', name: 'Music', emoji: '🎵' },
  { id: 'karaoke', name: 'Karaoke', emoji: '🎤' },
  { id: 'dancing', name: 'Dancing', emoji: '💃' },
  { id: 'wellness', name: 'Wellness', emoji: '🧠' },
  { id: 'yoga', name: 'Yoga', emoji: '🧘‍♀️' },
  { id: 'meditation', name: 'Meditation', emoji: '🧘‍♀️' },
  { id: 'fitness', name: 'Fitness', emoji: '🏃‍♂️' },
  { id: 'sports', name: 'Sports', emoji: '⚽' },
  { id: 'spa', name: 'Spa', emoji: '🧖‍♀️' },
  { id: 'gym', name: 'Gym', emoji: '🏋️‍♂️' },
  { id: 'shopping', name: 'Shopping', emoji: '🛍️' },
  { id: 'board-games', name: 'Board Games', emoji: '🎲' },
  { id: 'volunteering', name: 'Volunteering', emoji: '🏆' },
  { id: 'eco-travel', name: 'Eco Travel', emoji: '🌱' },
  { id: 'digital-nomad', name: 'Digital Nomad', emoji: '💻' },
];

export default function UserInterestsScreen({ onNext }: UserInterestsScreenProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const maxSelections = 7;

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interestId)) {
        return prev.filter(id => id !== interestId);
      } else if (prev.length < maxSelections) {
        return [...prev, interestId];
      }
      return prev;
    });
  };

  const isValid = () => {
    return selectedInterests.length > 0;
  };

  const onPressNext = () => {
    if (isValid()) {
      onNext?.(selectedInterests);
    }
  };

  const InterestChip = ({ interest }: { interest: typeof interests[0] }) => {
    const isSelected = selectedInterests.includes(interest.id);
    const isDisabled = !isSelected && selectedInterests.length >= maxSelections;
    
    return (
      <TouchableOpacity
        style={[
          styles.chip,
          isSelected && styles.selectedChip,
          isDisabled && styles.disabledChip
        ]}
        onPress={() => toggleInterest(interest.id)}
        disabled={isDisabled}
        activeOpacity={0.8}
      >
        <Text style={styles.emoji}>{interest.emoji}</Text>
        <Text style={[
          styles.chipText,
          isSelected && styles.selectedChipText,
          isDisabled && styles.disabledChipText
        ]}>
          {interest.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.inner}>
        <View style={styles.logoWrap}>
          <Text style={styles.logo}>nomadtable</Text>
        </View>

        <View style={styles.headingWrap}>
          <Text style={styles.heading}>what do you like to do?</Text>
          <Text style={styles.sub}>pick up to {maxSelections} interests for your profile. we'll also use{'\n'}these to generate nearby activity suggestions for{'\n'}you</Text>
        </View>

        <ScrollView 
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.chipsContainer}>
            {interests.map((interest) => (
              <InterestChip key={interest.id} interest={interest} />
            ))}
          </View>
        </ScrollView>

        <View style={styles.buttonWrap}>
          <Button
            title="next"
            onPress={onPressNext}
            variant="primary"
            size="large"
            disabled={!isValid()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { paddingHorizontal: 24, paddingTop: 24, flex: 1 },
  logoWrap: { alignItems: 'center', marginBottom: 24 },
  logo: { fontSize: 28, fontWeight: '700' },
  headingWrap: { marginBottom: 24 },
  heading: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  sub: { color: '#6b7280', fontSize: 16, lineHeight: 24 },
  scrollContainer: { flex: 1, marginTop: 16 },
  scrollContent: { paddingBottom: 20 },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  chip: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  selectedChip: {
    borderColor: '#E85A8A',
    backgroundColor: '#fef7f0',
  },
  disabledChip: {
    opacity: 0.5,
  },
  emoji: {
    fontSize: 18,
    marginRight: 8,
  },
  chipText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  selectedChipText: {
    color: '#E85A8A',
    fontWeight: '600',
  },
  disabledChipText: {
    color: '#9ca3af',
  },
  buttonWrap: { paddingHorizontal: 4, paddingVertical: 20 },
});
