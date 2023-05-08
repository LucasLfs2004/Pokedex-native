import { connect } from 'react-redux';
import { changePokemon, changeInitialPokemon, changeLastPokemon, changeMiddlePokemon } from '../store/actions/pokemon';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import styles from './styles/MenuStyle';
import stylesCard from './styles/CardStyle';
import stylesColorCard from './styles/ColorStyle';
import stylesBgCard from './styles/BackgroundColorStyle';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

function MenuInicial(props) {
  const navigation = useNavigation();

  const navigateToSecond = async (nome) => {
    const query = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nome}/`);
    await props.changePokemon(query);
    navigation.navigate("Pokemon");
  }

  const getInitialPokemon = async (id) => {
    const requisition = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
    const pokemon1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${requisition.data.chain.species.name}/`)
    props.changeInitialPokemon(pokemon1);
    const pokemon2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${requisition.data.chain.evolves_to[0].species.name}/`)
    props.changeMiddlePokemon(pokemon2);
    const pokemon3 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${requisition.data.chain.evolves_to[0].evolves_to[0].species.name}/`)
    props.changeLastPokemon(pokemon3);
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
              <TouchableOpacity onPress={() => {
                getInitialPokemon(Math.ceil(item.data.id / 3));
                navigateToSecond(item.data.name, item.data.id)
              }
              }
                key={key}
                style={[stylesCard.cardPokemon, stylesBgCard[item.data.types[0].type.name]]}>
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
              </TouchableOpacity>
            )
          })}
        </View>
        {
          textSearch === "" || textSearch === undefined || textSearch === null ?
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

function mapStateToProps(state) {
  return {
    pokemon: state.pokemon.pokemon,
    initialPokemon: state.pokemon.initialPokemon,
    middlePokemon: state.pokemon.middlePokemon,
    lastPokemon: state.pokemon.lastPokemon,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changePokemon(pokemon) {
      const action = changePokemon(pokemon);
      dispatch(action);
    },
    changeInitialPokemon(initialPokemon) {
      const action = changeInitialPokemon(initialPokemon);
      dispatch(action);
    },
    changeMiddlePokemon(middlePokemon) {
      const action = changeMiddlePokemon(middlePokemon);
      dispatch(action);
    },
    changeLastPokemon(lastPokemon) {
      const action = changeLastPokemon(lastPokemon);
      dispatch(action);
    },

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuInicial);