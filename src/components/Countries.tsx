import { Box, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import {
  useGetCountriesQuery,
  useGetCountryByNameQuery,
} from "../features/api/apiSlice";

export function Countries() {
  const [_country, setCountry] = useState("poland");

  let content;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    content = <Link to={`/name/${_country}`}>Hi</Link>;
    // getCountry(country);
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "20%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextField
          label="Country"
          variant="outlined"
          onChange={(e) => setCountry(e.target.value)}
          sx={{
            width: "100%",
            borderColor: "#1976d2",
            outline: "0",
            input: {
              color: "white",
            },
            "& label": {
              color: "#1976d2",
            },
            "& label.Mui-focused": {
              color: "#1976d2",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1976d2",
              },
              "&:hover fieldset": {
                borderColor: "#1976d2",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
              },
            },
          }}
          required
        />
        <Button
          size="large"
          variant="contained"
          sx={{ width: "100%" }}
          onClick={handleClick}
        >
          <Link
            to={`/name/${_country}`}
            style={{ color: "white", textDecoration: "none" }}
          >
            Get Info
          </Link>{" "}
        </Button>
      </Box>
    </div>
  );
}
