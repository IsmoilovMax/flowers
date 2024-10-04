import React, { useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { retrieveSale } from "./selector";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { CartItem } from "../../../lib/types/search";
import SaleCard from "./saleCard";

/** Redux slice & Selector */

const retrieveSaleMenu = createSelector(retrieveSale, (sale) => ({ sale }));
interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Sale(props: ProductsProps) {
  // const { popularDishes } = useSelector(popularDishesRetriever);
  const { onAdd } = props;
  const { sale } = useSelector(retrieveSaleMenu);

  return (
    <Stack className="popular-properties">
      <Stack className="container">
        <Stack className="info-box">
          <Box className="left">
            <span>Sale Menu</span>
            <p>Sale is based on views</p>
          </Box>
        </Stack>
        <Stack className="card-box">
          <Swiper
            className="popular-property-swiper"
            slidesPerView="auto"
            spaceBetween={25}
            navigation={{
              nextEl: ".swiper-popular-next",
              prevEl: ".swiper-popular-prev",
            }}
            pagination={{
              el: ".swiper-popular-pagination",
              clickable: true,
            }}
          >
            {sale.length === 0 ? (
              <Box>No sales available</Box>
            ) : (
              sale.map((sale) => (
                <SwiperSlide className="popular-property-slide" key={sale._id}>
                  <SaleCard sale={sale} onAdd={onAdd}/>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </Stack>
      </Stack>
    </Stack>
  );
}
