// SettingsPage.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import packs from './Packs.js';


const SettingsPage = ({ navigation }) => {
  const [rounds, setRounds] = useState(3); // Default value for rounds
  const [durationPerTurn, setDurationPerTurn] = useState(60); // Default value for duration per turn

  const handleStartGame = () => {
    // Navigate to GamePage and pass the settings as parameters
    navigation.replace('GamePage', {
      maxRounds: rounds,
      totalTime: durationPerTurn,
      prompts: selectedPack.prompts,
    });
  };

  const handleIncrementRounds = () => {
    setRounds(prevRounds => prevRounds + 1);
  };

  const handleDecrementRounds = () => {
    if (rounds > 1) {
      setRounds(prevRounds => prevRounds - 1);
    }
  };

  const handleIncrementDuration = () => {
    setDurationPerTurn(prevDuration => prevDuration + 5);
  };

  const handleDecrementDuration = () => {
    if (durationPerTurn > 10) {
      setDurationPerTurn(prevDuration => prevDuration - 5);
    }
  };

  const [selectedPack, setSelectedPack] = useState(null); // State to track the selected pack

  const handleSelectPack = (pack) => {
    setSelectedPack(pack); // Update selected pack
  };

  const handleGoBack = () => {
    navigation.replace('TitlePage');
  };

  return (
    <View style={styles.container}>
        <View style={styles.packListContainer}>
            <Text style={styles.subtitle}>Select Pack</Text>
            <FlatList
                data={packs}
                horizontal
                contentContainerStyle={styles.packListContent}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                <TouchableOpacity
                    style={[styles.packItem, selectedPack === item ? styles.selectedPack : null]}
                    onPress={() => handleSelectPack(item)}
                >
                    <Image source={item.coverImage} style={styles.packImage} />
                    <Text style={styles.packTitle}>{item.title}</Text>
                </TouchableOpacity>
                )}
            />
        </View>
      <View style={styles.settingContainer}>
        <Text style={styles.label}>Number of Rounds:</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.arrowButton} onPress={handleDecrementRounds}>
            <Ionicons name="remove-circle-outline" size={24} color="#1f93ff" />
          </TouchableOpacity>
          <Text style={styles.number}>{rounds}</Text>
          <TouchableOpacity style={styles.arrowButton} onPress={handleIncrementRounds}>
            <Ionicons name="add-circle-outline" size={24} color="#1f93ff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.label}>Duration per Turn (seconds):</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.arrowButton} onPress={handleDecrementDuration}>
            <Ionicons name="remove-circle-outline" size={24} color="#1f93ff" />
          </TouchableOpacity>
          <Text style={styles.number}>{durationPerTurn}</Text>
          <TouchableOpacity style={styles.arrowButton} onPress={handleIncrementDuration}>
            <Ionicons name="add-circle-outline" size={24} color="#1f93ff" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={[styles.button, {marginTop: 40}]} onPress={handleStartGame}>
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.backButton]} onPress={handleGoBack}>
          <Text style={[styles.buttonText, styles.backButtonText]}>Back</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccf2ff',
  },
  settingContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  number: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  arrowButton: {
    paddingHorizontal: 10,
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
  packItem: {
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#ccf2ff',
    borderRadius: 10,
    width: 175,
    height: 175,
  },
  packImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  packTitle: {
    textAlign: 'center',
    fontSize: 25,
  },
  selectedPack: {
    borderColor: '#1f93ff',
    backgroundColor: '#61baff',
    borderWidth: 0,
  },
  packListContainer: {
    top: -25,
    width: '100%',
    height: '30%',
    backgroundColor: '#a8e9ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  packListContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    backgroundColor: '#ccf2ff', // Light blue background color for How to Play button
    borderWidth: 2,
    borderColor: '#1f93ff', // Border color for How to Play button
  },
  backButtonText: {
    color: '#1f93ff', // Text color for How to Play button
  },
  subtitle: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 30,
  },
});

export default SettingsPage;
