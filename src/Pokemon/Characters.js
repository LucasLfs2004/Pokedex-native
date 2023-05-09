import React from 'react';
import * as Progress from 'react-native-progress';
import { ScrollView, Text, View, Image, TextInput, Button, TouchableOpacity, ProgressBarAndroidComponent, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { changePokemon } from '../store/actions/pokemon';
import stylesColorCard from '../mainMenu/styles/ColorStyle';
import stylesBgCard from '../mainMenu/styles/BackgroundColorStyle';

function Characteristics(props) {
  const { pokemon } = props;

  return (
    <ScrollView style={styles.scroll}>
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
        <Text style={[styles.title, styles.txtWhite]}>Weakness</Text>
      
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
  }
});