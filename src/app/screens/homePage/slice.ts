import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";


const initialState: HomePageState = {
    sale: [],
    flower: [],
    gift: [],
    topUsers: [],
};
// bitt argument : options
const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    //malumotlardi ozgartirish : action.payload amalga oshadi.
    //state = initialState, action = slice: data payload ichida datamiz boladi.
    reducers: {
        setSale: (state, action) => {
            state.sale = action.payload;
        },
        setFlower: (state, action) => {
            state.flower = action.payload;
        },
        setGift: (state, action) => {
            state.gift = action.payload;
        },
        setTopUsers: (state, action) => {
            state.topUsers = action.payload
        },
    },

});

export const { setSale, setFlower, setGift, setTopUsers} = homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;