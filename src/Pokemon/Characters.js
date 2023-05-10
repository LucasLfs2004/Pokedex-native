import React from 'react';
import * as Progress from 'react-native-progress';
import { ScrollView, Text, View, Image, TextInput, Button, TouchableOpacity, ProgressBarAndroidComponent, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { changePokemon } from '../store/actions/pokemon';
import stylesColorCard from '../mainMenu/styles/ColorStyle';
import stylesBgCard from '../mainMenu/styles/BackgroundColorStyle';
import Feminino from '../assets/icon/feminino.png';
import Masculino from '../assets/icon/masculino.png';

function Characteristics(props) {
  const { pokemon, femalePokemon, malePokemon } = props;
  console.log(femalePokemon.data.pokemon_species_details[0].pokemon_species)

  return (
    <ScrollView style={styles.scroll}>

      <Text style={[styles.title, styles.txtWhite]}>Genders</Text>
      <View style={styles.containerGenders} >
        {femalePokemon.data.pokemon_species_details.map((item, key) => (
          <View key={key}>
            {item.pokemon_species.name === pokemon.data.name ? <Image style={styles.iconGender} key={key} source={require('../assets/icon/feminino.png')} /> :
              <></>}
          </View>
        ))
        }
        {malePokemon.data.pokemon_species_details.map((item, key) => (
          <View key={key}>
            {item.pokemon_species.name === pokemon.data.name ? <Image style={styles.iconGender} key={key} source={require('../assets/icon/masculino.png')} /> :
              <></>}
          </View>
        ))
        }
      </View>
      <Text style={[styles.title, styles.txtWhite]}>Type</Text>
      <View style={styles.containerTypes}>
        {pokemon.data.types.map((item, key) =>
        (
          <View key={key} style={styles.types}>
            <Text style={[styles.p, stylesColorCard[item.type.name]]}>
              {item.type.name}
            </Text>
          </View>
        )
        )}
      </View>

    </ScrollView>
  );
}



function mapStateToProps(state) {
  return {
    pokemon: state.pokemon.pokemon,
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Characteristics);


const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 19.5,
  },
  containerTypes: {
    flexDirection: 'row',
    marginTop: 12
  },
  types: {
    marginRight: 10,
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
  },
  txtWhite: {
    color: '#fff',
  },
  iconGender: {
    width: 16,
    height: 16
  }
});