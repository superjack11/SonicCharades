import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const CardSwiper = ({ prompts, onSwipeLeft, onSwipeRight }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = () => {
    setCurrentIndex(currentIndex + 1);
    onSwipeLeft();
  };

  const handleSwipeRight = () => {
    setCurrentIndex(currentIndex + 1);
    onSwipeRight();
  };

  return (
    <Swiper
      loop={false}
      showsPagination={false}
      onIndexChanged={(index) => setCurrentIndex(index)}
    >
      {prompts.map((prompt, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.promptText}>{prompt}</Text>
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
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
