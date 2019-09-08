import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Keyboard,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  BackHandler
} from 'react-native';

import { 
  CustomTextInput,
  register,
  insertText,
  backSpace,
  uninstall,
  hideKeyboard,
} from 'react-native-custom-keyboard-kit';

import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import _ from 'lodash'
import { connect } from 'react-redux'
import listingStyles from '../../styles/listing'
import layoutStyles from '../../styles/layout'
import styles from '../../styles/home'
import { setDataFetch } from '../../actions/dataPlat'
import SideBarModal from '../SideBarModal'
import { menuSetVisibility } from '../../actions/sidebar'

const barsIcon = (<Icon name="bars" size={30} color="black" />)
const searchIcon = (<Icon name="search" size={20} color="black" style={{alignSelf: 'center'}}/>)
const backspaceIcon = (<IconIonicons name="ios-backspace" size={20} color="black" style={{alignSelf: 'center'}}/>)

const styless = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 185, 230)',
  },
  input: {
    backgroundColor:'#ffffff', 
    height:30, 
    paddingLeft: 10, 
    padding: 0, 
    paddingLeft: 10, 
    borderRadius: 12
  },
  buttonLabel: {
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    padding: 5,
    textAlign: "center",
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    color: '#ffffff'
  },
  button: {
    width: "15%",
    backgroundColor: 'rgb(0, 185, 230)',
    margin: 4
  },
  buttonQwerty: {
    width: 33,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    padding: 5,
    backgroundColor: '#ffffff',
    margin: 1
  },
  buttonLabelQwerty: {
    textAlign: "center",
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    color: '#000000'
  },
});

class MyKeyboard extends Component {
  constructor(props) {
  super(props);
    this.onPressButton - this.onPressButton.bind(this)
  }

  onPressButton = (text) => {
    insertText(this.props.tag, text);
  }
  
  onPressBackSpace = () => {
    backSpace(this.props.tag);
  }
  
  onPressHideKeyboard = () => {
    hideKeyboard(this.props.tag);
  }

  render() {
    return (
      <View style={{backgroundColor: '#c661e8', justifyContent: 'center', alignItems: 'center', paddingBottom: 5}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5}}>
          <TouchableOpacity onPress={this.onPressBackSpace} style={[styless.button, {backgroundColor: 'rgb(0, 185, 230)', padding: 5, left: 10}]}>
            {backspaceIcon}
          </TouchableOpacity>
          <View style={{width: '75%', alignItems: 'center'}}>
            <View style={{flexDirection: "row"}}>
              <View style={styless.button}>
                <TouchableOpacity onPress={this.onPressButton.bind(this, '1')}>
                  <Text style={styless.buttonLabel}>
                    1
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styless.button}>
                <TouchableOpacity onPress={this.onPressButton.bind(this, '2')}>
                  <Text style={styless.buttonLabel}>
                    2
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styless.button}>
                <TouchableOpacity onPress={this.onPressButton.bind(this, '3')}>
                  <Text style={styless.buttonLabel}>
                    3
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styless.button}>
                <TouchableOpacity onPress={this.onPressButton.bind(this, '4')}>
                  <Text style={styless.buttonLabel}>
                    4
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styless.button}>
                <TouchableOpacity onPress={this.onPressButton.bind(this, '5')}>
                  <Text style={styless.buttonLabel}>
                    5
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flexDirection: "row"}}>
              <View style={styless.button}>
                <TouchableOpacity onPress={this.onPressButton.bind(this, '6')}>
                  <Text style={styless.buttonLabel}>
                    6
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styless.button}>
                <TouchableOpacity onPress={this.onPressButton.bind(this, '7')}>
                  <Text style={styless.buttonLabel}>
                    7
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styless.button}>
                <TouchableOpacity onPress={this.onPressButton.bind(this, '8')}>
                  <Text style={styless.buttonLabel}>
                    8
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styless.button}>
                <TouchableOpacity onPress={this.onPressButton.bind(this, '9')}>
                  <Text style={styless.buttonLabel}>
                    9
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styless.button}>
                <TouchableOpacity onPress={this.onPressButton.bind(this, '0')}>
                  <Text style={styless.buttonLabel}>
                    0
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={this.onPressBackSpace} style={[styless.button, {backgroundColor: 'rgb(0, 185, 230)', padding: 5, right: 10}]}>
            {backspaceIcon}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: "row"}}>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'Q')}>
              <Text style={styless.buttonLabelQwerty}>
                Q
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'W')}>
              <Text style={styless.buttonLabelQwerty}>
                W
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'E')}>
              <Text style={styless.buttonLabelQwerty}>
                E
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'R')}>
              <Text style={styless.buttonLabelQwerty}>
                R
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'T')}>
              <Text style={styless.buttonLabelQwerty}>
                T
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'Y')}>
              <Text style={styless.buttonLabelQwerty}>
                Y
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'U')}>
              <Text style={styless.buttonLabelQwerty}>
                U
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'I')}>
              <Text style={styless.buttonLabelQwerty}>
                I
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'O')}>
              <Text style={styless.buttonLabelQwerty}>
                O
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'P')}>
              <Text style={styless.buttonLabelQwerty}>
                P
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flexDirection: "row"}}>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'A')}>
              <Text style={styless.buttonLabelQwerty}>
                A
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'S')}>
              <Text style={styless.buttonLabelQwerty}>
                S
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'D')}>
              <Text style={styless.buttonLabelQwerty}>
                D
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'F')}>
              <Text style={styless.buttonLabelQwerty}>
                F
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'G')}>
              <Text style={styless.buttonLabelQwerty}>
                G
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'H')}>
              <Text style={styless.buttonLabelQwerty}>
                H
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'J')}>
              <Text style={styless.buttonLabelQwerty}>
                J
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'K')}>
              <Text style={styless.buttonLabelQwerty}>
                K
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'L')}>
              <Text style={styless.buttonLabelQwerty}>
                L
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flexDirection: "row"}}>
          <View style={[styless.buttonQwerty, {backgroundColor: 'rgb(0, 185, 230)', width: 45, marginRight: 10}]}>
            <TouchableOpacity onPress={this.onPressHideKeyboard}>
              <Text style={styless.buttonLabelQwerty}>
                &#x25bc;
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'Z')}>
              <Text style={styless.buttonLabelQwerty}>
                Z
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'X')}>
              <Text style={styless.buttonLabelQwerty}>
                X
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'C')}>
              <Text style={styless.buttonLabelQwerty}>
                C
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'V')}>
              <Text style={styless.buttonLabelQwerty}>
                V
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'B')}>
              <Text style={styless.buttonLabelQwerty}>
                B
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'N')}>
              <Text style={styless.buttonLabelQwerty}>
                N
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styless.buttonQwerty}>
            <TouchableOpacity onPress={this.onPressButton.bind(this, 'M')}>
              <Text style={styless.buttonLabelQwerty}>
                M
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styless.buttonQwerty, {backgroundColor: 'rgb(0, 185, 230)', width: 45, marginLeft: 10}]}>
            <TouchableOpacity onPress={this.onPressHideKeyboard}>
              <Text style={styless.buttonLabelQwerty}>
                &#x25bc;
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

register('price', () => MyKeyboard);

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: null,
      articles: [],
      articles1: [],
      fetch: false,
      search: [],
      update: false,
      status: false,
      keyboardShow: true
    }
    this.getArticles = this.getArticles.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.searchValidation = this.searchValidation.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.handleBackButton = this.handleBackButton.bind(this)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    if (['home', 'login'].includes(_.last(Actions.state.routes).routeName)) {
      BackHandler.exitApp()
      return false
    }
    Actions.pop()
    return true
}

  componentWillMount() {
    this.checkData()
    this.checkConnection()
  }

  async componentDidMount() {
    Keyboard.dismiss
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    AsyncStorage.getItem('userLogged').then((id)=>{
      id = Number(JSON.parse(id))
      this.checkActiveStatus(id)
    })
    
    if (this.props.update) {
      this.getArticles()
    } else {
      this.checkData()
    }
  }

  async checkConnection() {
    let status = null
    try {
      const res = await fetch('https://tokosibuk.com/');
      if (res.status === 200) {
        status = true;
        this.setState({ status: true })
      }
    } catch (e) {
      this.setState({ status: false })
      status = false;
    }
    return status
  }
  
  async checkData() {
    let dataPlatJson = await AsyncStorage.getItem('dataPlat')
    let dataPlat = JSON.parse(dataPlatJson)
    console.log('dataPlat: ', dataPlat);
    
    if (dataPlat) {
      this.setState({ articles1: dataPlat, articles: dataPlat })
      this.getArticles(true)
    } else {
      this.getArticles()
    }
  }

  onChangeTextSearch(search) {
    // this.setState({
    //   searchText: search
    // })
    // console.log('searchd: ', search);
    
    // const filterPlat = _.filter(this.state.articles1, item =>
    //   item.plat.includes(search)
    // );
    // console.log('fil: ', filterPlat);
    
    // this.setState({ articles: filterPlat });
  }

  async searchPlatAPI(plat) {
    try {
      let response = await fetch('http://tokosibuk.com/v1/search.php',{
      method:'POST',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        "Police_No":plat
      })

    })
      let responseJson = await response.json()
      if (responseJson.error) {
        console.log(responseJson.error);
        alert('Terjadi kesalahan koneksi ke server')
      } else {
        this.setState({ articles: responseJson})
      }
    } catch (error) {
      const filterPlat = _.filter(this.state.articles1, item => {
          if (item.plat) {
            item.plat.includes(search)
          } else {
            item.Police_No.includes(search)
          } 
        }
      );
      
      this.setState({ articles: filterPlat})
      console.log(error);
    }
  }

  async checkActiveStatus(id) {
    try {
      let response = await fetch('http://tokosibuk.com/v1/check_expired.php',{
      method:'POST',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        "id":id
      })

    })
      let responseJson = await response.json()
      if (responseJson.error) {
        console.log(responseJson.error);
        alert('Terjadi kesalahan koneksi ke server')
      } else {
        if (responseJson == "Tidak Aktif") {
          alert('Akun anda sudah tidak aktif')
          AsyncStorage.setItem('logged', JSON.stringify("LoggedOut"))
          AsyncStorage.setItem('userLogged', JSON.stringify(null))
          Actions.login()
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getArticles(status) {
    try {
      if (!status) {
        this.setState({fetch: true})
      }
      let response = await fetch('http://tokosibuk.com/v1/konversi.php', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      let responseJson = await response.json()
      if (responseJson.error) {
        console.log(responseJson.error);
        alert('Terjadi kesalahan saat koneksi ke server')
      } else {
        let articles = responseJson
        console.log('articles: ', articles);
        
        articlesSave = articles.slice(0, 1000)
        await AsyncStorage.setItem('dataPlat', JSON.stringify(articlesSave))
        this.setState({articles: articles, articles1: articles, fetch: false})
      }
    } catch (error) {
      console.log(error);
    }
  }

  toDetail(article) {
    Actions.detail({ item: article.item })
  }

  searchValidation() {
    let { searchText } = this.state
    if (searchText && searchText.length > 1) {
      this.onSearch()
    } else {
      alert('Kata kunci harus lebih dari satu karakter')
    }
  }

  onSearch() {
    let { searchText, articles, articles1 } = this.state
    let platS = _.map(this.state.articles1, 'plat');
    let filter = new RegExp(searchText, "i")
    let filterPlat = _.filter(platS, function(i) { return i.match(filter); });
    let search = []
    let a = articles1.map((item) => {
      _.forEach(filterPlat, function(value) {
        if (value == item.plat) {
          search.push(item)
        }
      });
    })
    if (!searchText) {
      this.setState({
        articles: articles1
      })
    } else {
      this.setState({
        articles: search
      })
    }
  }

  

  renderRow(article) {
    let plat = null
    if (article.item) {
      plat = article.item.plat || article.item.Police_No
    }
    return (
      <TouchableOpacity onPress={this.toDetail.bind(this, article)}>
        <View style={listingStyles.inspectionRow}>
          <View style={listingStyles.inspectionRowContent}>
            <Text style={listingStyles.inspectionRowInspectionName}>
              {plat}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderHeader() {
  let { showMenu } = this.props
    let { search } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.container1}>
        <TouchableOpacity style={{width:50}} onPress={showMenu}>
          {barsIcon}
        </TouchableOpacity>
          <View style={{width:'80%'}}>
            <CustomTextInput
              autoFocus={true}
              customKeyboardType="price"
              value={this.state.searchText}
              disableFullscreenUI={true}
              autoCapitalize="characters"
              placeholderTextColor='lightgrey'
              underlineColorAndroid='transparent'
              placeholder='Masukan Plat Nomor Di Sini'
              onChangeText={this.onChangeText.bind(this)}
              style={{backgroundColor:'#ffffff', height:30, paddingLeft: 10, padding: 0, paddingLeft: 10, borderRadius: 12}}
              onFocus={() =>console.log("focus received" ) }
              onBlur={() => console.log("focus lost") }
            />
            {/* <TextInput
              style={{backgroundColor:'#ffffff', height:30, paddingLeft: 10, padding: 0, paddingLeft: 10, borderRadius: 12}}
              disableFullscreenUI={true}
              underlineColorAndroid='transparent'
              placeholder='Masukan Plat Nomor Di Sini'
              placeholderTextColor='lightgrey'
              onChangeText={this.onChangeTextSearch.bind(this)}
              value={this.state.searchText ? this.state.searchText.toUpperCase() : null}
              autoCapitalize="characters"
              keyboardType='web-search'
              returnKeyType="search"
              onSubmitEditing={this.searchValidation}/> */}
          </View>
          {/* <TouchableOpacity onPress={this.searchValidation}>
            <View style={{backgroundColor:'rgb(0, 185, 230)', width: 35, height:35, borderRadius: 17.5, justifyContent: 'center'}}>
              {searchIcon}
            </View>
          </TouchableOpacity> */}
        </View>
        <SideBarModal/>
      </View>
    )
  }

keyExtractor(data) {
  if (data) {
    return data.no
  }
}

  render() {
    let { articles1, articles, searchText, older } = this.state
    let data = []
    let content = null
    if (this.state.fetch) {
      console.log(1);
      
      content = (
        <ActivityIndicator
          animating={true}
          style={{height: 80}}
          size="large" />
      )
    } else {   
      content = (
        <FlatList
          data = {data.concat(articles)}
          keyExtractor = {this.keyExtractor}
          renderItem = {this.renderRow}
          initialNumToRender = {20} />
      )
    }
    if (this.state.articles && searchText) {
      if (!this.state.fetch && this.state.articles.length == 0) {
        content = (
          <View style={{justifyContent:'center', alignItems:'center', marginTop:30}}>
            <Text style={{fontSize:20}}>Plat Tidak Ditemukan</Text>
          </View>
        )
      }
    }
    
    return (
      <View style={[layoutStyles.body, listingStyles.body]}>
        {this.renderHeader()}
        {content}
      </View>
    );
  }

  onChangeText(search) {
    this.setState({ searchText: search })
    if (this.state.status) {
      this.searchPlatAPI(search) 
    } else {
      const filterPlat = _.filter(this.state.articles1, item => {
          if (item.plat) {
            item.plat.includes(search)
          } else {
            item.Police_No.includes(search)
          } 
        }
      );
      this.setState({ articles: filterPlat})
    }
  }
}

let mapStateToProps = (state, props) => {
  return {
    visible: state.sidebarModal.visible,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    showMenu: () => {
      dispatch(menuSetVisibility(true))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
