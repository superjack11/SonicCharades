import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TitlePage = ({ navigation }) => {
  const handleStartGame = () => {
    navigation.replace('GamePage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sonic Charades</Text>
      <Button title="Start Game" onPress={handleStartGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default TitlePage;
