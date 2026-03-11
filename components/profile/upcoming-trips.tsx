import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface UpcomingTripsProps {
  trips?: { destination: string; date: string }[];
  onViewAllPress?: () => void;
}

const UpcomingTrips: React.FC<UpcomingTripsProps> = ({
  trips = [
    { destination: 'Paris, France', date: 'Nov 15-22' },
    { destination: 'Tokyo, Japan', date: 'Dec 1-10' }
  ],
  onViewAllPress
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upcoming Trips</Text>
        <TouchableOpacity onPress={onViewAllPress}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      {trips.map((trip, index) => (
        <View key={index} style={styles.tripItem}>
          <View style={styles.tripIcon}>
            <Ionicons name="airplane" size={20} color="#3b82f6" />
          </View>
          <View style={styles.tripInfo}>
            <Text style={styles.destination}>{trip.destination}</Text>
            <Text style={styles.date}>{trip.date}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  viewAll: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  tripItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  tripIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tripInfo: {
    flex: 1,
  },
  destination: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export default UpcomingTrips;