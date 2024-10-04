import React from "react";
import { Stack, Box, Divider, Typography, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";

interface SaleCardProps {
  sale: Product;
  onAdd: (item: CartItem) => void;
}

const SaleCard: React.FC<SaleCardProps> = ({ sale, onAdd }) => {
  const imagePath = `${serverApi}/${sale.productImages[0]}`;

  const handleAddToCart = () => {
    const item: CartItem = {
      _id: sale._id,
      quantity: 1,
      name: sale.productName,
      price: sale.productPrice,
      image: sale.productImages[0],
    };
    onAdd(item); // onAdd funksiyasini chaqirish
  };

  return (
    <Stack
      className="popular-card-box"
      sx={{
        width: "350px",
        height: "280px",
      }}
    >
      <Box
        className={"card-img"}
        style={{
          backgroundImage: `url(${imagePath})`,
        }}
        sx={{
          width: "100%",
          height: "150px",
        }}
      >
        <div className={"status"}>
          <img src="/img/icons/electricity.svg" alt="" />
          <span>Sale</span>
        </div>
        <div className={"price"}>${sale.productPrice}</div>
      </Box>
      <Box className={"info"} sx={{ padding: "10px" }}>
        <strong style={{ textAlign: "center" }} className={"title"}>
          {sale.productName}
        </strong>
        <Button
          onClick={handleAddToCart}
          sx={{
            background: "rgb(198 0 255 / 66%)",
            color: "rgba(255, 255, 255, 1)",
            width: "210px",
            height: "38px",
            borderRadius: "7px",
            marginTop: "20px",
            fontFamily: "Museo Sans Cyrl",
            "&:hover": {
              backgroundColor: "rgba(149, 109, 132, 1)", // No hover change
            },
          }}
        >
          Add to cart
        </Button>
        <Divider sx={{ mt: "15px", mb: "17px" }} />
        <div className={"bott"}>
          <div className="view-like-box">
            <IconButton color={"default"}>
              <RemoveRedEyeIcon />
            </IconButton>
            <Typography className="view-cnt">{sale.productViews}</Typography>
            <IconButton color={"default"}>
              <FavoriteIcon style={{ color: "red" }} />
            </IconButton>
            <Typography className="view-cnt">2</Typography>
          </div>
        </div>
      </Box>
    </Stack>
  );
};

export default SaleCard;
