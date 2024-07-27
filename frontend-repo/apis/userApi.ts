import app from "@/config";
import { getUserFailure, updateUserFailure } from "@/store/actions";
import store from "@/store/store";
import axios from "axios";
import { getAuth } from "firebase/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const updateUserData = async (
  userId: string,
  name?: string,
  email?: string
) => {
  try {
    const auth = getAuth(app);
    const token = await auth.currentUser?.getIdToken();

    const response = await axios.put(
      `${API_URL}/update-user-data`,
      { userId, name, email },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error: any) {
    const errorMsg = error.response
      ? error.response.data.message
      : "An unexpected error occurred";
    store.dispatch(updateUserFailure(errorMsg));
  }
};

export const fetchUserData = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/fetch-user-data/${userId}`);

    return response.data;
  } catch (error: any) {
    const errorMsg = error.response
      ? error.response.data.message
      : "An unexpected error occurred";
    store.dispatch(getUserFailure(errorMsg));
  }
};
