import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ImageBackground } from "react-native";
import { Text, Card, Button, Image } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import { AntDesign } from '@expo/vector-icons';
import HeaderTop from "../components/HeaderTop";
import { getAllPosts } from "../functions/PostFunctions";
import PostCard from "./../components/PostCard";
import LikeCommentButton from "../components/LikeCommentButton";
import { deleteUserInfo } from "../functions/ProfileFunctions";
import { clearAllData } from "../functions/AsyncStorageFunctions";


const ProfileScreen = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const background = { uri: "https://i.pinimg.com/originals/46/d2/70/46d27066a89f31495d2c70ae49a4413e.jpg" };
  const profile = { uri: "Blogging_Project\assets\arnob.jpg" }

  const loadPosts = async () => {
    setLoading(true)
    let response = await getAllPosts();
    if (response != null) {
      setPosts(response);
    }
    setLoading(false)
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <ImageBackground source={background} style={styles.image}>
            <HeaderTop
              DrawerFunction={() => {
                props.navigation.toggleDrawer();
              }}
            />
            <Card>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={profile}
                  style={styles.imageStyle} />
                <Text style={{ fontSize: 32 }}>
                  {auth.CurrentUser.name}
                </Text>
              </View>
            </Card>
            <Button
              buttonStyle={{ backgroundColor: '#e02f2f' }}
              containerStyle={{ width: 150, marginLeft: 120, marginRight: 10, marginTop: 15 }}
              titleStyle={{ marginLeft: 5 }}
              title="Delete User"
              type='solid'
              alignSelf='center'
              icon={<AntDesign name="deleteuser" size={24} color="white" />}
              onPress={async () => {
                //clearAllData();
                deleteUserInfo(auth.CurrentUser.username);
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              }}
            />
            <Card>
              <View>
                <Text style={{ alignSelf: "center", fontSize: 18 }}>
                  Date of Birth: February 27, 1997 {"\n"}
                  Address: Dhaka, Bangladesh {"\n"}
                  University: IUT {"\n"}
                  Department : Cse {"\n"}
                  Console Game Lover {"\n"}
                  
              </Text>
              </View>
            </Card>
            <FlatList
              data={posts}
              onRefresh={loadPosts}
              refreshing={loading}
              renderItem={function ({ item }) {
                let data = JSON.parse(item)
                if (JSON.stringify(data.username) === JSON.stringify(auth.CurrentUser.username)) {
                  return (
                    <View>
                      <Card>
                        <PostCard
                          author={data.name}
                          body={data.post}
                        />
                        <Card.Divider />
                        <LikeCommentButton
                          postID={data.postID}
                          likes={data.likes}
                          navigateFunc={() => {
                            props.navigation.navigate("PostScreen", {
                              postId: data.postID,
                            });
                          }}
                        />
                      </Card>
                    </View>
                  );
                }
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </ImageBackground>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
  imageStyle: {
    height: 200,
    width: 200,
    margin: 5,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default ProfileScreen;