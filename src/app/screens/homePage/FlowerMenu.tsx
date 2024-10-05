import React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { retrieveFlower } from "./selector";
import { serverApi } from "../../../lib/config";
import { Box, Container, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { retrieveSale } from "./selector";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { CartItem } from "../../../lib/types/search";
import SaleCard from "./saleCard";
import FlowerCart from "./FlowerCart";
import { Product } from "../../../lib/types/product";

/** Redux slice & Selector */

const retrieveFlowers = createSelector(retrieveFlower, (flower) => ({
  flower,
}));

interface FlowersProps {
  onAdd: (item: CartItem) => void;
}

export default function FlowerMenu(props: FlowersProps) {
  const { onAdd } = props;
  const { flower } = useSelector(retrieveFlowers);

  console.log("FlowerMenu:", FlowerMenu);

  return (
    <Stack className="flowers">
      <Stack className="container">
        <Stack className="info-box">
          <Box className="left">
            <span>Flowers</span>
            <p style={{textAlign: "center"}}>New arrival</p>
          </Box>
        </Stack>
        <Stack className="card-box">
          {flower.length === 0 ? (
            <Box>No sales available</Box>
          ) : (
            flower.map((flowers) => (
              <Box className="popular-property-slide" key={flowers._id}>
                <FlowerCart flowers={flowers} onAdd={onAdd} />
              </Box>
            ))
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
