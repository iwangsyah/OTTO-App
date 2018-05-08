import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 38,
    fontFamily: 'sans-serif-medium',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    fontWeight: 'bold',
    fontStyle: 'italic',
    backgroundColor: 'transparent',
  },
  textInputContainer: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 1.5,
    borderColor: '#ffffff',
    marginTop: 10
  },
  textInput: {
    top: 10,
    marginLeft: 20,
    width: '80%',
    color: '#ffffff'
  },
  buttonLogin: {
    marginTop:30,
    padding: 10,
    backgroundColor:'#ffffff',
    width: '100%',
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 20
  },
  textLogin: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#841584'
  }
});
