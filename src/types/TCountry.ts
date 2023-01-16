export type TCountry = {
  name: {
    common: string;
    official: string;
  };
  unMember: boolean;
  currencies: { string: { name: string; symbol: string } };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: { string: string };
  latlng: number[];
  flag: string;
  population: number;
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
  };
};
