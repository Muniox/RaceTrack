import { useContext } from "react";
import type { AnimationContextType } from "../types";
import { AnimationContext } from "./AnimationContextInstance";

export const useAnimation = (): AnimationContextType => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within AnimationProvider");
  }
  return context;
};
