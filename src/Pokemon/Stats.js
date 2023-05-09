import React from 'react';
import * as Progress from 'react-native-progress';
import { ScrollView, Text, View, Image, TextInput, Button, TouchableOpacity, ProgressBarAndroidComponent, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { changePokemon } from '../store/actions/pokemon';
import stylesColorCard from '../mainMenu/styles/ColorStyle';
import stylesBgCard from '../mainMenu/styles/BackgroundColorStyle';

function Stats(props) {
  const { pokemon } = props;

  return (
    <ScrollView style={StylesPokemon.scroll}>
      <View style={StylesPokemon.container}>
        {
          pokemon.data.stats.map((item, key) => (
            <View key={key} style={StylesPokemon.containerStats}>
              <View style={StylesPokemon.bgStats} >
                <Text style={[StylesPokemon.statsAtt, stylesColorCard[pokemon.data.types[0].type.name]]} >
                  {item.stat.name === 'hp' && 'HP'}
                  {item.stat.name === 'attack' && 'Attack'}
                  {item.stat.name === 'defense' && 'Defense'}
                  {item.stat.name === 'special-attack' && 'Attack Esp.'}
                  {item.stat.name === 'special-defense' && 'Defense Esp.'}
                  {item.stat.name === 'speed' && 'Speed'}
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
)(Stats);

const StylesPokemon = StyleSheet.create({ 
  scroll: {
    flex: 1,
  },
  container: {
    marginHorizontal: 30,
    flex: 1,
    height: 300,
    marginTop: 10,
    display:'flex',
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
    marginVertical:15,
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 130,
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
});