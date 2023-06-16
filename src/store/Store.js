import { configureStore } from "@reduxjs/toolkit";
import { reducer as formReducer } from "redux-form";
// import ApiService from "../services/ApiService";
import UserSlice from "./slices/UserSlice";

const store = configureStore({
    reducer: {
        user: UserSlice,
        form: formReducer
    },
    // middleware: getDefaultMiddleware => getDefaultMiddleware({
    //     thunk: {
    //         extraArgument: ApiService,
    //     }
    // })
});

export default store;