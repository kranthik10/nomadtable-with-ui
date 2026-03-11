import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../ui/button';

interface GenderScreenProps {
  onNext?: (gender: string) => void;
}

type Gender = 'male' | 'female' | 'non-binary';

export default function GenderScreen({ onNext }: GenderScreenProps) {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);

  const isValid = () => {
    return selectedGender !== null;
  };

  const onPressNext = () => {
    if (isValid() && selectedGender) {
      onNext?.(selectedGender);
    }
  };

  const GenderOption = ({ gender, label, icon }: { gender: Gender; label: string; icon: string }) => (
    <TouchableOpacity
      style={[styles.option, selectedGender === gender && styles.selectedOption]}
      onPress={() => setSelectedGender(gender)}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.optionText, selectedGender === gender && styles.selectedText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.inner}>
        <View style={styles.logoWrap}>
          <Text style={styles.logo}>nomadtable</Text>
        </View>

        <View style={styles.headingWrap}>
          <Text style={styles.heading}>what's your gender?</Text>
          <Text style={styles.sub}>for your profile</Text>
        </View>

        <View style={styles.optionsContainer}>
          <GenderOption gender="male" label="Male" icon="♂" />
          <GenderOption gender="female" label="Female" icon="♀" />
          <GenderOption gender="non-binary" label="Non-binary" icon="⚪" />
        </View>

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
  headingWrap: { marginBottom: 40 },
  heading: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  sub: { color: '#6b7280', fontSize: 16 },
  optionsContainer: { marginTop: 24, gap: 16 },
  option: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedOption: {
    borderColor: '#E85A8A',
    backgroundColor: '#fef7f0',
  },
  icon: {
    fontSize: 24,
    marginRight: 16,
    width: 30,
  },
  optionText: {
    fontSize: 18,
    color: '#111827',
    fontWeight: '500',
  },
  selectedText: {
    color: '#E85A8A',
    fontWeight: '600',
  },
  buttonWrap: { marginTop: 40, paddingHorizontal: 4 },
});
