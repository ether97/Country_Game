import { Box, Button, Modal, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../features/app/hooks";
import { startGame } from "../features/game/gameSlice";
import { useLocation } from "react-router-dom";
import { flagRefresh, getFlagScore } from "../features/game/flagSlice";
import {
  getLanguageScore,
  languageRefresh,
} from "../features/game/languageSlice";
import { capitalRefresh, getCapitalScore } from "../features/game/capitalSlice";
import { getRegionScore, regionRefresh } from "../features/game/regionSlice";
import {
  currencyRefresh,
  getCurrencyScore,
} from "../features/game/currencySlice";
import { useNavigate } from "react-router-dom";

export function Timer() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  const [count, setCount] = useState(60);
  const modal = useAppSelector((state) => state.game.start);
  const dispatch = useAppDispatch();

  const start = useAppSelector((state) => state.game.start);

  function handleClose() {
    setCount(60);
    dispatch(startGame());
    navigate("/");
    switch (location.pathname) {
      case "/flags":
        dispatch(getFlagScore());
        break;
      case "/regions":
        dispatch(getRegionScore());
        break;
      case "/capitals":
        dispatch(getCapitalScore());
        break;
      case "/languages":
        dispatch(getLanguageScore());
        break;
      case "/currency":
        dispatch(getCurrencyScore());
        break;
    }
  }

  function handleRetry() {
    setCount(60);
    switch (location.pathname) {
      case "/flags":
        dispatch(flagRefresh());
        break;
      case "/regions":
        dispatch(regionRefresh());
        break;
      case "/capitals":
        dispatch(capitalRefresh());
        break;
      case "/languages":
        dispatch(languageRefresh());
        break;
      case "/currency":
        dispatch(currencyRefresh());
        break;
    }
  }

  useEffect(() => {
    start && count > 0 && setTimeout(() => setCount(count - 1), 1000);
  }, [start, count]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "20px",
          width: "400px",
        }}
      >
        {start && (
          <h1 style={{}}>
            Time remaining:{" "}
            <p
              style={{
                color: count < 10 ? "red" : count < 30 ? "orange" : "green",
                fontSize: "3rem",
                lineHeight: "0rem",
              }}
            >
              {count}
            </p>
          </h1>
        )}
      </div>
      <Modal
        open={count === 0}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: "600px",
            width: "900px",
            backgroundColor: "rgba(1,1,1,1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography id="modal-modal-title" variant="h1" component="h2">
            GAME OVER!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Better luck next time...
          </Typography>
          <Button
            variant="outlined"
            onClick={handleRetry}
            sx={{ width: "200px" }}
          >
            Retry
          </Button>
          <Link to="/">
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ width: "200px" }}
            >
              Back to Menu
            </Button>
          </Link>
        </Box>
      </Modal>
    </>
  );
}
