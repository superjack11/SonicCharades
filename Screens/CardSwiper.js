import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

const SCREEN_WIDTH = Dimensions.get('window').width;

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Card = ({ prompt }) => {
  // Load the 'Viga' font
  let [fontsLoaded] = useFonts({
    'Viga': require('../assets/Viga-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.card}>
        <View style={styles.innerBox}>
            <Text style={styles.promptText}>{prompt}</Text>
        </View>
    </View>
  );
};

const CardSwiper = ({ prompts, onSwipeLeft, onSwipeRight }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledPrompts, setShuffledPrompts] = useState([]);

  useEffect(() => {
    // Shuffle prompts array when component mounts
    setShuffledPrompts([...prompts].sort(() => Math.random() - 0.5));
  }, [prompts]);

  // Callback function to handle swipe right (Yup)
  const handleYup = () => {
    onSwipeRight();
    setCurrentIndex(currentIndex + 1); // Advance to the next card
  };

  // Callback function to handle swipe left (Nope)
  const handleNope = () => {
    onSwipeLeft();
    setCurrentIndex(currentIndex + 1); // Advance to the next card
  };

  return (
    <View style={styles.container}>
      <SwipeCards
        cards={shuffledPrompts}
        renderCard={(prompt) => <Card prompt={prompt} />}
        stackSize={1} // Only show one card at a time
        loop={false} // Don't loop when reaching the end of the stack
        showNope={false}
        showYup={false}
        handleYup={handleYup} // Function to call when user swipes right
        handleNope={handleNope} // Function to call when user swipes left
        cardWidth={SCREEN_WIDTH * 0.8} // Set a fixed width for the card
        cardHeight={SCREEN_WIDTH * 0.8 * 1.2} // Set a fixed height for the card (adjust aspect ratio as needed)
        useNativeDriver={false} // Disable native driver to suppress warnings
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.8 * 1.2, // Aspect ratio 4:5
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  innerBox: {
    width: '100%', // Adjust as needed
    height: '100%', // Adjust as needed
    borderColor: '#1f93ff',
    borderWidth: 2, // Border width
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  promptText: {
    fontFamily: 'Viga', // Apply 'Viga' font
    fontSize: 50,
  },
});

export default CardSwiper;
