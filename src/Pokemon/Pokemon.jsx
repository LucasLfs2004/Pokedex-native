import React from 'react';
import * as Progress from 'react-native-progress';
import { ScrollView, Text, View, Image, TextInput, Button, TouchableOpacity, ProgressBarAndroidComponent } from 'react-native';
import { connect } from 'react-redux';
import { changePokemon } from '../store/actions/pokemon';
import StylesPokemon from './PokemonStyle';
import stylesColorCard from '../mainMenu/styles/ColorStyle';
import stylesBgCard from '../mainMenu/styles/BackgroundColorStyle';

function Pokemon(props) {
  const { pokemon } = props;

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
          <TouchableOpacity>
            <Text style={StylesPokemon.tabBtn}>Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={StylesPokemon.tabBtn}>Evolutions</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={StylesPokemon.tabBtn}>Caracteristics</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={StylesPokemon.scroll}>
          <View style={StylesPokemon.container}>
            {
              pokemon.data.stats.map((item, key) => (
                <View key={key} style={StylesPokemon.containerStats}>
                  <View style={StylesPokemon.bgStats} >
                    <Text style={[StylesPokemon.statsAtt, stylesColorCard[pokemon.data.types[0].type.name]]} >
                      {item.stat.name}
                    </Text>
                  </View>
                  <View style={StylesPokemon.displayPower}>
                    <Progress.Bar
                      style={StylesPokemon.progressBar}
                      progress={(parseInt(item.base_stat) / 160)}
                      width={150}
                      height={9}
                      borderWidth={0}
                      color={'#76FF03'}
                      unfilledColor={'#72829330'}
                    />
                    <Text style={StylesPokemon.numberStats}>{parseInt(parseInt(item.base_stat) / 1.6)}/100</Text>
                  </View>
                </View>
              ))
            }
          </View>
        </ScrollView>
      </View>
    </View >
  );
}



function mapStateToProps(state) {
  return {
    pokemon: state.pokemon.pokemon,
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