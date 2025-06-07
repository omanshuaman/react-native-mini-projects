import { Link } from "expo-router";
import { Image, Pressable } from "react-native";

const MovieListItem = ({ movie }: { movie: any }) => {
  return (
    <Link href={`/${movie.id}`} asChild>
      <Pressable style={{ width: "50%", padding: 5 }}>
        <Image
          source={{
            uri: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
          }}
          style={{ width: "100%", aspectRatio: 3 / 5, borderRadius: 20 }}
        />
        {/* <Text>{movie.title}</Text> */}
      </Pressable>
    </Link>
  );
};

export default MovieListItem;
