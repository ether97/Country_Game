import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Country } from "./components/Country";
import { RegionsTest } from "./components/RegionsTest";
import { CapitalTest } from "./components/CapitalTest";
import { FlagTest } from "./components/FlagTest";
import { LanguageTest } from "./components/LanguageTest";
import { CurrencyTest } from "./components/CurrencyTest";
import { StartMenu } from "./components/StartMenu";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<StartMenu />} />
        <Route path="regions" element={<RegionsTest />} />
        <Route path="capitals" element={<CapitalTest />} />
        <Route path="flags" element={<FlagTest />} />
        <Route path="languages" element={<LanguageTest />} />
        <Route path="currency" element={<CurrencyTest />} />
      </Route>
    </Routes>
  );
}

export default App;
