import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

const SCREEN_WIDTH = Dimensions.get('window').width;

// Define a Card component to render individual cards
const Card = ({ prompt }) => (
  <View style={styles.card}>
    <Text style={styles.promptText}>{prompt}</Text>
  </View>
);

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
        yupText="Correct" // Customize text for swipe right
        nopeText="Pass" // Customize text for swipe left
        handleYup={handleYup} // Function to call when user swipes right
        handleNope={handleNope} // Function to call when user swipes left
        cardWidth={SCREEN_WIDTH * 0.8} // Set a fixed width for the card
        cardHeight={SCREEN_WIDTH * 0.8 * 1.2} // Set a fixed height for the card (adjust aspect ratio as needed)
        useNativeDriver={false} // Disable native driver to suppress warnings
        swipeThreshold={0.1} // Set the swipe threshold to 50% of the card's width
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
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  promptText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CardSwiper;
