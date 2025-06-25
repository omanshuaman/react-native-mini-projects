import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import Constants from "expo-constants";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
// Define the type for the post prop
type PostType = {
  video_id: string;
  creator_username: string;
  video_url: string;
};

type PostProps = {
  ref: Record<string, any>;
  post: PostType;
};

const Post: React.FC<PostProps> = ({ post }) => {
  const [finished, setFinished] = useState(false);
  const [loaded, setLoaded] = useState(true);

  const videoRef = useRef<Video>(null);

  useEffect(() => {
    console.log(`${post.video_id} mounted`);
    return () => {
      console.log(`${post.video_id} unmounted`);
      if (videoRef.current) {
        videoRef.current.unloadAsync();
      }
    };
  }, [post.video_id]);

  const onPlaybackStatusUpdate = useCallback(
    (status: AVPlaybackStatus) => {
      if (!loaded && status.isLoaded) {
        console.log(`video ${post.video_id} loaded`);
        setLoaded(true);
      }
      if (status.isLoaded && status.didJustFinish && !status.isLooping) {
        console.log("video finished");
        setFinished(true);
      }
    },
    [loaded, post.video_id]
  );

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        shouldPlay={false}
        isLooping
        resizeMode={ResizeMode.COVER}
        source={{
          uri: post.video_url,
        }}
        style={styles.video}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
      />
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("window").height - (48 + Constants.statusBarHeight), // temporary setting, remove "-40" later
  },
  video: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
  },
  videoInfo: {
    height: "100%",
    justifyContent: "flex-end",
  },
  bottomContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  shareButton: {
    // makes the share button's height same as the video description
    height: "100%",
  },
  rightContainer: {
    alignSelf: "flex-end",
  },
  optionlist: {
    padding: 10,
    justifyContent: "space-between",
  },
  eachOption: {
    alignItems: "center",
    marginTop: 10,
  },
  counterText: {
    color: "rgba(255,255,255,0.5)",
    fontWeight: "bold",
    fontSize: 12,
  },
  playBtn: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
  },

  modal_container: {
    width: "100%",
    position: "absolute",
    bottom: 50, // due to 40 (height of toolbar) + 10 (padding of post in 'optionlist')
    elevation: 0,
    marginLeft: 0,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    borderWidth: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modal_header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modal_title: {
    fontSize: 22,
  },
  modal_content: {
    fontSize: 18,
    paddingBottom: 10,
  },
  modal_hashtags: {
    fontSize: 16,
    color: "rgba(0,0,0,0.5)",
    paddingBottom: 10,
  },
  modal_footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modal_footerText: {
    // Not sure why it's not working !!!
    color: "rgba(0,0,0,0.5)",
    fontSize: 18,
  },
});
