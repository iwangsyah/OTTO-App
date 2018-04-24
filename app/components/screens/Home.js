import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  WebView,
  Linking,
  Button
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash'

const barsIcon = (<Icon name="bars" size={30} color="black" />)
const searchIcon = (<Icon name="search" size={20} color="black" style={{alignSelf: 'center'}}/>)

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: null,
      articles: [
        {plat: 'B 1111 AAC', name: 'AVANZA', color: 'KUNING'},
        {plat: 'B 2222 FAK', name: 'XENIA', color: 'MERAH'},
        {plat: 'B 3333 SUI', name: 'RUSH', color: 'BIRU'},
        {plat: 'B 4444 UTA', name: 'TERIOS', color: 'MERAH'},
        {plat: 'B 5555 TIA', name: 'PAJERO', color: 'HIJAU'},
        {plat: 'B 6666 BAC', name: 'JAZZ', color: 'SILVER'},
        {plat: 'B 7777 KKK', name: 'FREED', color: 'MERAH'},
        {plat: 'B 8888 CDR', name: 'YARIS', color: 'PUTIH'},
        {plat: 'B 9999 STO', name: 'AYLA', color: 'PUTIH'},
        {plat: 'B 6666 BAC', name: 'JAZZ', color: 'DOFF'},
        {plat: 'B 7777 KKK', name: 'FREED', color: 'HITAM'},
        {plat: 'B 8888 CDR', name: 'YARIS', color: 'HITAM'},
        {plat: 'B 9999 STO', name: 'AYLA', color: 'PUTIH'},
      ],
      fetch: false,
    }
    this.renderRow = this.renderRow.bind(this)
  }

  componentDidMount() {
  }

  onChangeTextSearch(text) {
    this.setState({
      searchText: text
    })
  }

  // async getArticles() {
  //   try {
  //     this.setState({fetch: true})
  //     let api_key = '15410937072241ac91c95a599963e337'
  //     let params = this.state.search
  //     let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json"
  //     let response = await fetch(`${url}?api_key=${api_key}&q=${params}`, {
  //       method: 'GET',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     let responseJson = await response.json()
  //     // console.log('responseJson:', responseJson)
  //     if (responseJson.error) {
  //       console.log(responseJson.error);
  //     } else {
  //       let articles = responseJson
  //       this.setState({articles: articles.response.docs, fetch: false})
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  toDetail(article) {
    Actions.detail({ item: article.item })
  }

  renderRow(article) {
    return (
      <TouchableOpacity onPress={this.toDetail.bind(this, article)}>
        <View style={listingStyles.inspectionRow}>
          <View style={listingStyles.inspectionRowContent}>
            <Text style={listingStyles.inspectionRowInspectionName}>
              {article.item.plat}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderHeader() {
    let { search } = this.state

    return (
      <View style={styles.container}>

        <View style={styles.container1}>
        <TouchableOpacity>
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
              keyboardType='ascii-capable'/>
          </View>
          <TouchableOpacity>
            <View style={{backgroundColor:'rgb(0, 185, 230)', width: 35, height:35, borderRadius: 17.5, justifyContent: 'center'}}>
              {searchIcon}
            </View>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  render() {
    let { articles, newest, older } = this.state

    let data = []
    let content = null
    if (articles.length == 0 || this.state.fetch) {
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#c661e8',
    height: 70,
    padding: 10,
    paddingTop: 20,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const listingStyles = StyleSheet.create({
  body: {
    backgroundColor: '#f3f3f3',
  },
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  inspectionRow: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 2,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  inspectionRowContent: {
    flex: 1
  },
  inspectionRowInspectionName: {
    color: '#107DCB',
    fontSize: 18,
    fontWeight: 'bold'
  },
})

const layoutStyles = StyleSheet.create({
  body: {
    backgroundColor:'white',
    height: '100%',
  },
})
