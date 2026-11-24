import { useContext } from "react";
import {
  MetaMaskContext,
  type MetaMaskContextType,
} from "../context/MetaMaskContext";

export function useMetaMask(): MetaMaskContextType {
  const context = useContext(MetaMaskContext);
  if (!context) {
    throw new Error("useMetaMask must be used within a MetaMaskProvider");
  }
  return context;
}
