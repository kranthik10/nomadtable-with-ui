import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

interface MapWithLocationProps {
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

export interface MapWithLocationRef {
  getCurrentLocation: () => Promise<void>;
}

const MapWithLocation = forwardRef<MapWithLocationRef, MapWithLocationProps>(({ 
  initialRegion = {
    latitude: 51.5074,
    longitude: -0.1278,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }
}, ref) => {
  const [region, setRegion] = useState(initialRegion);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const mapRef = useRef<MapView>(null);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        setHasLocationPermission(true);
        return true;
      } else {
        Alert.alert(
          'Location Permission',
          'Location access is needed to show your position on the map',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Try Again', onPress: requestLocationPermission }
          ]
        );
        return false;
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  };

  const getCurrentLocation = async () => {
    try {
      let permissionGranted = hasLocationPermission;
      
      if (!permissionGranted) {
        permissionGranted = await requestLocationPermission();
      }
      
      if (permissionGranted) {
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
      }
    } catch (error) {
      console.error('Error getting current location:', error);
    }
  };

  const startLocationTracking = async () => {
    try {
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
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

  useImperativeHandle(ref, () => ({
    getCurrentLocation
  }));

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
            <Circle
              center={userLocation}
              radius={50}
              fillColor="rgba(59, 130, 246, 0.1)"
              strokeColor="rgba(59, 130, 246, 0.3)"
              strokeWidth={1}
            />
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
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapWithLocation;