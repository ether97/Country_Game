import { Card } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCountryByNameQuery } from "../features/api/apiSlice";

export function Country() {
  const { countryName } = useParams();
  const [languages, setLanguages] = useState([]);

  const {
    data: country,
    isLoading,
    isSuccess,
    isError,
  } = useGetCountryByNameQuery(String(countryName));

  let content;
  if (isSuccess) {
    console.log("hi");
    content = Object.entries(country).map((item, index) =>
      Object.entries(item[1]).map((entry) => {
        if (entry[0] === "flag") {
          return <p>{entry[1]}</p>;
        } else if (entry[0] === "flags") {
          return (
            <div
              style={{
                backgroundImage: `url(${JSON.stringify(entry[1].png)})`,
                height: "100px",
                width: "100px",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
          );
        } else if (entry[0] === "name") {
          return (
            <>
              <p>OFFICAL NAME: {entry[1].official}</p>
              {/* <p>{JSON.stringify(entry[1].common)}</p> */}
            </>
          );
        } else if (entry[0] === "languages") {
          //   Object.entries(entry[0]).map((language) => {
          //     return <p>{JSON.stringify(language)}</p>;
          //   });
          //   for (const [key, value] of Object.entries(entry[1])) {
          //     console.log(key);
          //     return <p>{JSON.stringify(value)}</p>;
          //   }
          //   Object.entries(entry[1]).map(([key, value], index) => {
          //     return <p>{JSON.stringify(value)}</p>;
          //   });
          const map = new Map(Object.entries(entry[1]));
          console.log(Object.entries(entry[1]).length);
          let names = [];
          for (var i = 0; i < Object.entries(entry[1]).length; i++) {
            names.push([...map.values()][i]);
          }
          names.map((_string) => {
            <p>{JSON.stringify(_string)}</p>;
          });
          return <p>LANGUAGES: {names.join(", ")}</p>;
        } else if (entry[0] === "currencies") {
          return (
            <p>
              CURRENCY: (NAME: {Object.values(entry[1])[0].name}, SYMBOL:{" "}
              {Object.values(entry[1])[0].symbol})
            </p>
          );
          console.log(Object.values(entry[1])[0]);
        } else if (entry[0] === "region") {
          return <p>REGION: {entry[1]}</p>;
        } else if (entry[0] === "capital") {
          return <p>CAPITAL: {entry[1][0]}</p>;
        }
      })
    );
  } else if (isError) {
    <p style={{ color: "white" }}>error</p>;
  }
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "gray",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {content}
    </div>
  );
}
