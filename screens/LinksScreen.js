import React from 'react';
import { StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  RefreshControl,
  Animated,
  Easing } from 'react-native';

var AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const HEADER_MAX_HEIGHT= 100;
const HEADER_MIN_HEIGHT= 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
import {WebBrowser} from 'expo';

export default class LinksScreen  extends  React.Component {
  send(url){
    console.log('tikladi');
    WebBrowser.openBrowserAsync(url)
  }
  render(){
  return (
    <ScrollView style={styles.container}>
         <Image source={{uri:this.props.navigation.getParam('image')}} style={{width:'100%',height:200}} />
         <Text style={{textAlign:'center',fontSize:18,color:'#474747', padding:15}}>{this.props.navigation.getParam('title').toUpperCase()}</Text>
         <Text style={{textAlign:'center',fontSize:16,color:'#474747', padding:15}}>{this.props.navigation.getParam('description')}</Text>
         <Text style={{textAlign:'center',fontSize:16,color:'#474747', padding:15}}>{this.props.navigation.getParam('content')} </Text>
         <Text style={{color:'#1B7F9C'}} onPress={()=>this.send(this.props.navigation.getParam('url'))} >Devamini oku..</Text>
         <Text style={{textAlign:'right',fontSize:16,color:'#474747',}}>{this.props.navigation.getParam('zaman')}</Text>
    </ScrollView>
  );
}
}

LinksScreen.navigationOptions = ({navigation}) => ({
   title:navigation.getParam('baslik'),
   headerTitleStyle:{
     color:'#474747'
   },
   
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
   
  },
});