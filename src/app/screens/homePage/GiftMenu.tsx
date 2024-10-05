import React from "react";
import Card from "@mui/joy/Card";
import { CssVarsProvider } from "@mui/joy/styles";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Box, Container, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { retrieveGift } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import GiftCart from "./GiftCart";
import { CartItem } from "../../../lib/types/search";

/** Redux slice & Selector */

const retrieveGiftMenu = createSelector(retrieveGift, (gift) => ({ gift }));

interface GiftsProps {
  onAdd: (item: CartItem) => void;
}

export default function Gift(props: GiftsProps) {
  const { gift } = useSelector(retrieveGiftMenu);
  const { onAdd } = props;

  console.log("gift:", gift);

  return (
    <Stack className="flowers">
      <Stack className="container">
        <Stack className="info-box">
          <Box className="left">
            <span>Gifts</span>
            <p style={{ textAlign: "center" }}>New arrival</p>
          </Box>
        </Stack>
        <Stack className="card-box">
          {gift.length === 0 ? (
            <Box>No sales available</Box>
          ) : (
            gift.map((gift) => (
              <Box className="popular-property-slide" key={gift._id}>
                <GiftCart gift={gift} onAdd={onAdd} />
              </Box>
            ))
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
