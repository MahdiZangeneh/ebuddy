"use client";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  Container,
  Button,
  CssBaseline,
  Typography,
  ThemeProvider,
  Paper,
  Box,
  TextField,
} from "@mui/material";
import theme from "../theme/theme";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserFailure,
  getUserRequest,
  getUserSuccess,
  updateUserFailure,
  updateUserRequest,
  updateUserSuccess,
} from "@/store/actions";
import { fetchUserData, updateUserData } from "@/apis/userApi";
import { RootState } from "@/store/store";

const Home = () => {
  const auth = getAuth();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch(getUserRequest());
        const user = await fetchUserData("1");
        dispatch(getUserSuccess(user.data));
      } catch (error: any) {
        dispatch(getUserFailure(error.message));
      }
    };

    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error: any) {
      console.log("Error signing out:", error.message);
    }
  };

  const handleUserUpdate = async () => {
    try {
      dispatch(updateUserRequest());
      const user = await updateUserData("1", name, email);
      if (user?.data) {
        dispatch(updateUserSuccess(user?.data));
      }
    } catch (error: any) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <CssBaseline />
        <Paper>
          <Typography component="h1" variant="h5">
            {user ? state?.userData?.name : "Guest"}
          </Typography>
          {state.loading && <p>Loading...</p>}
          <Box component="form" sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              placeholder="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleEmailChange}
              defaultValue={state?.userData?.email}
            />
            <TextField
              margin="normal"
              fullWidth
              name="name"
              placeholder="Name"
              id="name"
              autoComplete="name"
              onChange={handleNameChange}
              defaultValue={state?.userData?.name}
            />
            <Button
              onClick={handleUserUpdate}
              type="button"
              fullWidth
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </Box>
          <Button
            onClick={handleLogout}
            fullWidth
            variant="outlined"
            color="secondary"
          >
            Logout
          </Button>
          {state?.error && (
            <Typography component="h3" variant="h5" color="secondary">
              {state.error}
            </Typography>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
