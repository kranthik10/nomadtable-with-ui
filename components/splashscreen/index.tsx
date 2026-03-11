import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Animated, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../ui/button';

interface ActivityItem {
  id: string;
  icon: string;
  activity: string;
  profileImage: string;
}

interface SplashScreenProps {
  onGetStarted?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onGetStarted }) => {
  const { width } = Dimensions.get('window');
  const scrollViewRef = useRef<ScrollView>(null);
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0)).current;
  const buttonPulse = useRef(new Animated.Value(1)).current;
  
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const timeZones = [
    { city: 'New York', time: '8:34 AM', emoji: '🗽', timezone: 'EST' },
    { city: 'London', time: '1:34 PM', emoji: '🎭', timezone: 'GMT' },
    { city: 'Paris', time: '2:34 PM', emoji: '🥐', timezone: 'CET' },
    { city: 'Dubai', time: '5:34 PM', emoji: '🏙️', timezone: 'GST' },
    { city: 'Tokyo', time: '10:34 PM', emoji: '🗾', timezone: 'JST' },
    { city: 'Sydney', time: '12:34 AM', emoji: '🦘', timezone: 'AEDT' },
    { city: 'Los Angeles', time: '5:34 AM', emoji: '🌴', timezone: 'PST' },
    { city: 'Mumbai', time: '7:04 PM', emoji: '🕌', timezone: 'IST' },
  ];

  const activities: ActivityItem[] = [
    { id: '1', icon: '🏃‍♂️', activity: 'running', profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
    { id: '2', icon: '🍸', activity: 'drinks', profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b832?w=40&h=40&fit=crop&crop=face' },
    { id: '3', icon: '🎭', activity: 'theater', profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' },
    { id: '4', icon: '🍳', activity: 'cooking', profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
    { id: '5', icon: '🥯', activity: 'brunch', profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face' },
  ];

  const titleWords = ['join', 'activities', 'and', 'connect', 'with', 'travelers', 'wherever', 'you', 'go', '🎉'];

  // Initialize animations with proper values
  const activityAnimations = useRef(activities.map(() => new Animated.Value(0))).current;
  const wordAnimations = useRef(titleWords.map(() => new Animated.Value(0))).current;

  // Logo animation
  useEffect(() => {
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Auto scroll cities
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: Math.random() * (timeZones.length * 120),
          animated: true,
        });
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, []);

  // Word by word animation
  useEffect(() => {
    const wordInterval = setInterval(() => {
      if (wordIndex < titleWords.length) {
        Animated.spring(wordAnimations[wordIndex], {
          toValue: 1,
          tension: 100,
          friction: 6,
          useNativeDriver: true,
        }).start();
        setWordIndex(prev => prev + 1);
      }
    }, 300);

    return () => clearInterval(wordInterval);
  }, [wordIndex]);

  // Activity icons animation
  useEffect(() => {
    const activityInterval = setInterval(() => {
      if (currentActivityIndex < activities.length) {
        Animated.sequence([
          Animated.spring(activityAnimations[currentActivityIndex], {
            toValue: 1,
            tension: 80,
            friction: 4,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(activityAnimations[currentActivityIndex], {
              toValue: 1.2,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(activityAnimations[currentActivityIndex], {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ]),
        ]).start();
        setCurrentActivityIndex(prev => prev + 1);
      }
    }, 800);

    return () => clearInterval(activityInterval);
  }, [currentActivityIndex]);

  // Button animation
  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.spring(buttonScale, {
        toValue: 1,
        tension: 50,
        friction: 6,
        useNativeDriver: true,
      }).start();

      // Pulse animation
      const pulseAnimation = () => {
        Animated.sequence([
          Animated.timing(buttonPulse, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(buttonPulse, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start(() => pulseAnimation());
      };
      pulseAnimation();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Logo - Center Top */}
      <Animated.View 
        style={[
          styles.logoSection,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <View style={styles.logo}>
          <Ionicons name="flower" size={32} color="#000" />
        </View>
        <Text style={styles.logoText}>nomadtable</Text>
      </Animated.View>

      {/* Auto-scrolling Cities */}
      <View style={styles.citiesContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.citiesScrollContent}
          decelerationRate="fast"
          snapToInterval={120}
        >
          {timeZones.map((zone, index) => (
            <View key={index} style={styles.cityItem}>
              <Text style={styles.cityEmoji}>{zone.emoji}</Text>
              <Text style={styles.cityName}>{zone.city}</Text>
              <Text style={styles.cityTime}>{zone.time}</Text>
              <Text style={styles.timezone}>{zone.timezone}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Animated Title */}
      <View style={styles.titleContainer}>
        <View style={styles.titleWords}>
          {titleWords.map((word, index) => (
            <Animated.Text
              key={index}
              style={[
                styles.titleWord,
                {
                  opacity: wordAnimations[index],
                  transform: [
                    {
                      translateY: wordAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              {word}{' '}
            </Animated.Text>
          ))}
        </View>
      </View>

      {/* Animated Activity Icons */}
      <View style={styles.activitiesContainer}>
        {activities.map((item, index) => (
          <Animated.View
            key={item.id}
            style={[
              styles.activityItem,
              {
                opacity: activityAnimations[index],
                transform: [
                  { scale: activityAnimations[index] },
                  {
                    translateY: activityAnimations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.activityCircle}>
              <Text style={styles.activityIcon}>{item.icon}</Text>
              <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
            </View>
          </Animated.View>
        ))}
      </View>

      {/* Animated Button */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            transform: [
              { scale: buttonScale },
              { scale: buttonPulse },
            ],
          },
        ]}
      >
        <Button
          title="let me in"
          onPress={onGetStarted || (() => {})}
          variant="primary"
          size="large"
          style={styles.getStartedButton}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: -0.5,
  },
  citiesContainer: {
    height: 100,
    marginVertical: 20,
  },
  citiesScrollContent: {
    paddingHorizontal: 20,
  },
  cityItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginHorizontal: 5,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cityEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  cityName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
    textTransform: 'capitalize',
  },
  cityTime: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  timezone: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 1,
  },
  titleContainer: {
    paddingHorizontal: 30,
    marginVertical: 40,
  },
  titleWords: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWord: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    lineHeight: 32,
    marginHorizontal: 2,
  },
  activitiesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 20,
  },
  activityItem: {
    margin: 15,
  },
  activityCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  activityIcon: {
    fontSize: 36,
  },
  profileImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    position: 'absolute',
    bottom: -6,
    right: -6,
    borderWidth: 3,
    borderColor: '#fff',
  },
  buttonContainer: {
    paddingBottom: 50,
    paddingHorizontal: 40,
  },
  getStartedButton: {
    width: '80%',
    alignSelf: 'center',
  },
});

export default SplashScreen;
