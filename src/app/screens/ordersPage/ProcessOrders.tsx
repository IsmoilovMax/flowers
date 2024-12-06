import React from "react";
import { Box, Stack, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { useSelector } from "react-redux";
import { Messages, serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { useGlobals } from "../../hooks/useGlobals";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

/** Redux slice & Selector */
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders })
);

interface ProcessOrdersProps {
  setValue: (input: string) => void;
}

export default function ProcessOrders(props: ProcessOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { processOrders } = useSelector(processOrdersRetriever);

  /**Handlers */
  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirmation = window.confirm("Have you received the order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrders(input);
        setValue("3");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"2"}>
      <Stack spacing={4} sx={{ padding: 2 }}>
        {processOrders?.map((order: Order) => (
          <Box
            key={order._id}
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              padding: 2,
              boxShadow: 3,
              backgroundColor: "#f9f9f9",
              transition: "0.3s",
              "&:hover": {
                boxShadow: 6,
              },
            }}
          >
            <Box sx={{ overflowY: "auto", maxHeight: "300px", marginBottom: 2 }}>
              {order?.orderItems?.map((item: OrderItem) => {
                const product: Product = order.productData.find(
                  (ele: Product) => item.productId === ele._id
                )!;
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <Box
                    key={item._id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 2,
                      borderBottom: "1px solid #e0e0e0",
                      paddingBottom: 1,
                    }}
                  >
                    <img
                      src={imagePath}
                      alt={product.productName}
                      style={{ borderRadius: "8px", width: "80px", height: "80px" }}
                    />
                    <Box sx={{ flexGrow: 1, marginLeft: 2 }}>
                      <p className={"title-dish"}>{product.productName}</p>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: 1,
                        }}
                      >
                        <p style={{ fontWeight: "bold" }}>${item.itemPrice}</p>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={"/icons/close.svg"}
                            alt="Remove"
                            style={{ cursor: "pointer", marginRight: "8px" }}
                          />
                          <p>{item.itemQuantity}</p>
                          <img
                            src={"/icons/pause.svg"}
                            alt="Pause"
                            style={{ cursor: "pointer", marginLeft: "8px" }}
                          />
                          <p style={{ marginLeft: "15px", fontWeight: "bold" }}>
                            ${(item.itemQuantity * item.itemPrice).toFixed(2)}
                          </p>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: 2,
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginBottom: 1,
                }}
              >
                <p>Product price</p>
                <p>${(order.orderTotal - order.orderDelivery).toFixed(2)}</p>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginBottom: 1,
                }}
              >
                <p>Delivery cost</p>
                <p>${order.orderDelivery.toFixed(2)}</p>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginBottom: 1,
                }}
              >
                <p>Total</p>
                <p>${order.orderTotal.toFixed(2)}</p>
              </Box>
              <p className={"data-compl"}>
                {moment().format("YY-MM-DD HH:mm")}
              </p>
              <Button
                value={order._id}
                variant="contained"
                color="primary"
                onClick={finishOrderHandler}
                sx={{
                  marginTop: 2,
                  padding: "8px 16px",
                  borderRadius: 2,
                  backgroundColor: "#4caf50",
                  "&:hover": { backgroundColor: "#388e3c" },
                }}
              >
                Verify to Fulfil
              </Button>
            </Box>
          </Box>
        ))}

        {!processOrders || (processOrders.length === 0 && (
          <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
            <img
              src={"/icons/noimage-list.svg"}
              style={{ width: 300, height: 300 }}
              alt="No orders"
            />
          </Box>
        ))}
      </Stack>
    </TabPanel>
  );
}
