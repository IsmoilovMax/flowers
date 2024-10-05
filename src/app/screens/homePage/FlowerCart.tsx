import React from "react";
import { Stack, Box, Divider, Typography, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";

interface FlowersProps {
  flowers: Product;
  onAdd: (item: CartItem) => void;
}

const FlowerCart: React.FC<FlowersProps> = ({ flowers, onAdd }) => {
  const imagePath = `${serverApi}/${flowers.productImages[0]}`;

  const handleAddToCart = () => {
    const item: CartItem = {
      _id: flowers._id,
      quantity: 1,
      name: flowers.productName,
      price: flowers.productPrice,
      image: flowers.productImages[0],
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
        {/* <div className={"status"}>
          <img src="/img/icons/electricity.svg" alt="" />
          <span>Sale</span>
        </div> */}
        <div className={"price"}>${flowers.productPrice}</div>
      </Box>
      <Box className={"info"} sx={{ padding: "10px" }}>
        <strong style={{ textAlign: "center" }} className={"title"}>
          {flowers.productName}
        </strong>
        <Button
          onClick={handleAddToCart}
          sx={{
            background: "#eb6753",
            color: "#fff",
            width: "210px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            height: "38px",
            borderRadius: "10%",
            marginLeft: "9px",
            marginTop: "5px",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            "&:hover": {
              backgroundColor: "#FFD700", // No hover change
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
            <Typography className="view-cnt">{flowers.productViews}</Typography>
            <IconButton color={"default"}>
              <FavoriteIcon style={{ color: "red" }} />
            </IconButton>
            <Typography className="view-cnt">5</Typography>
          </div>
        </div>
      </Box>
    </Stack>
  );
};

export default FlowerCart;
