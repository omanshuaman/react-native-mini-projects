const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTc5OWFmMDJmMzRkNTlkNDZjYWVkZWQxNmE3NTIzOSIsIm5iZiI6MTc0ODYwNTIyNi41NzUsInN1YiI6IjY4Mzk5OTJhZGMzNTE5OWViNjNkMjBlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BZw8xbgc3D9jCou-ceNkKj4DBF2yJl0NL_NqBLluRdc";

const headers = {
  accept: "application/json",
  Authorization: "Bearer " + apiKey,
};

export const fetchTopRatedMovies = async ({ pageParam = 1 }) => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageParam}`;
  const options = {
    method: "GET",
    headers,
  };
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const json = await res.json();
  return json.results;
};

export const fetchMovie = async (id: number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: "GET",
    headers,
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const json = await res.json();
  return json;
};
