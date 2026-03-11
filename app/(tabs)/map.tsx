import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Modal,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

// Components
import MapIndex from '../../components/map/mapindex';
import ProfileIndex from '../../components/profile/profileindex';
import TravelersList from '../../components/travelers-here/travelerslist';
import PricingIndex from '../../components/pricing/pricingindex';

export default function MapScreen() {
  const [showProfile, setShowProfile] = useState(false);
  const [activeModal, setActiveModal] = useState<'none' | 'travelers' | 'pricing'>('none');

  // Handlers
  const handleTravelersPress = () => setActiveModal('travelers');
  const handleAddActivityPress = () => console.log('Add activity pressed');
  const handleListPress = () => console.log('List pressed');
  const handleLocationPress = async () => console.log('Location pressed - Getting user location');
  const handleSuggestionsPress = () => console.log('Suggestions pressed');
  const handleProfilePress = () => setShowProfile(true);

  const closeAllModals = () => setActiveModal('none');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <MapIndex
        onTravelersPress={handleTravelersPress}
        onAddActivityPress={handleAddActivityPress}
        onListPress={handleListPress}
        onLocationPress={handleLocationPress}
        onSuggestionsPress={handleSuggestionsPress}
        onProfilePress={handleProfilePress}
      />

      {/* Profile Modal (kept separate since it's a different use case) */}
      <Modal
        visible={showProfile}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowProfile(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <ProfileIndex onClose={() => setShowProfile(false)} />
        </SafeAreaView>
      </Modal>

      {/* Single Shared Modal for Travelers + Pricing */}
      <Modal
        visible={activeModal !== 'none'}
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={true}
        onRequestClose={closeAllModals}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={closeAllModals}
          />
          <View
            style={
              activeModal === 'pricing'
                ? styles.fullModalContainer
                : styles.halfModalContainer
            }
          >
            {activeModal === 'travelers' && (
              <TravelersList
                onClose={closeAllModals}
                onUpgradePress={() => {
                  console.log('Upgrade button pressed');
                  // Switch from Travelers to Pricing
                  setActiveModal('pricing');
                }}
                travelers={[
                  {
                    id: '1',
                    name: 'Thabasya',
                    country: 'United Kingdom of ...',
                    distance: '1km away',
                    profileImage:
                      'https://images.unsplash.com/photo-1494790108755-2616b612b832?w=50&h=50&fit=crop&crop=face',
                    isOnline: true,
                    sharedCount: 1,
                    sharedIcon: '⚽',
                  },
                  {
                    id: '2',
                    name: 'kkkkk',
                    country: 'United States of A...',
                    distance: '0km away',
                    profileImage:
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
                    isOnline: true,
                  },
                  {
                    id: '3',
                    name: 'Skye',
                    country: 'United Kingdom of ...',
                    distance: '7km away',
                    profileImage:
                      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
                    isOnline: true,
                    sharedCount: 1,
                    sharedIcon: '✏️',
                  },
                  {
                    id: '4',
                    name: 'Matt',
                    country: 'United Kingdom of ...',
                    distance: '3km away',
                    profileImage:
                      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
                    isOnline: true,
                  },
                  {
                    id: '5',
                    name: 'Ash',
                    country: 'United Kingdom of ...',
                    distance: '9km away',
                    profileImage:
                      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
                    isOnline: true,
                  },
                ]}
              />
            )}

            {activeModal === 'pricing' && (
              <PricingIndex
                onClose={closeAllModals}
                onContinue={(planId) => {
                  console.log('Selected plan:', planId);
                  closeAllModals();
                }}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    flex: 1,
  },
  halfModalContainer: {
    height: '60%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  fullModalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
