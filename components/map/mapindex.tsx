import React, { useRef } from 'react';
import { 
  View, 
  StyleSheet 
} from 'react-native';

// Import map components
import MapWithLocation, { MapWithLocationRef } from './MapWithLocation';
import Header from './header';
import Travelers from './travelers';
import AddActivity from './addactivity';
import List from './list';
import Location from './location';
import Suggestions from './suggestions';

interface MapIndexProps {
  onTravelersPress?: () => void;
  onAddActivityPress?: () => void;
  onListPress?: () => void;
  onLocationPress?: () => void;
  onSuggestionsPress?: () => void;
  onProfilePress?: () => void;
}

const MapIndex: React.FC<MapIndexProps> = ({
  onTravelersPress,
  onAddActivityPress,
  onListPress,
  onLocationPress,
  onSuggestionsPress,
  onProfilePress,
}) => {
  const mapRef = useRef<MapWithLocationRef>(null);
  
  const handleLocationButtonPress = async () => {
    await mapRef.current?.getCurrentLocation();
    onLocationPress?.();
  };
  return (
    <View style={styles.container}>
      {/* Actual Map */}
      <MapWithLocation 
        ref={mapRef}
        initialRegion={{
          latitude: 51.5074, // London coordinates to match the UI
          longitude: -0.1278,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      
      {/* Map Overlays positioned to match the UI exactly */}
      <Header notificationCount={1} profileCount={1} onProfilePress={onProfilePress} />
      <Travelers count={4} onPress={onTravelersPress} />
      <Suggestions onPress={onSuggestionsPress} />
      <Location onPress={handleLocationButtonPress} />
      <AddActivity onPress={onAddActivityPress} />
      <List onPress={onListPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default MapIndex;