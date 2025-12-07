import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer from "./calculatorSlice";

// Configure the Redux store with the calculator reducer
const store = configureStore({
    reducer: {
        calculator: calculatorReducer,
    },
});

export default store;