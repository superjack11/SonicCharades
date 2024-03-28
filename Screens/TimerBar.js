import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const TimerBar = ({ timeLeft }) => {
    const [widthPercentage, setWidthPercentage] = useState(100);
  
    useEffect(() => {
      if (timeLeft > 0) {
        setWidthPercentage((timeLeft / 45) * 100); // Adjust the maximum time here (45 seconds)
      } else {
        setWidthPercentage(0);
      }
    }, [timeLeft]);
  
    return (
      <View style={styles.timerContainer}>
        <View style={[styles.timerBar, { width: `${widthPercentage}%` }]} />
      </View>
    );
  };
  

const styles = StyleSheet.create({
    timerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 4, // Adjust the height of the timer bar
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Slightly darker grey background
      },
      timerBar: {
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker color for the timer bar
      },
});

export default TimerBar;
