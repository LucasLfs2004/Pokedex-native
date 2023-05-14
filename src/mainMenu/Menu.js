import { connect } from 'react-redux';
import { changePokemon, changeInitialPokemon, changeLastPokemon, changeMiddlePokemon, changeFemalePokemon, changeMalePokemon } from '../store/actions/pokemon';
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
  const [requisition, setRequisition] = useState({})

  const { pokemon, initialPokemon, middlePokemon, lastPokemon } = props

  const navigateToSecond = () => {
    navigation.navigate("Pokemon");
  }

  const getPokemon = async (nome) => {
    const query = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nome}/`);
    props.changePokemon(query);
    // navigateToSecond()
    navigation.navigate("Pokemon");
  }


  const getEvolutionChain = async () => {
    const pokemon1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${requisition.data.chain.species.name}/`)
    props.changeInitialPokemon(pokemon1);
    const pokemon2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${requisition.data.chain.evolves_to[0].species.name}/`)
    props.changeMiddlePokemon(pokemon2);
    if (!(requisition.data.chain.evolves_to[0].evolves_to[0] == undefined)) {
      const pokemon3 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${requisition.data.chain.evolves_to[0].evolves_to[0].species.name}/`)
      props.changeLastPokemon(pokemon3);
    }
    navigateToSecond()
  }


  const getSpecies = async () => {
    props.changeLastPokemon('');
    const evolutions = await axios.get(pokemon.data.species.url)
    const query = await axios.get(evolutions.data.evolution_chain.url)
    setRequisition(query)
    console.log(requisition)
    // console.log(requisition.data.chain.evolves_to[0].evolves_to[0] === undefined)
    // const pokemon1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${requisition.data.chain.species.name}/`)
    // props.changeInitialPokemon(pokemon1);
    // const pokemon2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${requisition.data.chain.evolves_to[0].species.name}/`)
    // await props.changeMiddlePokemon(pokemon2);
    // if (!(requisition.data.chain.evolves_to[0].evolves_to[0] == undefined)) {
    //   const pokemon3 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${requisition.data.chain.evolves_to[0].evolves_to[0].species.name}/`)
    //   await props.changeLastPokemon(pokemon3);
    // }
    // navigateToSecond()
    getEvolutionChain()
  }

  var endpoints = [];
  const [textSearch, setTextSearch] = useState();
  const [pokemons, setPokemons] = useState([]);
  const [limit, setLimit] = useState(31);

  const getGenders = async () => {

    if (props.femalePokemon === "" || props.femalePokemon === undefined || props.femalePokemon === null &&
      props.malePokemon === "" || props.malePokemon === undefined || props.malePokemon === null) {
      const female = await axios.get(`https://pokeapi.co/api/v2/gender/1/`);
      props.changeFemalePokemon(female);
      const male = await axios.get(`https://pokeapi.co/api/v2/gender/2/`);
      props.changeMalePokemon(male)
      console.log('Requisição feita')
    } else console.log('generos já preenchidos')
  }

  useEffect(() => {
    getPokemons();
    getGenders();
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
                getPokemon(item.data.name);
                // getEvolutionChain(item.data.name);
                // navigateToSecond()
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
    malePokemon: state.pokemon.malePokemon,
    femalePokemon: state.pokemon.femalePokemon,
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
    changeFemalePokemon(femalePokemon) {
      const action = changeFemalePokemon(femalePokemon);
      dispatch(action);
    },
    changeMalePokemon(malePokemon) {
      const action = changeMalePokemon(malePokemon);
      dispatch(action);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuInicial);