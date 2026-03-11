import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../ui/button';

interface UserCountryScreenProps {
  onNext?: (country: string) => void;
}

const countries = [
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
];

export default function UserCountryScreen({ onNext }: UserCountryScreenProps) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isValid = () => {
    return selectedCountry !== null;
  };

  const onPressNext = () => {
    if (isValid()) {
      onNext?.(selectedCountry.name);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.inner}>
        <View style={styles.logoWrap}>
          <Text style={styles.logo}>nomadtable</Text>
        </View>

        <View style={styles.headingWrap}>
          <Text style={styles.heading}>where's home for you?</Text>
          <Text style={styles.sub}>select your home country</Text>
        </View>

        <TouchableOpacity
          style={styles.countrySelector}
          onPress={() => setShowCountryModal(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.flag}>{selectedCountry.flag}</Text>
          <Text style={styles.countryName}>{selectedCountry.name}</Text>
        </TouchableOpacity>

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

      <Modal
        visible={showCountryModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer} edges={['top']}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowCountryModal(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Country</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search countries..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
            />
          </View>

          <ScrollView style={styles.countriesList}>
            {filteredCountries.map((country) => (
              <TouchableOpacity
                key={country.code}
                style={[
                  styles.countryItem,
                  selectedCountry.code === country.code && styles.selectedCountryItem
                ]}
                onPress={() => {
                  setSelectedCountry(country);
                  setShowCountryModal(false);
                  setSearchQuery('');
                }}
              >
                <Text style={styles.countryFlag}>{country.flag}</Text>
                <Text style={[
                  styles.countryItemName,
                  selectedCountry.code === country.code && styles.selectedCountryName
                ]}>
                  {country.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
  countrySelector: {
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
    marginTop: 24,
  },
  flag: {
    fontSize: 24,
    marginRight: 16,
    width: 30,
  },
  countryName: {
    fontSize: 18,
    color: '#111827',
    fontWeight: '500',
  },
  buttonWrap: { marginTop: 40, paddingHorizontal: 4 },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  cancelButton: {
    fontSize: 16,
    color: '#E85A8A',
    fontWeight: '600',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  placeholder: {
    width: 60,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchInput: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  countriesList: {
    flex: 1,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  selectedCountryItem: {
    backgroundColor: '#fef7f0',
  },
  countryFlag: {
    fontSize: 20,
    marginRight: 16,
    width: 30,
  },
  countryItemName: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  selectedCountryName: {
    color: '#E85A8A',
    fontWeight: '600',
  },
});
