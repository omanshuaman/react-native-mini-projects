import Post from "@/components/Post";

import { useFocusEffect } from "@react-navigation/native";
import Constants from "expo-constants";
import { useCallback } from "react";
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  View,
  ViewToken,
} from "react-native";
const posts = require("../data/post.big.test.json")["result"];
type PostType = {
  video_id: string;
  video_url: string;
  is_challenge: boolean;
  description: string;
  reply_to_challengeId: null;
  video_reply_count: number;
  likes_count: number;
  comments_count: number;
  timestamp: number;
  creator_username: string;
  creator_profile_pic: string;
  hashtags: Array<string>;
};

export default function Index() {
  let postRefs: Record<string, any> = {};
  let currentlyPlaying: any = null;
  let replayLastVideo = false;

  useFocusEffect(
    useCallback(() => {
      console.log("Home screen focused");
      if (currentlyPlaying && replayLastVideo) {
        currentlyPlaying.play();
      }
      replayLastVideo = false;

      return () => {
        console.log("Home screen unfocussed");
        if (currentlyPlaying) {
          currentlyPlaying.stop();
          replayLastVideo = true;
        }
      };
    }, [])
  );
  console.log("[] sde");
  const _renderItem = ({ item }: ListRenderItemInfo<PostType>) => {
    return (
      <Post
        ref={(ref: string) => {
          postRefs[item.video_id] = ref;
        }}
        post={item}
      />
    );
  };
  const _onViewableItemsChanged = (props: {
    changed: Array<ViewToken>;
    viewableItems: Array<ViewToken>;
  }) => {
    const changed = props.changed;
    changed.forEach((item) => {
      const cell = postRefs[item.key as string];
      if (cell) {
        if (item.isViewable) {
          cell.play();
          currentlyPlaying = cell;
        } else {
          cell.stop();
        }
      }
    });
  };

  const itemHeight =
    Dimensions.get("window").height - (48 + Constants.statusBarHeight);

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.video_id}
        renderItem={_renderItem}
        onViewableItemsChanged={_onViewableItemsChanged}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={7}
        getItemLayout={(_data, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 80,
        }}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        snapToAlignment="start"
        decelerationRate="normal"
      />
    </View>
  );
}
