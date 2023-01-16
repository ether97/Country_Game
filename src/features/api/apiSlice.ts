import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TCountry } from "../../types/TCountry";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://restcountries.com/v3.1",
  }),
  tagTypes: ["Countries"],
  endpoints: (builder) => ({
    getCountries: builder.query<TCountry[], void>({
      query: () => ({
        url: `/all`,
      }),
      providesTags: ["Countries"],
    }),
    getCountryByName: builder.query<TCountry, string>({
      query: (countryName) => ({
        url: `/name/${countryName}`,
      }),
    }),
  }),
});

export const { useGetCountriesQuery, useGetCountryByNameQuery } = apiSlice;
