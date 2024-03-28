import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Modal, TouchableOpacity } from 'react-native';
import CardSwiper from './CardSwiper';
import prompts from './Prompts.js';

const { width } = Dimensions.get('window');
const totalTime = 10; // Total time for the timer in seconds (you can change this value)

const GamePage = () => {
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [activeTeam, setActiveTeam] = useState(1);
  const [showStartModal, setShowStartModal] = useState(true);
  const [showEndModal, setShowEndModal] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerAnimation = useRef(new Animated.Value(width)).current;
  const timerRef = useRef(null);

  useEffect(() => {
    if (timeLeft === totalTime) {
      setShowStartModal(true);
      setIsTimerRunning(false); // Stop the timer
    } else if (timeLeft === 0) {
      setShowEndModal(true);
      timerAnimation.setValue(width); // Reset timer bar width
      setIsTimerRunning(false); // Stop the timer
    }
  }, [timeLeft, width]);

  useEffect(() => {
    if (isTimerRunning) {
      const timer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          // Time's up, switch active team and reset timer
          setActiveTeam(activeTeam === 1 ? 2 : 1);
          setTimeLeft(totalTime);
        }
      }, 1000);

      timerRef.current = timer;

      return () => clearInterval(timer);
    }
  }, [timeLeft, activeTeam, isTimerRunning]);

  useEffect(() => {
    const animateTimer = Animated.timing(timerAnimation, {
      toValue: 0,
      duration: totalTime * 1000, // Animate over the total time
      useNativeDriver: false,
    });

    if (isTimerRunning) {
      animateTimer.start();
    }

    return () => animateTimer.stop();
  }, [isTimerRunning, totalTime]);

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

  const handleStartTimer = () => {
    setShowStartModal(false);
    setIsTimerRunning(true);
    clearInterval(timerRef.current);
  };

  const handleEndTimer = () => {
    setShowEndModal(false);
    setTimeLeft(totalTime);
    timerAnimation.setValue(width); // Reset timer bar width
    setIsTimerRunning(true); // Start the timer for the other team
  };

  return (
    <View style={styles.container}>
      <Modal visible={showStartModal} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.largeModalContent}>
            <Text style={styles.modalText}>Get ready!</Text>
            <TouchableOpacity style={styles.startButton} onPress={handleStartTimer}>
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showEndModal} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.largeModalContent}>
            <Text style={styles.modalText}>Time's up! Pass the phone to the other team.</Text>
            <TouchableOpacity style={styles.startButton} onPress={handleEndTimer}>
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.timerContainer}>
        {/* Timer bar with animated width */}
        <Animated.View
          style={[
            styles.timerBar,
            { width: timerAnimation },
          ]}
        />
      </View>
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
  timerContainer: {
    position: 'absolute',
    top: 100,
    height: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerBar: {
    height: '100%',
    backgroundColor: '#71bfef',
  },
  score: {
    fontSize: 18,
    marginTop: 10,
  },
  activeTeam: {
    fontSize: 16,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  largeModalContent: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#71bfef',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default GamePage;