import { StyleSheet } from "react-native";

const stylesCard = StyleSheet.create({ 
  content: {
    width: 390, 
    display: 'flex', 
    flexDirection: 'row', 
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardPokemon: {
    width: 150,
    height: 200,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  name: {
    color: '#fff',
    marginVertical: 11,
  },
  imgCard: {
    width: 90,
    height: 90,
  },
  containerTypes: {
    display: 'flex',
    width: 150,
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  types: {
    backgroundColor: '#72829370',
    color: '#fff',
    borderRadius: 20,
    width: 76,
    height: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
});

export default stylesCard;