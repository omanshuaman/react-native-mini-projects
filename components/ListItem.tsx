import { User } from "@/types/types";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
const ITEM_WIDTH = Dimensions.get("window").width / 2 - 10;
const videoSource =
  "https://cdn.pixabay.com/video/2022/03/18/111204-689949818_tiny.mp4";
type ListItemProps = {
  user?: User;
};
const ListItem: React.FC<ListItemProps> = ({ user }) => {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.pause();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  console.log("Rendering item:", user);
  return (
    <View style={styles.contentContainer}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        contentFit="cover"
        nativeControls
        allowsPictureInPicture
      />
      {/* <View style={styles.video} /> */}
    </View>
  );
};

export default React.memo(ListItem);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  video: {
    width: ITEM_WIDTH,
    height: 500,
    backgroundColor: "red",
  },
});
