import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../ui/button';

interface UsernameScreenProps {
  onNext?: (username: string) => void;
}

export default function UsernameScreen({ onNext }: UsernameScreenProps) {
  const [name, setName] = useState('');

  const isValid = () => {
    return name.trim().length >= 2;
  };

  const onPressNext = () => {
    if (isValid()) {
      onNext?.(name.trim());
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.inner}>
        <View style={styles.logoWrap}>
          <Text style={styles.logo}>nomadtable</Text>
        </View>

        <View style={styles.headingWrap}>
          <Text style={styles.heading}>what's your name?</Text>
          <Text style={styles.sub}>let's get to know each other</Text>
        </View>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor="#9ca3af"
          autoFocus
          maxLength={50}
        />

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
  input: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    fontSize: 18,
    color: '#111827',
  },
  buttonWrap: { marginTop: 24, paddingHorizontal: 4 },
});
