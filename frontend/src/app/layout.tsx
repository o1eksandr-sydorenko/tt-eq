"use client";

import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../styles/theme";
import "../styles/globals.css";
import Layout from "../components/common/Layout";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>{children}</Layout>
          </ThemeProvider>
        </ApolloProvider>
      </body>
    </html>
  );
};

export default RootLayout;
