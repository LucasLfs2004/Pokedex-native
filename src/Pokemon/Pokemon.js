import React, { useState } from 'react';
import * as Progress from 'react-native-progress';
import { ScrollView, Text, View, Image, TextInput, Button, TouchableOpacity, ProgressBarAndroidComponent } from 'react-native';
import { connect } from 'react-redux';
import { changePokemon } from '../store/actions/pokemon';
import StylesPokemon from './PokemonStyle';
import stylesColorCard from '../mainMenu/styles/ColorStyle';
import stylesBgCard from '../mainMenu/styles/BackgroundColorStyle';
import Stats from './Stats';
import Evolutions from './Evolutions';

function Pokemon(props) {
  const { pokemon, initialPokemon, middlePokemon, lastPokemon } = props;
  const [option, setOption] = useState('stats');

  return (
    <View style={[StylesPokemon.content, stylesBgCard[pokemon.data.types[0].type.name]]} >
      <View style={StylesPokemon.contentImg}>
        <Image
          style={StylesPokemon.img}
          source={{ uri: pokemon['data']['sprites']['other']['official-artwork']['front_default'] }}
        />
        <Text style={StylesPokemon.title}>
          {pokemon.data.name}
        </Text>
      </View>
      <View style={StylesPokemon.cardStats}>
        <View style={StylesPokemon.tabs}>
          <TouchableOpacity onPress={() => setOption('stats')} style={option === 'stats' && StylesPokemon.borderBtn}>
            <Text style={StylesPokemon.tabBtn}>Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOption('evolutions')}
          style={option === 'evolutions' && StylesPokemon.borderBtn}>
            <Text style={StylesPokemon.tabBtn}>Evolutions</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOption('characteristics')}
          style={option === 'characteristics' && StylesPokemon.borderBtn}>
            <Text style={StylesPokemon.tabBtn}>Characteristics</Text>
          </TouchableOpacity>
        </View>

        {option === 'stats' ? <Stats /> : <></>}
        {option === 'evolutions' ? <Evolutions /> : <></>}
        {option === 'characteristics' ? <Stats /> : <></>}
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pokemon);