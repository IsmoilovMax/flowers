import React from "react";
import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";



interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onDelete, onDeleteAll, onRemove } = props;
  const {authMember, setOrderBuilder} = useGlobals();
  const history = useHistory();
  const itemsPrice = cartItems.reduce((a: number, c: CartItem) => 
    a + c.quantity * c.price, 
  0
  );

  const shippingCost = itemsPrice < 100 ? 5 : 0;
  const totalPrice =  (itemsPrice + shippingCost).toFixed(1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const proceedOrderHandler = async() => {
    try{
      handleClose();
      if(!authMember)
        throw new Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cartItems);

      onDeleteAll();
      //Refresh via Context
      setOrderBuilder(new Date());
      history.push("/orders");
    } catch(err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  }

  return (
    <div style={{ margin: "-6px 10px" }}>
    <IconButton
      aria-label="cart"
      id="basic-button"
      aria-controls={open ? "basic-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      onClick={handleClick}
    >
      <Badge badgeContent={cartItems.length} color="secondary">
        <img src={"/icons/shopping-cart.svg"} alt="Shopping Cart" />
      </Badge>
    </IconButton>
  
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 0,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Stack className={"basket-frame"} sx={{ p: 2 }}>
        <Box className={"all-check-box"} sx={{ mb: 2 }}>
          {cartItems.length === 0 ? (
            <div>Cart is empty!</div>
          ) : (
            <Stack flexDirection={"row"} justifyContent="space-between">
              <div>Cart Products:</div>
              <DeleteForeverIcon
                sx={{ ml: "5px", cursor: "pointer" }}
                color={"primary"}
                onClick={() => onDeleteAll()}
              />
            </Stack>
          )}
        </Box>
  
        <Box className={"orders-main-wrapper"}>
          <Box className={"orders-wrapper"}>
            {cartItems.map((item: CartItem) => {
              const imagePath = `${serverApi}/${item.image}`;
              return (
                <Box className={"basket-info-box"} key={item._id} sx={{ display: "flex", alignItems: "center", mb: 1, borderBottom: "1px solid #eee", pb: 1 }}>
                  <div className={"cancel-btn"} style={{ marginRight: "10px" }}>
                    <CancelIcon color={"primary"} onClick={() => onDelete(item)} />
                  </div>
                  <img src={imagePath} alt={item.name} className={"product-img"} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }} />
                  <span className={"product-name"} style={{ flex: 1, marginLeft: "10px" }}>{item.name}</span>
                  <p className={"product-price"} style={{ margin: 0 }}>${item.price} x {item.quantity}</p>
                  <Box sx={{ minWidth: 120, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <button onClick={() => onRemove(item)} className="remove" style={{ background: "#f0f0f0", border: "none", padding: "5px 10px", cursor: "pointer" }}>-</button>
                    <button onClick={() => onAdd(item)} className="add" style={{ background: "#4caf50", color: "#fff", border: "none", padding: "5px 10px", cursor: "pointer" }}>+</button>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
  
        {cartItems.length !== 0 && (
          <Box className={"basket-order"} sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className={"price"}>Total: ${totalPrice} ({itemsPrice} + {shippingCost})</span>
            <Button onClick={proceedOrderHandler} startIcon={<ShoppingCartIcon />} variant={"contained"}>
              Order
            </Button>
          </Box>
        )}
      </Stack>
    </Menu>
  </div>
  
  );
}
function setOrderBuilder(arg0: Date) {
  throw new Error("Function not implemented.");
}

