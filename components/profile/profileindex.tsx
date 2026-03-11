import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ProfileInfo from './profile-info';
import Premium from './premium';
import CountriesVisited from './countries-visited';
import Interests from './interests';
import Languages from './languages';
import Photos from './photos';
import UpcomingTrips from './upcoming-trips';
import Logout from './logout';

interface ProfileIndexProps {
  onClose?: () => void;
}

const ProfileIndex: React.FC<ProfileIndexProps> = ({ onClose }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ProfileInfo />
        <Premium />
        <CountriesVisited />
        <Interests />
        <Languages />
        <Photos />
        <UpcomingTrips />
        <Logout />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollView: {
    flex: 1,
  },
});

export default ProfileIndex;