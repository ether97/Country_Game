import { Outlet } from "react-router-dom";
import { useAppSelector } from "../features/app/hooks";
import { Timer } from "./Timer";

export function Layout() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Timer />
      <Outlet />
    </div>
  );
}
