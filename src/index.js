import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";

import ToggleColorModeProvider from "./utils/ToggleColorMode";
import App from "./components/App";
import store from "./app/store";

const theme = createTheme({});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToggleColorModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToggleColorModeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
