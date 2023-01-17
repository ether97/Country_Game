import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useGetCountriesQuery } from "../features/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../features/app/hooks";
import { addCorrect, addError } from "../features/game/regionSlice";
import { startGame } from "../features/game/gameSlice";
import { useEffect } from "react";
import { decrementHint } from "../features/game/gameSlice";

export function RegionsTest() {
  const correct = useAppSelector((state) => state.region.correct);
  const incorrect = useAppSelector((state) => state.region.incorrect);
  const dispatch = useAppDispatch();
  const {
    data: countries,
    isSuccess,
    isLoading,
    isError,
    refetch,
  } = useGetCountriesQuery();
  const [random, setRandom] = useState(Math.floor(Math.random() * 249) + 1);
  const [regions, setRegions] = useState([
    "Africa",
    "Asia",
    "Central America",
    "Eastern Europe",
    "European Union",
    "Middle East",
    "North America",
    "Oceania",
    "South America",
    "Caribbean",
  ]);
  const [firstSlice, setFirstSlice] = useState(Math.floor(Math.random()) * 6);
  const [secondSlice, setSecondSlice] = useState(firstSlice + 4);
  const [smallRandom, setSmallRandom] = useState(Math.random());
  const hints = useAppSelector((state) => state.game.hints);
  const [hintDisplay, setHintDisplay] = useState("none");

  let backgroundColor = "transparent";
  let country;
  let region: string = "";
  let slicedArray;
  let firstGuess;
  let secondGuess;
  let thirdGuess;
  let unShuffledArray = [];
  let shuffledArray: string[] = [];
  let subRegionHint;
  if (isSuccess) {
    country = countries[random].name.common;
    region = countries[random].region;
    subRegionHint = countries[random].subregion;
    const index = regions.indexOf(region);
    slicedArray = [...regions];
    if (index > -1) {
      slicedArray.splice(index, 1);
    }
    slicedArray = slicedArray.slice(firstSlice, secondSlice);
    firstGuess = slicedArray[0];
    secondGuess = slicedArray[1];
    thirdGuess = slicedArray[2];
    unShuffledArray.push(region, firstGuess, secondGuess, thirdGuess);
    shuffledArray = unShuffledArray
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  function handleClick(
    e: React.MouseEvent<HTMLButtonElement>,
    country: string
  ) {
    e.preventDefault();
    if (country === region) {
      dispatch(addCorrect());
      setRandom(Math.floor(Math.random() * 249) + 1);
      setHintDisplay("none");
    } else {
      dispatch(addError());
      setRandom(Math.floor(Math.random() * 249) + 1);
      setHintDisplay("none");
    }
  }

  function handleShowHint() {
    if (hintDisplay === "none" && hints > 0) {
      setHintDisplay("block");
      dispatch(decrementHint());
    }
  }
  let content;
  if (isSuccess) {
    content = (
      <Container
        sx={{
          minWidth: { xs: "400px", md: "800px", lg: "800px" },
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          height: { xs: "100vh", md: "100vh", lg: "100vh" },
          justifyContent: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          What region is {country} in? <br />
          <br />
        </h1>
        <Button
          variant="outlined"
          size="large"
          onClick={(e) => handleClick(e, shuffledArray[0])}
          sx={{
            "& focus": { backgroundColor: backgroundColor },
            "& .MuiTouchRipple-root span": {
              backgroundColor:
                shuffledArray[0] !== region
                  ? "red!important"
                  : "green!important",
              opacity: 0.3,
            },
            color: "white",
          }}
        >
          {shuffledArray[0]}
        </Button>
        <Button
          variant="outlined"
          onClick={(e) => handleClick(e, shuffledArray[1])}
          sx={{
            "& focus": { backgroundColor: backgroundColor },
            "& .MuiTouchRipple-root span": {
              backgroundColor:
                shuffledArray[1] !== region
                  ? "red!important"
                  : "green!important",
              opacity: 0.3,
            },
            color: "white",
          }}
        >
          {shuffledArray[1]}
        </Button>
        <Button
          variant="outlined"
          onClick={(e) => handleClick(e, shuffledArray[2])}
          sx={{
            "& focus": { backgroundColor: backgroundColor },
            "& .MuiTouchRipple-root span": {
              backgroundColor:
                shuffledArray[2] !== region
                  ? "red!important"
                  : "green!important",
              opacity: 0.3,
            },
            color: "white",
          }}
        >
          {shuffledArray[2]}
        </Button>
        <Button
          variant="outlined"
          onClick={(e) => handleClick(e, shuffledArray[3])}
          sx={{
            "& focus": { backgroundColor: backgroundColor },
            "& .MuiTouchRipple-root span": {
              backgroundColor:
                shuffledArray[3] !== region
                  ? "red!important"
                  : "green!important",
              opacity: 0.3,
            },
            color: "white",
          }}
        >
          {shuffledArray[3]}
        </Button>
        <Button onClick={handleShowHint} variant="contained">
          Hint
        </Button>
        <Typography sx={{ textAlign: "center", display: hintDisplay }}>
          The subregion is {subRegionHint}
        </Typography>
      </Container>
    );
  }
  return (
    <Container
      sx={{
        height: { xs: "100vh", md: "100vh", lg: "100vh" },
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: "-20px", md: "10px", lg: "10px" },
          left: "20px",
        }}
      >
        <Typography sx={{ fontSize: { xs: "1.5rem", md: "3rem", lg: "3rem" } }}>
          Correct: {correct}
        </Typography>
        <Typography sx={{ fontSize: { xs: "1.5rem", md: "3rem", lg: "3rem" } }}>
          Incorrect: {incorrect}
        </Typography>
        <Typography sx={{ fontSize: { xs: "1.5rem", md: "3rem", lg: "3rem" } }}>
          Hints remaining: {hints}
        </Typography>
      </Box>
      {content}
    </Container>
  );
}
