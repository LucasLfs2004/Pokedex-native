import { StyleSheet } from "react-native";

const StylesPokemon = StyleSheet.create({ 
  content: {
    flex: 1
  },
  img: {
    width: 200,
    height: 200,
  },
  contentImg:{
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
});

export default StylesPokemon;