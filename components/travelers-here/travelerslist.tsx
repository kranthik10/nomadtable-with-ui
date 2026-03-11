import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Traveler {
  id: string;
  name: string;
  country: string;
  distance: string;
  profileImage: string;
  isOnline: boolean;
  sharedCount?: number;
  sharedIcon?: string;
}

interface TravelersListProps {
  onClose?: () => void;
  travelers?: Traveler[];
  showUpgradePrompt?: boolean;
  onUpgradePress?: () => void;
}

const TravelersList: React.FC<TravelersListProps> = ({ 
  onClose,
  onUpgradePress,
  travelers = [
    {
      id: '1',
      name: 'Thabasya',
      country: 'United Kingdom of ...',
      distance: '1km away',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b832?w=50&h=50&fit=crop&crop=face',
      isOnline: true,
      sharedCount: 1,
      sharedIcon: '⚽'
    }
  ]
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>83 travelers in area</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#1f2937" />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          const paddingToBottom = 20;
          if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            // User has scrolled to the bottom
            onUpgradePress?.();
          }
        }}
        scrollEventThrottle={400}
      >
        {travelers.map((traveler, index) => (
          <TouchableOpacity key={traveler.id || index} style={styles.travelerItem}>
            <View style={styles.travelerInfo}>
              <View style={styles.profileSection}>
                <Image 
                  source={{ uri: traveler.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face' }} 
                  style={styles.profileImage} 
                />
                <View style={styles.countryFlag}>
                  <Text style={styles.flagText}>🇬🇧</Text>
                </View>
                {traveler.isOnline && <View style={styles.onlineIndicator} />}
              </View>
              
              <View style={styles.textInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{traveler.name}</Text>
                  {traveler.isOnline && <View style={styles.onlineDot} />}
                </View>
                <Text style={styles.country}>{traveler.country}</Text>
                <Text style={styles.distance}>{traveler.distance}</Text>
                
                {traveler.sharedCount && (
                  <View style={styles.sharedInfo}>
                    <Ionicons name="calendar" size={12} color="#6b7280" />
                    <Text style={styles.sharedText}>{traveler.sharedCount} shared:</Text>
                    {traveler.sharedIcon && (
                      <Text style={styles.sharedIcon}>{traveler.sharedIcon}</Text>
                    )}
                  </View>
                )}
              </View>
            </View>
            
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        ))}
        
        {/* Upgrade prompts for locked travelers */}
        <View style={styles.upgradeItem}>
          <View style={styles.upgradeContent}>
            <Ionicons name="lock-closed" size={16} color="#ef4444" />
            <Text style={styles.upgradeText}>Upgrade to see</Text>
          </View>
        </View>
        
        <View style={styles.upgradeItem}>
          <View style={styles.upgradeContent}>
            <Ionicons name="lock-closed" size={16} color="#ef4444" />
            <Text style={styles.upgradeText}>Upgrade to see</Text>
          </View>
        </View>
        
        <View style={styles.upgradeItem}>
          <View style={styles.upgradeContent}>
            <Ionicons name="lock-closed" size={16} color="#ef4444" />
            <Text style={styles.upgradeText}>Upgrade to see</Text>
          </View>
        </View>
        
        {/* Premium upgrade section */}
        <View style={styles.premiumSection}>
          <TouchableOpacity style={styles.unlockButton} onPress={onUpgradePress}>
            <Text style={styles.unlockButtonText}>unlock 73 more travelers</Text>
          </TouchableOpacity>
          <Text style={styles.premiumSubtext}>Connect with every traveler in your area</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  closeButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  travelerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  travelerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileSection: {
    position: 'relative',
    marginRight: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  countryFlag: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  flagText: {
    fontSize: 12,
  },
  onlineIndicator: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#fff',
  },
  textInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginRight: 6,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
  },
  country: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  distance: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  sharedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sharedText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
    marginRight: 4,
  },
  sharedIcon: {
    fontSize: 14,
  },
  upgradeItem: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  upgradeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upgradeText: {
    fontSize: 16,
    color: '#ef4444',
    marginLeft: 8,
    fontWeight: '500',
  },
  premiumSection: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  unlockButton: {
    backgroundColor: '#ef4444',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 16,
    minWidth: 280,
    alignItems: 'center',
  },
  unlockButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  premiumSubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default TravelersList;
