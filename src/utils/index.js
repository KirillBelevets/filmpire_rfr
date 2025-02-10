import axios from "axios";
import "./index.css";

export const moviesApi = axios.create({
  baseURL: "http://api.themoviedb.org/3",
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});

export const fetchToken = async () => {
  console.log("FETCH_TOKEN");
  try {
    console.log(moviesApi);
    const { data } = await moviesApi.get("/authentication/token/new");
    const token = data.request_token;
    console.log(token);

    if (data.success) {
      localStorage.setItem("request_token", token);
      window.location.href = `https://api.themoviedb.org/3/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.log("Sorry, token cannot be created");
  }
};

export const createSessionId = async () => {
  const token = localStorage.getItem("request_token");

  try {
    const {
      data: { session_id },
    } = await moviesApi.post("authentication/session/new", {
      request_token: token,
    });

    return session_id;
  } catch (error) {
    console.log(error);
  }
};
