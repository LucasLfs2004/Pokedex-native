import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function MenuInicial() {

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
    <View >
      <Text>OLAAAAAAAAAA</Text>
    </View >
  );
}