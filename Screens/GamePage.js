import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Modal, TouchableOpacity } from 'react-native';
import CardSwiper from './CardSwiper';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const GamePage = ({route}) => {
    const { maxRounds, totalTime, prompts } = route.params; // Accessing parameters passed from SettingsPage
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [activeTeam, setActiveTeam] = useState(1);
  const [showStartModal, setShowStartModal] = useState(true);
  const [showEndModal, setShowEndModal] = useState(false);
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [rounds, setRounds] = useState(0); // New state for tracking rounds

  const timerAnimation = useRef(new Animated.Value(width)).current;
  const timerRef = useRef(null);

  useEffect(() => {
    if (timeLeft === totalTime) {
      setShowStartModal(true);
      setIsTimerRunning(false); // Stop the timer
    } else if (timeLeft === 0) {
        setIsTimerRunning(false); // Stop the timer
        setRounds(rounds + 1); // Increment the round count
    
        if (rounds + 1 >=  maxRounds * 2) {
          // If maximum rounds reached, show end-of-game modal
          setShowStartModal(false);
          setShowEndModal(false);
          setShowEndGameModal(true);
        } else {
            setShowEndModal(true);
            timerAnimation.setValue(width); // Reset timer bar width
        }
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
    setActiveTeam(activeTeam === 1 ? 2 : 1); // Toggle between Team 1 and Team 2
    setIsTimerRunning(true); // Start the timer for the other team
  };

  const handlePauseGame = () => {
    setIsTimerRunning(false);
    setShowPauseModal(true);
  };

  const handleResumeGame = () => {
    setShowPauseModal(false);
    setIsTimerRunning(true);
  };

  const handleReturnToMenu = () => {
    // Implement navigation to the main menu screen
    console.log('Returning to menu');
    navigation.replace('TitlePage');
  };

  const handlePlayAgain = () => {
    setShowEndModal(false);
    setShowEndGameModal(false);
    setTeam1Score(0);
    setTeam2Score(0);
    setActiveTeam(1);
    setRounds(0); // Reset rounds
    setTimeLeft(totalTime);
    setIsTimerRunning(true);
  };

  return (
    <View style={styles.container}>
        <Modal visible={showEndGameModal} transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                    End of Game!{' '}
                    {team1Score > team2Score
                        ? `Team 1 Wins!`
                        : team1Score === team2Score
                        ? 'Tie'
                        : `Team 2 Wins!`}
                </Text>          
                <TouchableOpacity style={styles.startButton} onPress={handlePlayAgain}>
                    <Text style={styles.startButtonText}>Play Again</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.startButton} onPress={handleReturnToMenu}>
                    <Text style={styles.startButtonText}>Return to Menu</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>

      <Modal visible={showStartModal} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalText, {fontSize: 60}]}>Get Ready!</Text>
            <TouchableOpacity style={styles.startButton} onPress={handleStartTimer}>
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showEndModal} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Time's up! Pass the phone to the other team.</Text>
            <TouchableOpacity style={styles.startButton} onPress={handleEndTimer}>
              <Text style={styles.startButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showPauseModal} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Game is Paused</Text>
            <View style={styles.pauseModalButtons}>
              <TouchableOpacity style={styles.pauseModalButton} onPress={handleResumeGame}>
                <Text style={styles.pauseModalButtonText}>Resume</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pauseModalButton} onPress={handleReturnToMenu}>
                <Text style={styles.pauseModalButtonText}>Return to Menu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


      <View style={styles.scoresContainer}>
        <View style={[styles.scoreContainer, activeTeam === 1 ? styles.activeTeamView : undefined]}>
          <Text style={styles.score}>Team 1:{"\n"}{team1Score}</Text>
        </View>
        <TouchableOpacity style={styles.pauseButton} onPress={handlePauseGame}>
          <Ionicons name="pause-circle-outline" size={50} color="#1f93ff" />
        </TouchableOpacity>
        <View style={[styles.scoreContainer, activeTeam === 2 ? styles.activeTeamView : undefined]}>
          <Text style={styles.score}>Team 2:{"\n"}{team2Score}</Text>
        </View>
      </View>

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
      <View style={styles.swiperContainer}>
        <View style={styles.swipeLeftContainer}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="red" />
          <Text style={styles.swipeText}>Skip</Text>
        </View>
        
        <View style={styles.swipeRightContainer}>
          <Text style={styles.swipeText}>Correct</Text>
          <Ionicons name="arrow-forward-circle-outline" size={30} color="green" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccf2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    top: 60,
  },
  scoreContainer: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#1f93ff',
  },
  score: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 23,
    color: 'black',
    padding: 10, // Add padding for better appearance
  },
  activeTeamView: {
    backgroundColor: '#1f93ff',
  },
  timerContainer: {
    position: 'absolute',
    top: 200,
    height: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerBar: {
    height: '100%',
    backgroundColor: '#1f93ff',
    borderRadius: 30,
  },
  swiperContainer: {
    bottom: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  swipeLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  swipeRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  swipeText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '70%',
    height: 300, // Fixed height for the modal content
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pauseModalContent: {
    backgroundColor: 'white',
    width: '70%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalText: {
    fontSize: 30, // Adjust font size as needed
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#1f93ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%', // Ensure button takes full width of modal content
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  pauseButton: {
    marginHorizontal: -50,
  },
  pauseModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  pauseModalButton: {
    backgroundColor: '#1f93ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '45%', // Ensure button takes full width of modal content
  },
  pauseModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default GamePage;
