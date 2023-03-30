import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#2C3E50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgLogo: {
    display: 'flex',
    width: 32,
    height: 32,
  },
  logo: {
    color: '#fff',
    fontSize: 28,
    padding: 13,
  },
  containerHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 70,
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    width: 230,
    justifyContent: 'space-between',
    backgroundColor: '#D9D9D925',
    marginLeft: 20,
    padding: 10,
    borderRadius: 30,
  },
  searchInput: {
    color: '#FFF',
    width: 160,
  },
  searchIcon: {
    width: 16,
    height: 16,
  },
  p: {
    color: '#fff',
    fontSize: 14,
  }
});

export default styles;
