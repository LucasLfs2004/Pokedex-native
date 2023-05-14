import React, { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
import { ScrollView, Text, View, Image, TextInput, Button, TouchableOpacity, ProgressBarAndroidComponent } from 'react-native';
import { connect } from 'react-redux';
import { changePokemon } from '../store/actions/pokemon';
import stylesColorCard from '../mainMenu/styles/ColorStyle';
import stylesBgCard from '../mainMenu/styles/BackgroundColorStyle';
import axios from 'axios';
import seta from "../assets/icon/avance.png"

function Evolutions(props) {
  // useEffect(() => {
  //   getEvolutions()
  // }, [pokemon])


  // const getEvolutions = async () => {
  //   props.changeLastPokemon('');
  //   const evolutions = await axios.get(pokemon.data.species.url)
  //   const query = await axios.get(evolutions.data.evolution_chain.url)
  //   const pokemon1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.data.chain.species.name}/`)
  //   props.changeInitialPokemon(pokemon1);
  //   const pokemon2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.data.chain.evolves_to[0].species.name}/`)
  //   props.changeMiddlePokemon(pokemon2);
  //   if (!(requisition.data.chain.evolves_to[0].evolves_to[0] == undefined)) {
  //     const pokemon3 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.data.chain.evolves_to[0].evolves_to[0].species.name}/`)
  //     props.changeLastPokemon(pokemon3);
  //   }    
  // }

  // const getEvolutionChain = async () => {
  //   const pokemon1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${requisition.data.chain.species.name}/`)
  //   props.changeInitialPokemon(pokemon1);
  //   const pokemon2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${requisition.data.chain.evolves_to[0].species.name}/`)
  //   props.changeMiddlePokemon(pokemon2);
  //   if (!(requisition.data.chain.evolves_to[0].evolves_to[0] == undefined)) {
  //     const pokemon3 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${requisition.data.chain.evolves_to[0].evolves_to[0].species.name}/`)
  //     props.changeLastPokemon(pokemon3);
  //   }
  //   navigateToSecond()
  // }


  // const getSpecies = async () => {
  //   props.changeLastPokemon('');
  //   const evolutions = await axios.get(pokemon.data.species.url)
  //   const query = await axios.get(evolutions.data.evolution_chain.url)
  //   setRequisition(query)
  //   console.log(requisition)
  //   // console.log(requisition.data.chain.evolves_to[0].evolves_to[0] === undefined)
  //   // const pokemon1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${requisition.data.chain.species.name}/`)
  //   // props.changeInitialPokemon(pokemon1);
  //   // const pokemon2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${requisition.data.chain.evolves_to[0].species.name}/`)
  //   // await props.changeMiddlePokemon(pokemon2);
  //   // if (!(requisition.data.chain.evolves_to[0].evolves_to[0] == undefined)) {
  //   //   const pokemon3 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${requisition.data.chain.evolves_to[0].evolves_to[0].species.name}/`)
  //   //   await props.changeLastPokemon(pokemon3);
  //   // }
  //   // navigateToSecond()
  //   getEvolutionChain()
  // }

  const { initialPokemon, middlePokemon, lastPokemon, pokemon } = props;
  console.log(initialPokemon)
  return (
    <ScrollView style={Styles.scroll}>
      <View style={Styles.container}>
        <View style={Styles.containerEvo}>
          <View style={Styles.infosEvo}>
            <Text style={[Styles.name, stylesColorCard[pokemon.data.types[0].type.name]]}>
              {initialPokemon.data.name}
            </Text>

            <View style={Styles.containerTypes}>
              {initialPokemon.data.types.map((item, key) =>
              (
                <View key={key} style={Styles.types}>
                  <Text style={[Styles.p, stylesColorCard[item.type.name]]}>
                    {item.type.name}
                  </Text>
                </View>
              )
              )}
            </View>
          </View>
          <Image
            style={[Styles.evolution, { resizeMode: 'cover' }]}
            source={{ uri: initialPokemon['data']['sprites']['other']['official-artwork']['front_default'] }}
          />
        </View>
        <Image source={seta} style={Styles.setaIcon} />
        <View style={Styles.containerEvo}>
          <View style={Styles.infosEvo}>
            <Text style={[Styles.name, stylesColorCard[pokemon.data.types[0].type.name]]}>{middlePokemon.data.name}</Text>

            <View style={Styles.containerTypes}>
              {middlePokemon.data.types.map((item, key) =>
              (
                <View key={key} style={Styles.types}>
                  <Text style={[Styles.p, stylesColorCard[item.type.name]]}>
                    {item.type.name}
                  </Text>
                </View>
              )
              )}
            </View>
          </View>
          <Image
            style={[Styles.evolution, { resizeMode: 'cover' }]}
            source={{ uri: middlePokemon['data']['sprites']['other']['official-artwork']['front_default'] }}
          />
        </View>
        {lastPokemon !== '' ?
          <>

            <Image source={seta} style={Styles.setaIcon} />
            <View style={Styles.containerEvo}>
              <View style={Styles.infosEvo}>
                <Text style={[Styles.name, stylesColorCard[pokemon.data.types[0].type.name]]}>{lastPokemon.data.name}</Text>

                <View style={Styles.containerTypes}>
                  {lastPokemon.data.types.map((item, key) =>
                  (
                    <View key={key} style={Styles.types}>
                      <Text style={[Styles.p, stylesColorCard[item.type.name]]}>
                        {item.type.name}
                      </Text>
                    </View>
                  )
                  )}
                </View>
              </View>
              <Image
                style={[Styles.evolution, { resizeMode: 'cover' }]}
                source={{ uri: lastPokemon['data']['sprites']['other']['official-artwork']['front_default'] }}
              />
            </View>
          </>
          : <></>}

      </View>
    </ScrollView >
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Evolutions);

import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    marginHorizontal: 30,
    flex: 1,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  columnImg: {
    width: 200,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setaIcon: {
    marginLeft: 208,
    width: 36,
    height: 36,
    transform: [{ rotate: '90deg' }]
  },
  evolution: {
    width: 200,
    height: 200,
  },
  name: {
    marginTop: 30,
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 18,
    textTransform: 'capitalize'
  },
  types: {
    borderRadius: 50,
    width: 100,
    height: 20,
    marginBottom: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(114, 130, 147, 0.31)',
  },
  p: {
    textTransform: 'capitalize',
    fontWeight: 700,
    fontSize: 14,
    textAlign: 'center'
  },
  containerEvo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});