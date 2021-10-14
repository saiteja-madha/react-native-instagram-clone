import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import { db, firebase } from "../../firebase";

export default Post = ({ post }) => {
  const handleLike = (post) => {
    const currentLikeStatus = !post.likes_by_users.includes(firebase.auth().currentUser.email);

    db.collection("posts")
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.email)
          : firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.email),
      })
      .catch((error) => {
        "Error updating document", error;
      });
  };

  return (
    <View style={styles.container}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter post={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => (
  <View style={postHeader.container}>
    <View style={postHeader.leftContainer}>
      <Image style={postHeader.image} source={{ uri: post.profile_picture }} />
      <Text style={postHeader.text}>{post.username} </Text>
    </View>
    <Image style={postHeader.rightMenu} source={require("../../assets/icons/menu-vertical.png")} />
    {/* <Text style={postHeader.rightMenu}>... </Text> */}
  </View>
);

const PostImage = ({ post }) => (
  <View style={postImage.container}>
    <Image style={postImage.image} source={{ uri: post.image_url }} />
  </View>
);

const PostFooter = ({ post, handleLike }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={postFooter.leftFooterIconsContainer}>
      <TouchableOpacity onPress={() => handleLike(post)}>
        <Image
          style={postFooter.icon}
          source={
            post.likes_by_users.includes(firebase.auth().currentUser.email)
              ? require("../../assets/icons/liked.png")
              : require("../../assets/icons/like.png")
          }
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image style={postFooter.icon} source={require("../../assets/icons/topic.png")} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image style={[postFooter.icon, postFooter.shareIcon]} source={require("../../assets/icons/share.png")} />
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity>
        <Image style={postFooter.icon} source={require("../../assets/icons/bookmark.png")} />
      </TouchableOpacity>
    </View>
  </View>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text style={{ color: "white", fontWeight: "600" }}>{post.likes_by_users.length.toLocaleString("en")} likes </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: "white" }}>
      <Text style={{ color: "white", fontWeight: "bold" }}>{post.username} </Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

const CommentsSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: "gray" }}>
        View {post.comments.length} {post.comments.length > 1 ? "comments" : "comment"}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: "row", marginTop: 5 }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "bold" }}>{comment.user} </Text>
          <Text> {comment.comment}</Text>
        </Text>
      </View>
    ))}
  </>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
});

const postHeader = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.5,
    borderColor: "#FF8501",
  },
  text: {
    color: "white",
    marginLeft: 5,
    fontWeight: "700",
  },
  rightMenu: {
    width: 22,
    height: 22,
  },
});

const postImage = StyleSheet.create({
  container: {
    width: "100%",
    height: 400,
  },
  image: {
    height: "100%",
    resizeMode: "cover",
  },
});

const postFooter = StyleSheet.create({
  leftFooterIconsContainer: {
    flexDirection: "row",
    width: "32%",
    justifyContent: "space-between",
  },
  icon: {
    width: 33,
    height: 33,
  },
  shareIcon: {
    transform: [
      {
        rotate: "320deg",
      },
    ],
    marginTop: -3,
  },
});
