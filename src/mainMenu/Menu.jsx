import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import styles from './styles/MenuStyle';
import stylesCard from './styles/CardStyle';
import stylesColorCard from './styles/ColorStyle';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

export default function MenuInicial() {


  const navigation = useNavigation();

  function navigateToSecond() {
    navigation.navigate("Second");
  }



  var endpoints = [];
  const [textSearch, setTextSearch] = useState();
  const [pokemons, setPokemons] = useState([]);
  const [limit, setLimit] = useState(31);
  useEffect(() => {
    getPokemons();
  }, [limit]
  );

  const getPokemons = async () => {
    try {
      for (var i = 1; i < limit; i++) {
        const query = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        endpoints.push(query);
      }
      setPokemons(endpoints);
    }
    catch (err) {
      console.log(err);
    }
  }

  const searchPokemons = async () => {
    var result = []
    if (textSearch !== "") {
      try {
        const query = await axios.get(`https://pokeapi.co/api/v2/pokemon/${textSearch}/`);
        result.push(query)
        if (query.status < 300) {
          setPokemons(result);
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  const pokemonFilter = (name) => {
    setTextSearch(name);
    var filteredPokemons = [];
    if (name === "") {
      getPokemons();
    }
    for (var i in pokemons) {
      if (pokemons[i].data.name.includes(name)) {
        filteredPokemons.push(pokemons[i]);
      }
    }
    setPokemons(filteredPokemons);
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <TouchableOpacity onPress={navigateToSecond}>
          <Image
            style={styles.imgLogo}
            source={require("../assets/icon/pokebola.png")}
          />
          <Text style={styles.logo}>Pokedex</Text>
          <Image
            style={styles.imgLogo}
            source={require("../assets/icon/pokebola.png")}
          />
        </TouchableOpacity>
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
            onChangeText={(e) => pokemonFilter(e.toLowerCase())}
            value={textSearch}
            placeholderTextColor="#FFF" />
          {
            textSearch !== "" ?
              <TouchableOpacity
                onPress={() => {
                  setTextSearch("");
                  getPokemons();
                }}>
                <Image
                  style={styles.searchIcon}
                  source={require("../assets/icon/apagarblack.png")}
                />
              </TouchableOpacity>
              : <></>
          }
          <TouchableOpacity
            onPress={() => searchPokemons()}>
            <Image
              style={styles.searchIcon}
              source={require("../assets/icon/pesquisa.png")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={stylesCard.contentScroll}>
        <View style={[stylesCard.content, { width: 390, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }]}>
          {pokemons.map((item, key) => {
            var types = []
            for (let i = 0; i < item.data.types.length; i++) {
              types.push(item.data.types[i].type.name)
            }
            return (
              <View
                key={key}
                style={[stylesCard.cardPokemon, stylesColorCard[item.data.types[0].type.name]]}>
                <Text style={stylesCard.name}>{item.data.name}</Text>
                <Image
                  style={[stylesCard.imgCard, { resizeMode: 'cover' }]}
                  source={{ uri: item['data']['sprites']['other']['official-artwork']['front_default'] }}
                />
                <View style={styles.containerTypes}>
                  {types.map((item, key) => (
                    <View key={key} style={stylesCard.types}>
                      <Text style={styles.p}>
                        {item}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )
          })}
        </View>
        {
          textSearch === "" ?
            <Button
              style={stylesCard.button}
              onPress={(e) => setLimit(limit + 8)}
              title="Load More"
            /> : <></>
        }
      </ScrollView>
      <StatusBar style="light" />
    </View >
  );
}