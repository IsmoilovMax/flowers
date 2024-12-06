import React, { useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { setChosenProduct, setRestaurant } from "./slice";
import { Product } from "../../../lib/types/product";
import { retrieveChosenProduct, retrieveRestaurant } from "./selector";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";

/** Redux Slice & Selector */
const actionDispatch = (dispatch: Dispatch) => ({
  setRestaurant: (data: MemberService) => dispatch(setRestaurant(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({ chosenProduct })
);
const restaurantRetriever = createSelector(
  retrieveRestaurant,
  (restaurant) => ({ restaurant })
);

interface ChosenProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductsProps) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>();
  const { setRestaurant, setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { restaurant } = useSelector(restaurantRetriever);

  useEffect(() => {
    const product = new ProductService();
    product
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getRestaurant()
      .then((data) => setRestaurant(data))
      .catch((err) => console.log(err));
  }, []);

  if (!chosenProduct) return null;

  return (
    <div className={"chosen-product"}>
      <Box className={"title"} sx={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>
        Product Detail
      </Box>
      <Container className={"product-container"} sx={{ display: "flex", gap: "30px", flexDirection: { xs: "column", md: "row" } }}>
        <Stack className={"chosen-product-slider"} sx={{ flex: 1 }}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProduct?.productImages.map((ele: string, index: number) => {
              const imagePath = `${serverApi}/${ele}`;
              return (
                <SwiperSlide key={index}>
                  <img className="slider-image" src={imagePath} style={{ width: "100%", borderRadius: "10px" }} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>

        <Stack className={"chosen-product-info"} sx={{ flex: 1, padding: "20px", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }}>
          <Box className={"info-box"} sx={{ marginBottom: "20px" }}>
            <strong className={"product-name"} style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "10px" }}>{chosenProduct?.productName}</strong>
            <span className={"resto-name"} style={{ display: "block", color: "#666", fontSize: "0.9rem" }}>{restaurant?.memberNick}</span>
            <span className={"resto-phone"} style={{ display: "block", color: "#666", fontSize: "0.9rem", marginBottom: "15px" }}>{restaurant?.memberPhone}</span>

            <Box className={"rating-box"} sx={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <div className={"evaluation-box"} style={{ marginLeft: "10px", display: "flex", alignItems: "center" }}>
                <RemoveRedEyeIcon sx={{ marginRight: "5px" }} />
                <span>{chosenProduct?.productViews}</span>
              </div>
            </Box>

            <p className={"product-desc"} style={{ marginBottom: "20px", color: "#666" }}>
              {chosenProduct?.productDesc ? chosenProduct?.productDesc : "No Description"}
            </p>

            <Divider height="1" width="100%" bg="#000" />

            <div className={"product-price"} style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", fontWeight: "600" }}>
              <span>Price:</span>
              <span>${chosenProduct?.productPrice}</span>
            </div>

            <div className={"button-box"} style={{ marginTop: "30px", textAlign: "center" }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#ff5722", color: "#fff", "&:hover": { backgroundColor: "#e64a19" } }}
                onClick={(e) => {
                  onAdd({
                    _id: chosenProduct._id,
                    quantity: 1,
                    name: chosenProduct.productName,
                    price: chosenProduct.productPrice,
                    image: chosenProduct.productImages[0],
                  });
                  e.stopPropagation();
                }}
              >
                Add To Basket
              </Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
