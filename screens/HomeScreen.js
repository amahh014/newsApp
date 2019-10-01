import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  RefreshControl,
  Animated,
  Easing
} from 'react-native';
import {WebBrowser} from 'expo';
import { SearchBar } from 'react-native-elements';
var AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const HEADER_MAX_HEIGHT= 100;
const HEADER_MIN_HEIGHT= 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class HomeScreen extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  constructor(props){
    super(props);
    this.state={
      spor:[],
      yukleniyor:true,
      refreshing: false,
      goster: false,
      gosterim: 'sports',
      scrollY: new Animated.Value(0),
      opacity: new Animated.Value(1)
    }
  }
  arama(){
    this.setState({goster:true})
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
  


  fetch('https://newsapi.org/v2/top-headlines?country=tr&category='+this.state.gosterim+'&apiKey=8dcb70509d03475a9a1d5611b9e52398')
  .then((response) => response.json())
  .then((responseJson) => {
    var dizi=[];
    for(var i=0; i<=Object.keys(responseJson.articles).length-1;i++){
      dizi.push(responseJson.articles[i]);
    }
    this.setState({spor:dizi, refreshing:false});
  })
  .catch((error) =>  {
    console.error(error);
  });
}

   
   componentDidMount = async () => {
     const { navigation } = this.props
     navigation.setParams({
        goster: this.state.goster,
            arama: this.arama,
     })
     fetch('https://newsapi.org/v2/top-headlines?country=tr&category='+this.state.gosterim+'&apiKey=8dcb70509d03475a9a1d5611b9e52398')
     .then((response) => response.json())
     .then((responseJson) => {
       var dizi=[];
       for(var i=0; i<=Object.keys(responseJson.articles).length-1;i++){
         dizi.push(responseJson.articles[i]);
       }
       this.setState({spor:dizi,yukleniyor:false});
     })
     .catch((error) => {
       console.error(error);
     });
   };

   zaman(key){
     const zaman=this.state.spor[key].publishedAt;
     var yenizaman = zaman.replace('T', '');
     var yepyenizaman = yenizaman.replace('Z', '')
     return yepyenizaman;
   }
      
      spor(){
        this.setState({yukleniyor:true,spor:[],gosterim:'sports'})
          fetch('https://newsapi.org/v2/top-headlines?country=tr&category=sports&apiKey=8dcb70509d03475a9a1d5611b9e52398')
          .then((response) => response.json())
          .then((responseJson) => {
            var dizi=[];
            for(var i=0; i<=Object.keys(responseJson.articles).length-1;i++){
              dizi.push(responseJson.articles[i]);

            }
            this.setState({spor:dizi,yukleniyor:false});

          })
          .catch((error) => {
            console.error(error);
          });
            
      }
      bilim(){
        this.setState({yukleniyor:true,spor:[],gosterim:'science'})

        fetch('https://newsapi.org/v2/top-headlines?country=tr&category=science&apiKey=8dcb70509d03475a9a1d5611b9e52398')
        .then((response) => response.json())
        .then((responseJson) => {
          var dizi=[];
            for(var i=0; i<=Object.keys(responseJson.articles).length-1;i++){
              dizi.push(responseJson.articles[i]);
            }

            this.setState({spor:dizi,yukleniyor:false});
        })
        .catch((error) => {
          console.error(error);
        });
      }
      teknoloji(){
        this.setState({yukleniyor:true,spor:[],gosterim:'technology'})

        fetch('https://newsapi.org/v2/top-headlines?country=tr&category=technology&apiKey=8dcb70509d03475a9a1d5611b9e52398')
        .then((response) => response.json())
        .then((responseJson) => {
          var dizi=[];
            for(var i=0; i<=Object.keys(responseJson.articles).length-1;i++){
              dizi.push(responseJson.articles[i]);
            }

            this.setState({spor:dizi,yukleniyor:false});
        })
        .catch((error) => {
          console.error(error);
        });
      }
      eglence(){
        this.setState({yukleniyor:true,spor:[],gosterim:'entertainment'})

        fetch('https://newsapi.org/v2/top-headlines?country=tr&category=entertainment&apiKey=8dcb70509d03475a9a1d5611b9e52398')
        .then((response) => response.json())
        .then((responseJson) => {
          var dizi=[];
            for(var i=0; i<=Object.keys(responseJson.articles).length-1;i++){
              dizi.push(responseJson.articles[i]);
            }

            this.setState({spor:dizi,yukleniyor:false});
        })
        .catch((error) => {
          console.error(error);
        });
      }

      saglik(){
        this.setState({yukleniyor:true,spor:[],gosterim:'health'})

        fetch('https://newsapi.org/v2/top-headlines?country=tr&category=health&apiKey=8dcb70509d03475a9a1d5611b9e52398')
        .then((response) => response.json())
        .then((responseJson) => {
          var dizi=[];
            for(var i=0; i<=Object.keys(responseJson.articles).length-1;i++){
              dizi.push(responseJson.articles[i]);
            }

            this.setState({spor:dizi,yukleniyor:false});
        })
        .catch((error) => {
          console.error(error);
        });
      }


      takeAction(){
        Animated.timing(this.state,animasyonHeight,{
          toValue:this.state.animasyonHeight-5
        }).start()
      }

  render() {
    const { search } = this.state;
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT,HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });
    const headerOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [1,0],
      extrapolate: 'clamp'
    });
    const lapsList = this.state.spor.map((data,i) => {
      return (
        <TouchableOpacity style={styles.kutu} key={i}  onPress={() => this.props.navigation.navigate('Links',{image:data.urlToImage,title:data.title,zaman:this.zaman(i),description:data.description,content:data.content,url:data.url,baslik:data.author} )}>
            <Image source={{uri:data.urlToImage}} style={{width:'100%',height:150}}/>
            <Text style={{textAlign:'center',fontSize:16,color:'#474747', padding:15}}>{data.title}</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <View style={{flexDirection:'row',alignItems:'center',position:'absolute',right:10}}>
                <Text style={{textAlign:'center',fontSize:11,color:'#474747', padding:15}}>{this.zaman(i)}</Text>
            </View>

            </View>
        </TouchableOpacity>
      )
    })
  return (
    <View>
    <Animated.View style={{height:headerHeight,flexDirection:'row',alignItems: 'center', justifyContent:'center', opacity:headerOpacity}}>
         <TouchableOpacity onPress={() =>this.spor()} style={{flexDirection:'column', alignItems:'center', padding: 5}}>
            <Image source={{uri: 'http://ichef.bbci.co.uk/images/ic/480xn/p06jb0m6.jpg' }} style={styles.kategoriebi}/>
            <Text>სპორტი</Text>
         </TouchableOpacity>

         <TouchableOpacity onPress={() =>this.bilim()} style={{flexDirection:'column', alignItems:'center', padding: 5}}>
            <Image source={{uri: 'https://pbs.twimg.com/profile_images/838685007510110208/GSLaP6-U.jpg' }} style={styles.kategoriebi}/>
            <Text>მეცნიერება</Text>
         </TouchableOpacity>

         <TouchableOpacity onPress={() =>this.eglence()} style={{flexDirection:'column', alignItems:'center', padding: 5}}>
            <Image source={{uri: 'http://hellobuddy.org/wp-content/uploads/2018/12/shutterstock_449136610-1080x675.jpg' }} style={styles.kategoriebi}/>
            <Text>გართობა</Text>
         </TouchableOpacity>

         <TouchableOpacity onPress={() =>this.teknoloji()} style={{flexDirection:'column', alignItems:'center', padding: 5}}>
            <Image source={{uri: 'https://forwardthinkingpt.com/wp-content/uploads/2018/11/Physiofusion-1024x819-2-950x760.jpg' }} style={styles.kategoriebi}/>
            <Text>ტექნიკა</Text>
         </TouchableOpacity>
        
         <TouchableOpacity onPress={() =>this.saglik()} style={{flexDirection:'column', alignItems:'center', padding: 5}}>
            <Image source={{uri: 'https://hhp-blog.s3.amazonaws.com/2018/02/iStock-639896942.jpg' }} style={styles.kategoriebi}/>
            <Text>ჯანმრთ</Text>
         </TouchableOpacity>

    </Animated.View>


    <ScrollView  contentContainerStyle={{justifyContent: "center", alignItems: 'center'}} refreshControl={
      <RefreshControl
         refreshing={this.state.refreshing}
         onRefresh={this._onRefresh}/>
    } 
    scrollEventThrottle={16}
    onScroll={Animated.event(
      [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
    )}
    >
      {this.state.yukleniyor ? <ActivityIndicator/>: lapsList}
      <View style={{height:120}}></View>

      <SearchBar
  placeholder="Type Here..."
  onChangeText={this.updateSearch}
  value={search}
/>
    </ScrollView>
    </View>
  );

}}

HomeScreen.navigationOptions = ({navigation}) =>  ({
  title: "News Georgia",
  headerTitleStyle:{
     color:'#474747'
  },

})

const styles = StyleSheet.create({
  kutu: {
    width: '90%',
    height: 300,
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: '#EAEAEA',
    borderWidth: 1,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    
    elevation: 3,
  },
  kategoriebi: {
    width: 50,
    height: 50,
    borderRadius: 25,
  }
});
