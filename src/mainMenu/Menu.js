import { connect } from 'react-redux';
import {
  changePokemon,
  changeInitialPokemon,
  changeLastPokemon,
  changeMiddlePokemon,
  changeFemalePokemon,
  changeMalePokemon,
} from '../store/actions/pokemon';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles/MenuStyle';
import stylesCard from './styles/CardStyle';
import stylesBgCard from './styles/BackgroundColorStyle';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function MenuInicial(props) {
  const navigation = useNavigation();

  const getPokemon = async nome => {
    const query = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nome}/`);
    props.changePokemon(query);
    navigation.navigate('pokemon');
  };

  var endpoints = [];
  const [textSearch, setTextSearch] = useState();
  const [pokemons, setPokemons] = useState([]);
  const [limit, setLimit] = useState(31);

  const getGenders = async () => {
    if (
      props.femalePokemon === '' ||
      props.femalePokemon === undefined ||
      (props.femalePokemon === null && props.malePokemon === '') ||
      props.malePokemon === undefined ||
      props.malePokemon === null
    ) {
      const female = await axios.get(`https://pokeapi.co/api/v2/gender/1/`);
      props.changeFemalePokemon(female);
      const male = await axios.get(`https://pokeapi.co/api/v2/gender/2/`);
      props.changeMalePokemon(male);
      console.log('Requisição feita');
    } else console.log('generos já preenchidos');
  };

  useEffect(() => {
    getPokemons();
    getGenders();
  }, [limit]);

  const getPokemons = async () => {
    try {
      for (var i = 1; i < limit; i++) {
        const query = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${i}/`,
        );
        endpoints.push(query);
      }
      setPokemons(endpoints);
    } catch (err) {
      console.log(err);
    }
  };

  const searchPokemons = async () => {
    var result = [];
    if (textSearch !== '') {
      try {
        const query = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${textSearch}/`,
        );
        result.push(query);
        if (query.status < 300) {
          setPokemons(result);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const pokemonFilter = name => {
    setTextSearch(name);
    var filteredPokemons = [];
    if (name === '') {
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#2C3E50',
      }}
    >
      <View style={styles.container}>
        <View style={styles.title}>
          <Image
            style={styles.imgLogo}
            source={require('../assets/icon/pokebola.png')}
          />
          <Text style={styles.logo}>Pokedex</Text>
          <Image
            style={styles.imgLogo}
            source={require('../assets/icon/pokebola.png')}
          />
        </View>
        <View style={styles.containerHeader}>
          <View style={styles.search}>
            <TextInput
              style={styles.searchInput}
              placeholder='Pesquisar'
              onChangeText={e => pokemonFilter(e.toLowerCase())}
              value={textSearch}
              placeholderTextColor='#FFF'
            />
            {textSearch !== '' ? (
              <TouchableOpacity
                onPress={() => {
                  setTextSearch('');
                  getPokemons();
                }}
              >
                <Image
                  style={styles.searchIcon}
                  source={require('../assets/icon/apagarblack.png')}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
            <TouchableOpacity onPress={() => searchPokemons()}>
              <Image
                style={styles.searchIcon}
                source={require('../assets/icon/pesquisa.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={stylesCard.contentScroll}>
          <View
            style={[
              stylesCard.content,
              {
                width: 390,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              },
            ]}
          >
            {pokemons.map((item, key) => {
              var types = [];
              for (let i = 0; i < item.data.types.length; i++) {
                types.push(item.data.types[i].type.name);
              }
              return (
                <TouchableOpacity
                  onPress={() => {
                    getPokemon(item.data.name);
                  }}
                  key={key}
                  style={[
                    stylesCard.cardPokemon,
                    stylesBgCard[item.data.types[0].type.name],
                  ]}
                >
                  <Text style={stylesCard.name}>{item.data.name}</Text>
                  <Image
                    style={[stylesCard.imgCard, { resizeMode: 'cover' }]}
                    source={{
                      uri: item['data']['sprites']['other']['official-artwork'][
                        'front_default'
                      ],
                    }}
                  />
                  <View style={stylesCard.containerTypes}>
                    {types.map((item, key) => (
                      <View key={key} style={stylesCard.types}>
                        <Text style={styles.p}>{item}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.contentBotao}>
            {textSearch === '' ||
            textSearch === undefined ||
            textSearch === null ? (
              <TouchableOpacity
                style={styles.button}
                onPress={e => setLimit(limit + 8)}
              >
                <Text style={styles.txtBtn}>Ver mais</Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        </ScrollView>
        <StatusBar style='light' />
      </View>
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return {
    pokemon: state.pokemon.pokemon,
    femalePokemon: state.pokemon.femalePokemon,
    malePokemon: state.pokemon.malePokemon,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changePokemon(pokemon) {
      const action = changePokemon(pokemon);
      dispatch(action);
    },
    changeFemalePokemon(femalePokemon) {
      const action = changeFemalePokemon(femalePokemon);
      dispatch(action);
    },
    changeMalePokemon(malePokemon) {
      const action = changeMalePokemon(malePokemon);
      dispatch(action);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuInicial);
