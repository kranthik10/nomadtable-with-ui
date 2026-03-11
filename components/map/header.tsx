import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  loadingPercentage?: number;
  notificationCount?: number;
  profileCount?: number;
  onProfilePress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  loadingPercentage = 40,
  notificationCount = 3,
  profileCount = 2,
  onProfilePress
}) => {  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity style={styles.loadingIndicator} onPress={onProfilePress}>
          <Text style={styles.loadingText}>40%</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.centerSection}>
        <View style={styles.logo}>
          <View style={styles.logoIcon}>
            <Ionicons name="flower" size={18} color="white" />
          </View>
          <Text style={styles.logoText}>nomadtable</Text>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications" size={24} color="#000" />
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="person" size={24} color="#000" />
          {profileCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{profileCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'white',
    paddingTop: 50, // More space for Android status bar
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  loadingIndicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#e74c3c',
    borderStyle: 'solid',
    position: 'relative',
  },
  loadingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconButton: {
    position: 'relative',
    marginLeft: 12,
    padding: 8,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#e74c3c',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Header;