import {createAsyncThunk, createSlice, isAnyOf, isFulfilled, PayloadAction} from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { appActions } from "app/app.reducer";
import { authAPI } from "features/auth/api/auth.api";
import { clearTasksAndTodolists } from "common/actions";
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from "common/utils";
import {AnyAction, Dispatch} from "redux";
import {LoginParamsType} from "../ui/Login";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    // setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
    //   state.isLoggedIn = action.payload.isLoggedIn;
    // },
  },
    extraReducers: (builder) => {

      builder
          // .addCase(login.fulfilled, (state, action) => {
          //     state.isLoggedIn = action.payload.isLoggedIn;
          // })
          // .addCase(logout.fulfilled, (state, action) => {
          //     state.isLoggedIn = action.payload.isLoggedIn;
          // })
          // .addCase(initializeApp.fulfilled, (state, action) => {
          //     state.isLoggedIn = action.payload.isLoggedIn;
          // })
          .addMatcher(
              // (action: AnyAction) => {
              //     if (
              //         action.type === "auth/login/fulfilled" ||
              //         action.type === "auth/logout/fulfilled" ||
              //         action.type === "auth/initializeApp/fulfilled"
              //
              //     ) {
              //         return true;
              //     } else {
              //         return false;
              //     }
              // },
              isAnyOf(authThunks.logout.fulfilled, authThunks.login.fulfilled, authThunks.initializeApp.fulfilled),
                      (state, action: AnyAction) => {
                  state.isLoggedIn = action.payload.isLoggedIn;
              }

          )
    }
});


// thunks

// export const loginTC =  (data: LoginParamsType): AppThunk =>  (dispatch) => {
//     dispatch(appActions.setAppStatus({ status: "loading" }));
//     authAPI
//       .login(data)
//       .then((res) => {
//         if (res.data.resultCode === 0) {
//           dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
//           dispatch(appActions.setAppStatus({ status: "succeeded" }));
//         } else {
//           handleServerAppError(res.data, dispatch);
//         }
//       })
//       .catch((error) => {
//         handleServerNetworkError(error, dispatch);
//       });
//   };

export const login =  createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType> (
    "auth/login",
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            // dispatch(appActions.setAppStatus({ status: "loading" }));
            const res = await authAPI.login(arg)
            if (res.data.resultCode === 0) {
                // dispatch(appActions.setAppStatus({ status: "succeeded" }));
                return { isLoggedIn: true };
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }

        }  catch(e) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
        };
    }
)

export const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined> (
    "auth/logout",
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            // dispatch(appActions.setAppStatus({ status: "loading" }));
            const res = await authAPI.logout()
            if (res.data.resultCode === 0) {
                dispatch(clearTasksAndTodolists());
                // dispatch(appActions.setAppStatus({ status: "succeeded" }));
                return { isLoggedIn: false };
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }
        }
        catch (e) {
            return rejectWithValue(null);
        }
    }


)


//
// export const logoutTC = (): AppThunk => (dispatch) => {
//   dispatch(appActions.setAppStatus({ status: "loading" }));
//   authAPI
//     .logout()
//     .then((res) => {
//       if (res.data.resultCode === 0) {
//         dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
//         dispatch(clearTasksAndTodolists());
//         dispatch(appActions.setAppStatus({ status: "succeeded" }));
//       } else {
//         handleServerAppError(res.data, dispatch);
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch);
//     });
// };

// export const initializeAppTC = () => (dispatch: Dispatch) => {
//     authAPI.me().then((res) => {
//         if (res.data.resultCode === 0) {
//             dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
//         } else {
//         }
//
//         dispatch(appActions.setAppInitialized({ isInitialized: true }));
//     });
// };

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean },undefined>(
    "auth/initializeApp",
    async (_, thunkAPI)=>{
        const {dispatch, rejectWithValue} = thunkAPI;

        try {
            const res = await authAPI.me()
                if (res.data.resultCode === 0) {
                  return { isLoggedIn: true }
                }
                else {
                    return rejectWithValue(null)
                }
            }
            catch (e) {
                handleServerNetworkError(e, dispatch);
                return rejectWithValue(null);
            }
            finally {
            dispatch(appActions.setAppInitialized({ isInitialized: true }));
        }
        }


)

export const authSlice = slice.reducer;
export const authActions = slice.actions;
export const authThunks = {initializeApp, logout, login}