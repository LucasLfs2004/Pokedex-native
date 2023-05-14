import React, { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
import { ScrollView, Text, View, Image, TextInput, Button, TouchableOpacity, ProgressBarAndroidComponent, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { changePokemon } from '../store/actions/pokemon';
import stylesColorCard from '../mainMenu/styles/ColorStyle';
import stylesBgCard from '../mainMenu/styles/BackgroundColorStyle';
import Stats from './Stats';
import Evolutions from './Evolutions';
import Characters from './Characters';

function Pokemon(props) {

  const { pokemon, initialPokemon, middlePokemon, lastPokemon } = props

  useEffect(() => {
    getEvolutions()
  }, [pokemon])


  const getEvolutions = async () => {
     await props.changeLastPokemon('');
    const evolutions = await axios.get(pokemon.data.species.url)
    const query = await axios.get(evolutions.data.evolution_chain.url)
    const pokemon1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.data.chain.species.name}/`)
    await props.changeInitialPokemon(pokemon1);
    const pokemon2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.data.chain.evolves_to[0].species.name}/`)
    await props.changeMiddlePokemon(pokemon2);
    if (!(requisition.data.chain.evolves_to[0].evolves_to[0] == undefined)) {
      const pokemon3 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.data.chain.evolves_to[0].evolves_to[0].species.name}/`)
      await props.changeLastPokemon(pokemon3);
    }
  }

  const [option, setOption] = useState('stats');

  return (
    <View style={[styles.content, stylesBgCard[pokemon.data.types[0].type.name]]} >
      <View style={styles.displayTitle}>
        <Text style={[styles.title, stylesColorCard[pokemon.data.types[0].type.name]]}>
          {pokemon.data.name}
        </Text>
      </View>
      <View style={styles.contentImg}>
        <Image
          style={styles.img}
          source={{ uri: pokemon['data']['sprites']['other']['official-artwork']['front_default'] }}
        />
      </View>
      <View style={styles.cardStats}>
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setOption('stats')} style={option === 'stats' && styles.borderBtn}>
            <Text style={styles.tabBtn}>Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOption('evolutions')}
            style={option === 'evolutions' && styles.borderBtn}>
            <Text style={styles.tabBtn}>Evolutions</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOption('characteristics')}
            style={option === 'characteristics' && styles.borderBtn}>
            <Text style={styles.tabBtn}>Characteristics</Text>
          </TouchableOpacity>
        </View>

        {option === 'stats' ? <Stats /> : <></>}
        {option === 'evolutions' ? <Evolutions /> : <></>}
        {option === 'characteristics' ? <Characters /> : <></>}
      </View>
    </View >
  );
}



function mapStateToProps(state) {
  return {
    pokemon: state.pokemon.pokemon,
    initialPokemon: state.pokemon.initialPokemon,
    middlePokemon: state.pokemon.middlePokemon,
    lastPokemon: state.pokemon.lastPokemon
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pokemon);

const styles = StyleSheet.create({
  content: {
    position: 'relative',
    flex: 1,
    width: '100%',
  },
  img: {
    width: 200,
    height: 200,
  },
  contentImg: {
    height: 384,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardStats: {
    borderRadius: '30 0 30 0',
    flex: 1,
    width: '100%',
    backgroundColor: '#2C3E50'
  },
  tabs: {
    paddingTop: 15,
    marginHorizontal: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  tabBtn: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#fff',
  },
  scroll: {
    flex: 1,
  },
  container: {
    marginHorizontal: 30,
    flex: 1,
    height: 300,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  statsAtt: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  containerStats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 52,
  },
  displayPower: {
    marginTop: 21,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  bgStats: {
    marginVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 115,
    height: 22,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberStats: {
    paddingTop: 5,
    color: '#fff',
    fontSize: 14,
  },
  progressBar: {
    height: 9,
  },

  borderBtn: {
    borderBottomColor: '#FFF',
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },

  displayTitle: {
    position: 'absolute',
    borderRadius: 30,
    width: 196,
    height: 34,
    backgroundColor: '#fff',
    top: 160,
    left: -38,
    transform: [{ rotate: '270deg' }],
  },

  title: {
    textTransform: 'capitalize',
    lineHeight: 34,
    fontSize: 28,
    fontWeight: '400',
    textAlign: 'center',
  }
});