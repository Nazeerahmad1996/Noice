import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, CardItem, Body, Item, Input, Text, Left, Button, Right } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import PostModel from '../Models/Post'
import PostController from '../Controller/PostController'

//Main Home page
export default class HomeScreen extends React.Component {

  constructor() {
    super();
    //Model Object
    this.postModel = new PostModel();

    //states declared
    this.state = {
      height: 0,
      LoadData: [],
      Description: '',
      Loading: true,
      Data: '',
      userName: '',
      uid: '',
      email: '',
      CountOfLikes: 0
    }
  }

  async componentDidMount() {
    var that = this
    this.setState({ Loading: true })

    //get jobs from database
    firebase
      .database()
      .ref('Job')
      .on("value", snapshot => {
        const data = snapshot.val()
        if (snapshot.val()) {
          var getPost = [];
          Object
            .keys(data)
            .forEach(message => {

              // post object and push data into it
              var post = new PostModel();
              post.Description = data[message].Description;
              post.Name = data[message].Name;
              post.User = data[message].User;
              post.Email = data[message].Email;
              post.LikeCount = data[message].LikeCount;
              post.Node = data[message].Node;

              //push object into array
              getPost.push(post);

            })

          //reversed the array
          var reversed1 = getPost.reverse()

          //Call funtion from the controller and set array
          PostController.setListPost(reversed1);
        }
        this.setState({ Loading: false })
      });

    //getting user data from database
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.database().ref('users').child(firebase.auth().currentUser.uid).once('value').then(function (snapshot) {
          that.setState({ userName: snapshot.val() && snapshot.val().Name });
        });
        this.setState({ email: user.email })
        this.setState({ uid: user.uid })
      }
    })
  }

  //Get Name from the post and pick the first character and convert to uppercase and return it
  Capitalize(str) {
    if (str != '' || str != null) {
      return String(str).charAt(0).toUpperCase();
    }
    else return null;

  }

  //Render Row for Flatlist
  renderRow = ({ item, index }) => {
    var user = firebase.auth().currentUser.uid;
    return (
      <View style={{ margin: 5, marginVertical: 5 }}>
        <Card>
          <CardItem>
            <Left>
              <LinearGradient colors={gradients[(index % gradients.length)]}
                style={{ backgroundColor: "white", width: 50, height: 50, borderRadius: 25, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: '600', color: '#fff', marginRight: 10 }}>{this.Capitalize(item.Name)}</Text>
              </LinearGradient>
              <Body>
                <Text>{item.Name}</Text>
                <Text note style={{ fontSize: 8 }}>{item.Email}</Text>
              </Body>
            </Left>
            <Right>
              {item.User === user ? (
                <TouchableOpacity
                  onPress={() => {
                    this.DeletePost(item)
                  }}>
                  <MaterialCommunityIcons name="delete-outline" style={{}} size={24} color="#fbb040" />
                </TouchableOpacity>

              ) : (
                  null
                )}

            </Right>
          </CardItem>
          <CardItem>
            <Text note>
              {item.Description}
            </Text>
          </CardItem>

          <LinearGradient colors={gradients[(index % gradients.length)]}
            style={{ opacity: 0.8, backgroundColor: "white", width: '100%' }}>
            <CardItem>
              <Left>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={{ padding: 5 }} onPress={() => this.Like(item)}>
                    <Ionicons name="ios-heart" style={{}} size={24} color="#fbb040" />
                  </TouchableOpacity>
                  <Text note>{item.LikeCount}</Text>
                </View>
              </Left>
              <Right>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }} onPress={() => this.PostDetails(item)}>
                    <FontAwesome name="comment-o" style={{ marginLeft: 10 }} size={24} color="#fbb040" />
                  </TouchableOpacity>
                </View>
              </Right>
            </CardItem>
          </LinearGradient>
        </Card>
      </View>

    )
  }

  //Go to Detail Page
  PostDetails(item) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'PostDetailsScreen',
      params: { item }
    });
    this.props.navigation.dispatch(navigateAction);
  }

  //Signout funtion
  SignOut = () => {
    firebase.auth().signOut()
      .then(() => {
        this.props.navigation.navigate('Auth');
      })
      .catch(error => {

      })
  }

  //When Upload Job this funtion called;
  UploadJob = () => {
    this.setState({ Loading: true })
    var user = firebase.auth().currentUser.uid;


    this.postModel.Description = this.state.Description;
    this.postModel.Name = this.state.userName;
    this.postModel.User = this.state.uid;
    this.postModel.Email = this.state.email;

    console.log(this.postModel)
    setTimeout(() => {
      var UserEmail = firebase.auth().currentUser.email;
      var nodeName = 'Job';
      if (this.state.Description != null) {

        var newPostRef = firebase.database().ref(nodeName).push(this.postModel).then((data) => {
          this.setState({ Loading: false })
          Alert.alert(
            'Upload Successfully'
          )
          var Key = data.key
          firebase.database().ref(nodeName).child(Key).update({
            Node: Key
          })

        }).catch((error) => {
          //error callback
          this.setState({ Loading: false })
          Alert.alert(
            'Upload Not Successfully' + error
          )
        });

      }

      else {
        setLoading(false)
        Alert.alert("Please Fill The Form Proper.")
      }
    }, 2000);
  }

  //delete post function
  DeletePost = async (item) => {
    var userId = firebase.auth().currentUser.uid;
    await firebase.database().ref('Job').child(item.Node).remove(function (error) {
      if (!error) {
        Alert.alert("Deleted")
      }
      else if (error) {
        Alert.alert(error);
      }
    })
  }

  //Like funtion
  Like = async (item) => {
    var user = firebase.auth().currentUser.uid;
    var count;
    var newPostRef = await firebase.database().ref('Job').child(item.Node).child("Likes/" + user).set({
      uid: user,
      Name: this.state.userName
    }).then((data) => {

      firebase
        .database()
        .ref('Job').child(item.Node).child("Likes")
        .once("value", snapshot => {
          count = snapshot.numChildren();
          firebase.database().ref('Job').child(item.Node).update({
            LikeCount: count,
          })
          this.setState({
            CountOfLikes: count,
          });
        });
    }).catch((error) => {
      //error callback
      Alert.alert(
        'Upload Not Successfully' + error
      )
    });

  }


  render() {

    if (this.state.Loading) {
      return (
        <View style={[styles.container1, styles.horizontal]}>
          <ActivityIndicator size="large" color="#fbb040" />
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <View style={{ marginTop: 50 }} />
          <TouchableOpacity onPress={this.SignOut} style={{ marginRight: 10, padding: 3, alignItems: 'flex-end', justifyContent: 'center' }}>
            <Ionicons name="ios-log-out" style={{ marginRight: 5 }} color='#fbb040' size={25} />
          </TouchableOpacity>
          <View style={{ marginTop: 10, flexDirection: 'row', backgroundColor: '#fff', borderBottomColor: '#d1d5da', borderBottomWidth: 1, paddingHorizontal: 10, paddingVertical: 6, justifyContent: 'center', alignItems: 'center' }}>
            <Input multiline={true}
              style={[styles.default, { height: Math.max(35, this.state.height), flex: 1, }]}
              placeholder='Post Job'
              placeholderTextColor='#d1d5da'
              onContentSizeChange={(event) => {
                this.setState({ height: event.nativeEvent.contentSize.height })
              }}
              onChangeText={(Description) => this.setState({ Description: Description })}
            />
            <TouchableOpacity onPress={this.UploadJob} style={{ padding: 3, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="md-send" style={{ marginRight: 5 }} color='#fbb040' size={25} />

            </TouchableOpacity>
          </View>


          <Text style={{ padding: 4, fontSize: 20, fontWeight: 'bold', marginVertical: 15 }}>JOBS</Text>
          <View style={{ flex: 1 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={PostController.data}
              initialNumToRender={4}
              extraData={this.state}
              renderItem={this.renderRow}
              keyExtractor={(item, index) => index.toString()}

            />
          </View>


        </View>
      );
    }

  }

}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container1: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});



const gradients = [
  ['#fad0c4', '#ff9a9e'],
  ['#fbc2eb', '#a18cd1'],
  ['#ffecd2', '#fcb69f'],
  ['#ff9a9e', '#fecfef'],
  ['#f6d365', '#fda085'],
  ['#fbc2eb', '#a6c1ee'],
  ['#fdcbf1', '#e6dee9'],
  ['#a1c4fd', '#c2e9fb'],
  ['#d4fc79', '#96e6a1'],
  ['#84fab0', '#8fd3f4'],
  ['#cfd9df', '#e2ebf0'],
  ['#a6c0fe', '#f68084'],
  ['#fccb90', '#d57eeb'],
  ['#e0c3fc', '#8ec5fc'],
  ['#f093fb', '#f5576c'],
  ['#4facfe', '#00f2fe'],
  ['#43e97b', '#38f9d7'],
  ['#fa709a', '#fee140'],
  ['#a8edea', '#fed6e3'],
  ['#89f7fe', '#66a6ff']
];