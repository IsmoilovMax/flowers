import React from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import { Order, OrderItem } from "../../../lib/types/order";

/** Redux slice & Selector */
const finishOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishOrdersRetriever);

  return (
    <TabPanel value={"3"}>
      <Stack spacing={4} sx={{ padding: 2 }}>
        {finishedOrders?.map((order: Order) => (
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
            <Box
              sx={{ overflowY: "auto", maxHeight: "300px", marginBottom: 2 }}
            >
              {order?.orderItems?.map((item: OrderItem) => {
                // Find product corresponding to the item
                const product: Product | undefined = order.productData?.find(
                  (ele: Product) => item.productId === ele._id
                );

                // Check if the product and productImages exist
                if (product && product.productImages?.length > 0) {
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
                        style={{
                          borderRadius: "8px",
                          width: "80px",
                          height: "80px",
                        }}
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
                          <p style={{ fontWeight: "bold" }}>
                            ${item.itemPrice}
                          </p>
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
                            <p
                              style={{ marginLeft: "15px", fontWeight: "bold" }}
                            >
                              ${(item.itemQuantity * item.itemPrice).toFixed(2)}
                            </p>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  );
                } else {
                  // Handle case when product or images are missing
                  return (
                    <Box key={item._id}>
                      <p>Product details or images not available.</p>
                    </Box>
                  );
                }
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
            </Box>
          </Box>
        ))}

        {/* No finished orders message */}
        {!finishedOrders ||
          (finishedOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src={"/icons/noimage-list.svg"}
                style={{ width: 300, height: 300 }}
                alt="No finished orders"
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
