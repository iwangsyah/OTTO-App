import { StyleSheet } from 'react-native'
export default StyleSheet.create({
  menuModal: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    padding: 0,
    margin: 0,
  },
  menuModalContainer: {
    width: '75%',
    height: '100%',
    paddingTop: 40,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: 'rgba(203, 224, 229, 0.9)',
  },
  menuModalItem: {
    color: '#000000',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft:20
  },
  titleContainer: {
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor:'rgba(160, 155, 149, 0.4)'
  }
})
