import React from "react";
import { Typography, Box } from "@mui/material";

import { Movie } from "..";
import useStyles from "./styles";

const RatedCards = () => {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Favorites
      </Typography>
      <Box display="flex" flexWrap="wrap" className={classes.container}>
        {data?.results.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </Box>
    </Box>
  );
};

export default RatedCards;
