import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AuthScreenProps {
  onSignIn?: () => void;
  onPhoneSignIn?: () => void;
}

export default function AuthScreen({ onSignIn, onPhoneSignIn }: AuthScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.inner}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>nomadtable</Text>
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>welcome to nomadtable</Text>
          <Text style={styles.welcomeSubtitle}>find friends while traveling solo</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={onSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.primaryButtonText}>
              {Platform.OS === 'ios' ? 'Sign in with Apple' : 'Sign in with Google'}
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={onPhoneSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.phoneIcon}>📱</Text>
            <Text style={styles.secondaryButtonText}>previously signed in with phone?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>by continuing, you agree to our</Text>
          <View style={styles.linksContainer}>
            <TouchableOpacity>
              <Text style={styles.linkText}>privacy policy</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}> & </Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>terms of service</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 120,
  },
  logo: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#4285F4',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#E85A8A',
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: '700',
    marginRight: 12,
    backgroundColor: '#fff',
    color: '#4285F4',
    width: 24,
    height: 24,
    textAlign: 'center',
    borderRadius: 12,
    lineHeight: 24,
  },
  phoneIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E85A8A',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 16,
    color: '#9ca3af',
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  linksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  linkText: {
    fontSize: 14,
    color: '#E85A8A',
    textDecorationLine: 'underline',
  },
});
