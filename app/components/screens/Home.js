import React, { Component } from 'react';
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
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash'
import { connect } from 'react-redux'
import listingStyles from '../../styles/listing'
import layoutStyles from '../../styles/layout'
import styles from '../../styles/home'
import { setDataFetch } from '../../actions/dataPlat'
import SideBarModal from '../SideBarModal'
import { menuSetVisibility, setUpdateExist } from '../../actions/sidebar'

const barsIcon = (<Icon name="bars" size={30} color="black" />)
const searchIcon = (<Icon name="search" size={20} color="black" style={{alignSelf: 'center'}}/>)

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: null,
      articles: [],
      articles1: [],
      fetch: false,
      search: [],
      update: false
    }
    this.getArticles = this.getArticles.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.searchValidation = this.searchValidation.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }

  componentWillMount() {
    this.checkData()
  }

  componentDidMount() {
    Keyboard.dismiss
    AsyncStorage.getItem('userLogged').then((id)=>{
      id = Number(JSON.parse(id))
      this.checkActiveStatus(id)
    })
    if (this.props.update) {
      this.getArticles()
    } else {
      AsyncStorage.getItem('dataPlat').then((dataPlat)=>{
        let data = JSON.parse(dataPlat)
        if (data && data.length != 0) {
          this.setState({articles: data, articles1: data})
        } else {
          this.getArticles()
        }
      })
    }
  }

  onChangeTextSearch(text) {
    this.setState({
      searchText: text
    })
  }

  async checkActiveStatus(id) {
    try {
      let response = await fetch('https://tokosibuk.com/v1/check_expired.php',{
			method:'POST',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				// we will pass our input data to server
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

  async getArticles() {
    try {
      this.setState({fetch: true})
      let response = await fetch('https://tokosibuk.com/v1/konversi.php', {
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
        AsyncStorage.setItem('dataPlat', JSON.stringify(articles))
        this.setState({articles: articles, articles1: articles, fetch: false})
        this.getDataDate()
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getDataDate() {
    try {
      let response = await fetch('https://tokosibuk.com/v1/date_data.php', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      let responseJson = await response.json()
      if (responseJson.error) {
        console.log(responseJson.error);
      } else {
        let dateData = responseJson.date
        AsyncStorage.setItem('dateData', JSON.stringify(dateData))
        this.props.setUpdateExist(false)
      }
    } catch (error) {
      console.log(error);
    }
  }

  checkData() {
    AsyncStorage.getItem('dataPlat').then((dataPlat)=>{
      let data = JSON.parse(dataPlat)
      this.setState({ articles1: data, articles: data })
    })
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
      plat = article.item.plat
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
    let { showMenu, updateExist } = this.props
    let { search } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.container1}>
        { updateExist && <View style={{backgroundColor: 'red', width: 20, height: 20, borderRadius: 10, position: 'absolute', zIndex: 1, top: -5, left: 20, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>!</Text>
        </View> }
        <TouchableOpacity style={{width:50}} onPress={showMenu}>
          {barsIcon}
        </TouchableOpacity>
          <View style={{width:'70%'}}>
            <TextInput
              style={{backgroundColor:'#ffffff', height:30, paddingLeft: 10, padding: 0, paddingLeft: 10, borderRadius: 12}}
              disableFullscreenUI={true}
              underlineColorAndroid='transparent'
              placeholder='Masukan Plat Nomor Di Sini'
              placeholderTextColor='lightgrey'
              onChangeText={this.onChangeTextSearch.bind(this)}
              value={this.state.searchText ? this.state.searchText.toUpperCase() : null}
              autoCapitalize="characters"
              returnKeyType="search"
              onSubmitEditing={this.searchValidation}/>
          </View>
          <TouchableOpacity onPress={this.searchValidation}>
            <View style={{backgroundColor:'rgb(0, 185, 230)', width: 35, height:35, borderRadius: 17.5, justifyContent: 'center'}}>
              {searchIcon}
            </View>
          </TouchableOpacity>
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
    let { articles1, articles, newest, older } = this.state
    let data = []
    let content = null
    if (this.state.fetch) {
      content = (
        <ActivityIndicator
          animating={true}
          style={{height: 80}}
          size="large" />
      )
    } else {
      content = (
        <FlatList
          data = {data.concat(this.state.articles)}
          keyExtractor = {this.keyExtractor}
          renderItem = {this.renderRow} />
      )
    }
    if (this.state.articles) {
      if (!this.state.fetch && this.state.articles.length == 0) {
        content = (
          <View style={{justifyContent:'center', alignItems:'center', marginTop:30}}>
            <Text style={{fontSize:20}}>Plat Tidak Ditemukan</Text>
          </View>
        )
      }
    }

    return (
      <View>
        <View style={[layoutStyles.body, listingStyles.body]}>
          {this.renderHeader()}
          {content}
        </View>
      </View>
    );
  }
}

let mapStateToProps = (state, props) => {
  return {
    visible: state.sidebarModal.visible,
    updateExist: state.sidebarModal.exist,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    showMenu: () => {
      dispatch(menuSetVisibility(true))
    },
    setUpdateExist: (exist) => {
      dispatch(setUpdateExist(exist))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
