import { useContext } from "react";
import { StateContext } from "../context/StateContext";


export function useCart() {
  const context = useContext(StateContext);
  return context;
}