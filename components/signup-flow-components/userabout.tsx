import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../ui/button';

interface UserAboutScreenProps {
  onNext?: (about?: string) => void;
}

export default function UserAboutScreen({ onNext }: UserAboutScreenProps) {
  const [about, setAbout] = useState('');
  const maxLength = 200;

  const onPressSkip = () => {
    onNext?.();
  };

  const onPressNext = () => {
    onNext?.(about.trim() || undefined);
  };

  const handleAboutChange = (text: string) => {
    if (text.length <= maxLength) {
      setAbout(text);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.inner}>
        <View style={styles.logoWrap}>
          <Text style={styles.logo}>nomadtable</Text>
        </View>

        <View style={styles.headingWrap}>
          <Text style={styles.heading}>tell us about yourself</Text>
          <Text style={styles.sub}>a short bio to help other travelers get to know you{'\n'}(optional)</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={about}
            onChangeText={handleAboutChange}
            placeholder="I'm a foodie who loves exploring local cuisines and meeting new people..."
            placeholderTextColor="#9ca3af"
            multiline={true}
            textAlignVertical="top"
            autoFocus={true}
            returnKeyType="done"
            onSubmitEditing={about.trim() ? onPressNext : onPressSkip}
          />
          <Text style={styles.charCount}>{about.length}/{maxLength}</Text>
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
  inputContainer: { marginTop: 24, position: 'relative' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    fontSize: 16,
    color: '#111827',
    minHeight: 120,
    maxHeight: 180,
  },
  charCount: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '500',
  },
  buttonWrap: { marginTop: 40, paddingHorizontal: 4 },
});
