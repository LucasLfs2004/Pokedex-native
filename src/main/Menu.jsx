import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, TextInput } from 'react-native';
import styles from './MenuStyle';
import axios from 'axios';

export default function MenuInicial() {

  useEffect(() => {
    getPokemons();
  }, []
  );


  const [pokemons, setPokemons] = useState([])

  const getPokemons = async (offset = 0, limit = 15) => {
    try {
      const query = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      if (query.status < 300) {
        setPokemons(query.data);
      }
    } catch (err) {

    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image
          style={styles.imgLogo}
          source={require("../assets/icon/pokebola.png")}
        />
        <Text style={styles.logo}>Pokedex</Text>
        <Image
          style={styles.imgLogo}
          source={require("../assets/icon/pokebola.png")}
        />
      </View>
      <View style={styles.containerHeader}>
        <View style={styles.btnOptions}>
          <Image
            source={require("../assets/icon/btnOptions.png")}
          />
        </View>
        <View style={styles.search}>
          <TextInput
            style={styles.searchInput}
            placeholder='Pesquisar'
            placeholderTextColor="#FFF" />
          <Image
            style={styles.searchIcon}
            source={require("../assets/icon/pesquisa.png")}
          />
        </View>
      </View>

      <View style={styles.content}>
        
        <Text>{}</Text>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

