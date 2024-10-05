import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./SaleMenu";
import FlowerMenu from "./FlowerMenu";
// import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./GiftMenu";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setSale, setFlower, setGift, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import "../../../css/home.css";
import Sale from "./SaleMenu";
import { CartItem } from "../../../lib/types/search";
import Gift from "./GiftMenu";
import Blog from "./BlogMenu";

/** Redux Slice & Selector*/
const actionDispatch = (dispatch: Dispatch) => ({
  sale: (data: Product[]) => dispatch(setSale(data)),
  flower: (data: Product[]) => dispatch(setFlower(data)),
  gift: (data: Product[]) => dispatch(setGift(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

interface ProductsPage {
  onAdd: (item: CartItem) => void;
}

export default function HomePage(props: ProductsPage) {
  const { onAdd } = props;
  const { sale, flower, gift, setTopUsers } = actionDispatch(useDispatch());

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 20,
        order: "createdAt",
        productCollection: ProductCollection.Sale,
      })
      .then((data) => {
        sale(data);
      })
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 8,
        order: "createdAt",
        productCollection: ProductCollection.Flower,
      })
      .then((data) => flower(data))
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 8,
        order: "createdAt",
        productCollection: ProductCollection.Gift,
      })
      .then((data) => gift(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <Sale onAdd = {onAdd}/>
      <FlowerMenu  onAdd={onAdd}/>
      <Gift  onAdd={onAdd}/>
      <ActiveUsers />
      <Blog />
    </div>
  );
}
