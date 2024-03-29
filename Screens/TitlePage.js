import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const TitlePage = ({ navigation }) => {
  const handleStartGame = () => {
    navigation.replace('SettingsPage');
  };

  const handleHowToPlay = () => {
    // Add navigation logic to navigate to HowToPlayPage
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/titleGraphic3.png')} style={styles.image} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleStartGame}>
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.howToPlayButton]} onPress={handleHowToPlay}>
          <Text style={[styles.buttonText, styles.howToPlayButtonText]}>How to Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align items at the top
    alignItems: 'center',
    backgroundColor: '#ccf2ff',
    paddingTop: 50, // Add padding to push content down from the top
  },
  image: {
    width: 300, // Adjust the width as needed
    height: 300, // Adjust the height as needed
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20, // Add spacing between image and buttons
  },
  button: {
    backgroundColor: '#1f93ff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  howToPlayButton: {
    backgroundColor: '#ccf2ff', // Light blue background color for How to Play button
    borderWidth: 2,
    borderColor: '#1f93ff', // Border color for How to Play button
  },
  howToPlayButtonText: {
    color: '#1f93ff', // Text color for How to Play button
  },
});

export default TitlePage;
