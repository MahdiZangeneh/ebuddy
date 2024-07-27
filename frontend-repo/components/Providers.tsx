"use client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/theme";
import store from "../store/store";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};
