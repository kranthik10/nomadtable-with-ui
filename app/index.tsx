import React, { useState } from 'react';
import { Redirect } from 'expo-router';
import SplashScreen from '../components/splashscreen';
import AuthScreen from '../components/auth';
import AgeScreen from '../components/signup-flow-components/age';
import UsernameScreen from '../components/signup-flow-components/username';
import GenderScreen from '../components/signup-flow-components/gender';
import UserCountryScreen from '../components/signup-flow-components/usercountry';
import UserInstagramScreen from '../components/signup-flow-components/userinstagram';
import UserAboutScreen from '../components/signup-flow-components/userabout';
import UserInterestsScreen from '../components/signup-flow-components/userinterests';
import UserProfileScreen from '../components/signup-flow-components/userprofile';

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [showAge, setShowAge] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [showGender, setShowGender] = useState(false);
  const [showCountry, setShowCountry] = useState(false);
  const [showInstagram, setShowInstagram] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showInterests, setShowInterests] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (showSplash) {
    return (
      <SplashScreen
        onGetStarted={() => {
          setShowSplash(false);
          setShowAuth(true);
        }}
      />
    );
  }

  if (showAuth) {
    return (
      <AuthScreen
        onSignIn={() => {
          setShowAuth(false);
          setShowAge(true);
        }}
        onPhoneSignIn={() => {
          setShowAuth(false);
          setShowAge(true);
        }}
      />
    );
  }

  if (showAge) {
    return (
      <AgeScreen
        onNext={(date) => {
          setShowAge(false);
          setShowUsername(true);
        }}
      />
    );
  }

  if (showUsername) {
    return (
      <UsernameScreen
        onNext={(username) => {
          setShowUsername(false);
          setShowGender(true);
        }}
      />
    );
  }

  if (showGender) {
    return (
      <GenderScreen
        onNext={(gender) => {
          setShowGender(false);
          setShowCountry(true);
        }}
      />
    );
  }

  if (showCountry) {
    return (
      <UserCountryScreen
        onNext={(country) => {
          setShowCountry(false);
          setShowInstagram(true);
        }}
      />
    );
  }

  if (showInstagram) {
    return (
      <UserInstagramScreen
        onNext={(instagram) => {
          setShowInstagram(false);
          setShowAbout(true);
        }}
      />
    );
  }

  if (showAbout) {
    return (
      <UserAboutScreen
        onNext={(about) => {
          setShowAbout(false);
          setShowInterests(true);
        }}
      />
    );
  }

  if (showInterests) {
    return (
      <UserInterestsScreen
        onNext={(interests) => {
          setShowInterests(false);
          setShowProfile(true);
        }}
      />
    );
  }

  if (showProfile) {
    return (
      <UserProfileScreen
        onNext={(photoUri) => {
          setShowProfile(false);
          setCompleted(true);
        }}
      />
    );
  }

  if (completed) {
    return <Redirect href="/(tabs)/map" />;
  }

  return null;
}
