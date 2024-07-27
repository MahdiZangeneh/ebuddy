"use client";
import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  Container,
  Button,
  Typography,
  CssBaseline,
  Paper,
  ThemeProvider,
} from "@mui/material";
import theme from "../../theme/theme";

import app from "@/config";

const Login = () => {
  const router = useRouter();

  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error: any) {
      console.log("Error signing with Google:", error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <CssBaseline />
        <Paper
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Sign In
          </Typography>
          <Button
            onClick={signInWithGoogle}
            variant="contained"
            color="primary"
          >
            Sign in with Google
          </Button>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
