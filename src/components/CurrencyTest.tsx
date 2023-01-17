import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useGetCountriesQuery } from "../features/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../features/app/hooks";
import { addCorrect, addError } from "../features/game/currencySlice";
import { decrementHint } from "../features/game/gameSlice";

export function CurrencyTest() {
  const correct = useAppSelector((state) => state.currency.correct);
  const incorrect = useAppSelector((state) => state.currency.incorrect);
  const dispatch = useAppDispatch();
  const { data: countries, isSuccess } = useGetCountriesQuery();
  const [random, setRandom] = useState(Math.floor(Math.random() * 249));
  const hints = useAppSelector((state) => state.game.hints);
  const [hintDisplay, setHintDisplay] = useState("none");

  let currency;
  let country: string = "";
  let firstGuess;
  let secondGuess;
  let capitalHint;
  let thirdGuess;
  let unShuffledArray: string[] = [];
  let shuffledArray: string[] = [];
  if (isSuccess) {
    if (countries[random].currencies !== undefined) {
      console.log(Object.values(countries[random].currencies)[0].name);
      currency = Object.values(countries[random].currencies)[0].name;
    } else {
      setRandom(Math.floor(Math.random() * 249));
    }
    country = countries[random].name.common;
    capitalHint = countries[random].capital;
    firstGuess = countries[Math.floor(Math.random() * 249)].name.common;
    secondGuess = countries[Math.floor(Math.random() * 249)].name.common;
    thirdGuess = countries[Math.floor(Math.random() * 249)].name.common;
    unShuffledArray.push(country, firstGuess, secondGuess, thirdGuess);
    shuffledArray = unShuffledArray
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  function handleClick(
    e: React.MouseEvent<HTMLButtonElement>,
    _country: string
  ) {
    e.preventDefault();
    if (_country === country) {
      dispatch(addCorrect());

      setRandom(Math.floor(Math.random() * 249));
      setHintDisplay("none");
    } else {
      dispatch(addError());
      setRandom(Math.floor(Math.random() * 249));
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
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          minWidth: "1000px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          {currency} is the currency of which country?
        </h1>
        <Button
          variant="outlined"
          onClick={(e) => handleClick(e, shuffledArray[0])}
          sx={{
            color: "white",
            "& .MuiTouchRipple-root span": {
              backgroundColor:
                shuffledArray[0] !== country
                  ? "red!important"
                  : "green!important",
              opacity: 0.3,
            },
          }}
        >
          {shuffledArray[0]}
        </Button>
        <Button
          variant="outlined"
          onClick={(e) => handleClick(e, shuffledArray[1])}
          sx={{
            color: "white",
            "& .MuiTouchRipple-root span": {
              backgroundColor:
                shuffledArray[1] !== country
                  ? "red!important"
                  : "green!important",
              opacity: 0.3,
            },
          }}
        >
          {shuffledArray[1]}
        </Button>
        <Button
          size="large"
          variant="outlined"
          onClick={(e) => handleClick(e, shuffledArray[2])}
          sx={{
            color: "white",
            "& .MuiTouchRipple-root span": {
              backgroundColor:
                shuffledArray[2] !== country
                  ? "red!important"
                  : "green!important",
              opacity: 0.3,
            },
          }}
        >
          {shuffledArray[2]}
        </Button>
        <Button
          variant="outlined"
          onClick={(e) => handleClick(e, shuffledArray[3])}
          sx={{
            color: "white",
            "& .MuiTouchRipple-root span": {
              backgroundColor:
                shuffledArray[3] !== country
                  ? "red!important"
                  : "green!important",
              opacity: 0.3,
            },
          }}
        >
          {shuffledArray[3]}
        </Button>
        <Button onClick={handleShowHint} variant="contained">
          Hint
        </Button>
        <Typography sx={{ textAlign: "center", display: hintDisplay }}>
          The capital of this country is {capitalHint}
        </Typography>
      </div>
      <div style={{ position: "absolute", bottom: "0px", left: "20px" }}>
        <Typography sx={{ fontSize: { xs: "1.5rem", md: "3rem", lg: "3rem" } }}>
          Correct: {correct}
        </Typography>
        <Typography sx={{ fontSize: { xs: "1.5rem", md: "3rem", lg: "3rem" } }}>
          Incorrect: {incorrect}
        </Typography>
        <Typography sx={{ fontSize: { xs: "1.5rem", md: "3rem", lg: "3rem" } }}>
          Hints remaining: {hints}
        </Typography>
      </div>
    </div>
  );
}
