export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

interface IUserData {
  name: string;
  email: string;
}

export const updateUserRequest = () => ({ type: UPDATE_USER_REQUEST });
export const updateUserSuccess = (data: IUserData) => ({
  type: UPDATE_USER_SUCCESS,
  payload: data,
});
export const updateUserFailure = (error: string) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});

export const getUserRequest = () => ({ type: GET_USER_REQUEST });
export const getUserSuccess = (data: IUserData) => ({
  type: GET_USER_SUCCESS,
  payload: data,
});
export const getUserFailure = (error: string) => ({
  type: GET_USER_FAILURE,
  payload: error,
});
