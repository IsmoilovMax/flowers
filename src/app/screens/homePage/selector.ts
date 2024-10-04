import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";


const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveSale = createSelector(
    selectHomePage,
    (HomePage) => HomePage.sale
);

export const retrieveFlower = createSelector(
    selectHomePage,
    (HomePage) => HomePage.flower
);

export const retrieveGift = createSelector(
    selectHomePage,
    (HomePage) => HomePage.gift
);

export const retrieveTopUsers = createSelector(
    selectHomePage,
    (HomePage) => HomePage.topUsers
);