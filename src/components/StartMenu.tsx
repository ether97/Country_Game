import { Box, Button, LinearProgress, Modal, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../features/app/hooks";
import { capitalRefresh } from "../features/game/capitalSlice";
import {
  currencyRefresh,
  getCurrencyScore,
} from "../features/game/currencySlice";
import { flagRefresh } from "../features/game/flagSlice";
import { startGame } from "../features/game/gameSlice";
import { languageRefresh } from "../features/game/languageSlice";
import { regionRefresh } from "../features/game/regionSlice";
import { useNavigate } from "react-router-dom";

export function StartMenu() {
  const languages = useAppSelector((state) => state.language.correct);
  const languageScore = useAppSelector((state) => state.language.score);
  const currencyScore = useAppSelector((state) => state.currency.score);
  const regionScore = useAppSelector((state) => state.region.score);
  const capitalScore = useAppSelector((state) => state.capital.score);
  const flagScore = useAppSelector((state) => state.flag.score);
  const navigate = useNavigate();
  let overallScore = (
    (currencyScore + languageScore + capitalScore + flagScore + regionScore) /
    5
  ).toFixed(2);

  const currency = useAppSelector((state) => state.currency.correct);
  const flags = useAppSelector((state) => state.flag.correct);
  const capitals = useAppSelector((state) => state.capital.correct);
  const regions = useAppSelector((state) => state.region.correct);
  const dispatch = useAppDispatch();
  function handleClick(test: string) {
    dispatch(startGame());
  }
  function handleClose() {
    navigate("/");

    dispatch(flagRefresh());

    dispatch(regionRefresh());

    dispatch(capitalRefresh());

    dispatch(languageRefresh());

    dispatch(currencyRefresh());
  }
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "30px",
          width: "1000px",
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: "3rem", md: "6rem", lg: "6rem" } }}
        >
          Country Game
        </Typography>
        <Typography variant="h4">Test your skills: </Typography>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Link
            to="/flags"
            style={{
              pointerEvents: flags > 0 ? "none" : "auto",
              lineHeight: "3rem",
              color: "black",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                width: { xs: "350px", md: "400px", lg: "400px" },
                color: "white",
                "&:disabled": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "white",
                },
              }}
              onClick={() => handleClick("flags")}
              disabled={flags > 0 ? true : false}
            >
              Flag Test
            </Button>
          </Link>
          {flagScore > 0 && (
            <Box sx={{ width: "400px" }}>
              <LinearProgress
                color="success"
                variant="determinate"
                value={flagScore}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid black",
                  height: "20px",
                  borderRadius: "20px",
                }}
              />
            </Box>
          )}
        </div>
        <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
          <Link
            to="/currency"
            style={{
              pointerEvents: currency > 0 ? "none" : "auto",
              lineHeight: "3rem",
              color: "black",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                width: { xs: "350px", md: "400px", lg: "400px" },
                color: "white",

                "&:disabled": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "white",
                },
              }}
              onClick={() => handleClick("currency")}
              disabled={currency > 0 ? true : false}
            >
              Currency Test
            </Button>
          </Link>
          {currencyScore > 0 && (
            <Box sx={{ width: "400px" }}>
              <LinearProgress
                color="success"
                variant="determinate"
                value={currencyScore}
                sx={{
                  backgroundColor: "transparent",
                  border: "1px solid black",
                  height: "20px",
                  borderRadius: "20px",
                }}
              />
            </Box>
          )}
        </div>
        <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
          <Link
            to="/languages"
            style={{
              pointerEvents: languages > 0 ? "none" : "auto",
              lineHeight: "3rem",
              color: "black",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                width: { xs: "350px", md: "400px", lg: "400px" },
                color: "white",

                "&:disabled": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "white",
                },
              }}
              onClick={() => handleClick("languages")}
              disabled={languages > 0 ? true : false}
            >
              Language Test
            </Button>
          </Link>
          {languageScore > 0 && (
            <Box sx={{ width: "400px" }}>
              <LinearProgress
                color="success"
                variant="determinate"
                value={languageScore}
                sx={{
                  backgroundColor: "transparent",
                  border: "1px solid black",
                  height: "20px",
                  borderRadius: "20px",
                }}
              />
            </Box>
          )}
        </div>
        <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
          <Link
            to="/capitals"
            style={{
              pointerEvents: capitals > 0 ? "none" : "auto",
              lineHeight: "3rem",
              color: "black",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                width: { xs: "350px", md: "400px", lg: "400px" },
                color: "white",

                "&:disabled": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "white",
                },
              }}
              onClick={() => handleClick("capitals")}
              disabled={capitals > 0 ? true : false}
            >
              Capital Test
            </Button>
          </Link>
          {capitalScore > 0 && (
            <Box sx={{ width: "400px" }}>
              <LinearProgress
                color="success"
                variant="determinate"
                value={capitalScore}
                sx={{
                  backgroundColor: "transparent",
                  border: "1px solid black",
                  height: "20px",
                  borderRadius: "20px",
                }}
              />
            </Box>
          )}
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexDirection: "column",
          }}
        >
          <Link
            to="/regions"
            style={{
              pointerEvents: regions > 0 ? "none" : "auto",
              lineHeight: "0rem",
              color: "black",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                width: { xs: "350px", md: "400px", lg: "400px" },
                color: "white",
                "&:disabled": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "white",
                },
              }}
              onClick={() => handleClick("regions")}
              disabled={regions > 0 ? true : false}
            >
              Region Test
            </Button>
          </Link>
          {regionScore > 0 && (
            <Box sx={{ width: "400px" }}>
              <LinearProgress
                color="success"
                variant="determinate"
                value={regionScore}
                sx={{
                  backgroundColor: "transparent",
                  border: "1px solid black",
                  height: "20px",
                  borderRadius: "20px",
                }}
              />
            </Box>
          )}
        </div>
      </div>
      <Modal
        open={
          currencyScore > 0 &&
          languageScore > 0 &&
          capitalScore > 0 &&
          regionScore > 0 &&
          flagScore > 0
        }
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
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(1,1,1,1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h1"
            component="h2"
            sx={{ fontSize: { xs: "1.5rem", md: "3rem", lg: "3rem" } }}
          >
            GAME OVER!
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            variant="h2"
            component="h2"
          >
            Your overall score was {overallScore}%!
          </Typography>

          <Link to="/">
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ width: "200px" }}
            >
              NEW GAME
            </Button>
          </Link>
        </Box>
      </Modal>
    </div>
  );
}
