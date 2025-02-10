import React, { useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { ExitToApp } from "@mui/icons-material";

import { RatedCards } from "..";

import { useGetListQuery } from "../../services/TMDB";

import { userSelector } from "../../features/auth";

const Profile = ({ title, data }) => {
  const { user } = useSelector(userSelector);

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listname: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlistMovies, refetch: refetchWatchlisted } =
    useGetListQuery({
      listname: "watchlist/movies",
      accountId: user.id,
      sessionId: localStorage.getItem("session_id"),
      page: 1,
    });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  });

  const logout = () => {
    localStorage.clear();

    window.location.href = "/";
  };

  return (
    <Box>
      <Box diaplay="flex" justifyContent="space-between">
        <Typegraphy variant="h4" gutterBottom>
          My Profile
        </Typegraphy>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography variant="h5">
          Add favourites or watchlist some movies to see them here!
        </Typography>
      ) : (
        <Box>
          <RatedCards title="Favorite Movies" data={favoriteMovies} />
          <RatedCards title="Watchlist" data={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
