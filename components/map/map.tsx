import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

interface MapProps {
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  onLocationButtonPress?: () => void;
}

const Map: React.FC<MapProps> = ({ 
  initialRegion = {
    latitude: 51.5074, // London coordinates to match the UI
    longitude: -0.1278,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  onLocationButtonPress
}) => {
  const [region, setRegion] = useState(initialRegion);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const mapRef = useRef<MapView>(null);



  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        setHasLocationPermission(true);
        getCurrentLocation();
      } else {
        Alert.alert(
          'Location Permission',
          'Location access is needed to show your position on the map',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Try Again', onPress: requestLocationPermission }
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      const userCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      
      const newRegion = {
        ...userCoords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      
      setUserLocation(userCoords);
      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);
      
      // Start watching position for live updates
      startLocationTracking();
    } catch (error) {
      console.error('Error getting current location:', error);
    }
  };

  const startLocationTracking = async () => {
    try {
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Update every 5 seconds
          distanceInterval: 10, // Update every 10 meters
        },
        (location) => {
          const newCoords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setUserLocation(newCoords);
        }
      );
    } catch (error) {
      console.error('Error watching position:', error);
    }
  };

  const handleLocationButtonPress = async () => {
    if (hasLocationPermission) {
      getCurrentLocation();
    } else {
      await requestLocationPermission();
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        region={region}
        showsUserLocation={hasLocationPermission}
        followsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={false}
        showsScale={false}
        showsBuildings={true}
        showsTraffic={false}
        showsIndoors={true}
        mapType="standard"
        pitchEnabled={false}
        rotateEnabled={false}
        scrollEnabled={true}
        zoomEnabled={true}
        toolbarEnabled={false}
        moveOnMarkerPress={false}
        showsPointsOfInterest={true}
      >
        {userLocation && (
          <>
            {/* User location accuracy circle */}
            <Circle
              center={userLocation}
              radius={50}
              fillColor="rgba(59, 130, 246, 0.1)"
              strokeColor="rgba(59, 130, 246, 0.3)"
              strokeWidth={1}
            />
            {/* User location dot */}
            <Circle
              center={userLocation}
              radius={8}
              fillColor="#3b82f6"
              strokeColor="white"
              strokeWidth={3}
            />
          </>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Map;