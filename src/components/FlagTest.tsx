import { Box, Button, Container, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useGetCountriesQuery } from "../features/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../features/app/hooks";
import { addCorrect, addError } from "../features/game/flagSlice";
import { decrementHint } from "../features/game/gameSlice";

export function FlagTest() {
  const correct = useAppSelector((state) => state.flag.correct);
  const incorrect = useAppSelector((state) => state.flag.incorrect);
  const hints = useAppSelector((state) => state.game.hints);
  const dispatch = useAppDispatch();

  const { data: countries, isSuccess } = useGetCountriesQuery();
  const [random, setRandom] = useState(Math.floor(Math.random() * 249) + 1);
  const [hintDisplay, setHintDisplay] = useState("none");
  const errorRef = useRef(0);

  let flag;
  let country: string = "";
  let firstGuess;
  let secondGuess;
  let thirdGuess;
  let unShuffledArray: string[] = [];
  let shuffledArray: string[] = [];
  let regionHint;
  if (isSuccess) {
    flag = countries[random].flags.png;
    country = countries[random].name.common;
    regionHint = countries[random].region;
    firstGuess = countries[Math.floor(Math.random() * 249) + 1].name.common;
    secondGuess = countries[Math.floor(Math.random() * 249) + 1].name.common;
    thirdGuess = countries[Math.floor(Math.random() * 249) + 1].name.common;
    unShuffledArray.push(country, firstGuess, secondGuess, thirdGuess);
    shuffledArray = unShuffledArray
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    console.log(shuffledArray);
  }
  function handleClick(
    e: React.MouseEvent<HTMLButtonElement>,
    _country: string
  ) {
    e.preventDefault();
    if (_country === country) {
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
  return (
    <div
      style={{
        height: "900px",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        sx={{
          minWidth: { xs: "400px", md: "800px", lg: "800px" },
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          height: "900px",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${flag})`,
            height: "200px",
            width: "200px",
            backgroundPosition: "center",
            backgroundSize: "cover",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        ></div>
        <h1 style={{ textAlign: "center" }}>
          This flag belongs to which country?
        </h1>
        <Button
          size="large"
          variant="outlined"
          onClick={(e) => handleClick(e, shuffledArray[0])}
          sx={{
            "& .MuiTouchRipple-root span": {
              backgroundColor:
                shuffledArray[0] !== country
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
          size="large"
          variant="outlined"
          onClick={(e) => handleClick(e, shuffledArray[1])}
          sx={{
            "& .MuiTouchRipple-root span": {
              backgroundColor:
                shuffledArray[1] !== country
                  ? "red!important"
                  : "green!important",
              opacity: 0.3,
              transition: "0.1s",
            },
            color: "white",
          }}
        >
          {shuffledArray[1]}
        </Button>
        <Button
          size="large"
          variant="outlined"
          onClick={(e) => handleClick(e, shuffledArray[2])}
          sx={{
            "& .MuiTouchRipple-root span": {
              backgroundColor:
                shuffledArray[2] !== country
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
          size="large"
          variant="outlined"
          onClick={(e) => handleClick(e, shuffledArray[3])}
          sx={{
            "& .MuiTouchRipple-root span": {
              backgroundColor:
                shuffledArray[3] !== country
                  ? "red!important"
                  : "green!important",
              opacity: 0.3,
            },
            color: "white",
          }}
        >
          {shuffledArray[3]}
        </Button>
        <Button
          onClick={handleShowHint}
          variant="contained"
          disabled={hints > 0 ? false : true}
        >
          Hint
        </Button>
        <Typography sx={{ textAlign: "center", display: hintDisplay }}>
          This country is located in {regionHint}
        </Typography>
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: "-20px", md: "10px", lg: "10px" },
            left: "20px",
          }}
        >
          <Typography
            sx={{ fontSize: { xs: "1.5rem", md: "3rem", lg: "3rem" } }}
          >
            Correct: {correct}
          </Typography>
          <Typography
            sx={{ fontSize: { xs: "1.5rem", md: "3rem", lg: "3rem" } }}
          >
            Incorrect: {incorrect}
          </Typography>
          <Typography
            sx={{ fontSize: { xs: "1.5rem", md: "3rem", lg: "3rem" } }}
          >
            Hints remaining: {hints}
          </Typography>
        </Box>
      </Container>
    </div>
  );
}
