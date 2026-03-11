import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../ui/button';

interface UserInstagramScreenProps {
  onNext?: (instagram?: string) => void;
}

export default function UserInstagramScreen({ onNext }: UserInstagramScreenProps) {
  const [instagram, setInstagram] = useState('');

  const onPressSkip = () => {
    onNext?.();
  };

  const onPressNext = () => {
    onNext?.(instagram.trim() || undefined);
  };

  const handleInstagramChange = (text: string) => {
    // Remove @ symbol if user types it
    const cleanText = text.replace('@', '');
    setInstagram(cleanText);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.inner}>
        <View style={styles.logoWrap}>
          <Text style={styles.logo}>nomadtable</Text>
        </View>

        <View style={styles.headingWrap}>
          <Text style={styles.heading}>what's your instagram?</Text>
          <Text style={styles.sub}>this helps other travelers verify you're a real person{'\n'}(optional)</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={instagram}
            onChangeText={handleInstagramChange}
            placeholder="Instagram username (no @ needed)"
            placeholderTextColor="#9ca3af"
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            returnKeyType="done"
            onSubmitEditing={instagram.trim() ? onPressNext : onPressSkip}
          />
        </View>

        <View style={styles.buttonWrap}>
          <Button
            title="skip"
            onPress={onPressSkip}
            variant="primary"
            size="large"
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
  sub: { color: '#6b7280', fontSize: 16, lineHeight: 24 },
  inputContainer: { marginTop: 24 },
  input: {
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
    fontSize: 18,
    color: '#111827',
  },
  buttonWrap: { marginTop: 40, paddingHorizontal: 4 },
});
