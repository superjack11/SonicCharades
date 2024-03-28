import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CardSwiper from './CardSwiper';
import prompts from './Prompts.js';

const GamePage = () => {
  const [timeLeft, setTimeLeft] = useState(45);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [activeTeam, setActiveTeam] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        // Time's up, switch active team and reset timer
        setActiveTeam(activeTeam === 1 ? 2 : 1);
        setTimeLeft(45);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, activeTeam]);

  const handleSwipeLeft = () => {
    console.log('Swiped left');
    // Handle logic for when user swipes left
  };

  const handleSwipeRight = () => {
    console.log('Swiped right');
    if (activeTeam === 1) {
      setTeam1Score(team1Score + 1);
    } else {
      setTeam2Score(team2Score + 1);
    }
    // Handle logic for when user swipes right
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{timeLeft} seconds left</Text>
      <CardSwiper
        prompts={prompts}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
      />
      <Text style={styles.score}>Team 1 Score: {team1Score}</Text>
      <Text style={styles.score}>Team 2 Score: {team2Score}</Text>
      <Text style={styles.activeTeam}>Active Team: {activeTeam}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 20,
    marginBottom: 20,
  },
  score: {
    fontSize: 18,
    marginTop: 10,
  },
  activeTeam: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default GamePage;
