import React from "react";
import { Box, Stack, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { Messages, serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { retrievePausedOrders } from "./selector";

/** Redux slice & Selector */
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps {
  setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  /** Handlers */
  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.currentTarget.value; // Use currentTarget for better reliability
      const input: OrderUpdateInput = {
        orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = window.confirm("Do you want to delete the order?");
      if (confirmation) {
        const orderService = new OrderService();
        await orderService.updateOrders(input);
        // Rebuild Order
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.currentTarget.value; // Use currentTarget for better reliability
      const input: OrderUpdateInput = {
        orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirmation = window.confirm("Do you want to proceed with the payment?");
      if (confirmation) {
        const orderService = new OrderService();
        await orderService.updateOrders(input);
        setValue("2");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"1"}>
      <Stack spacing={4} sx={{ padding: 2 }}>
        {pausedOrders.length > 0 ? (
          pausedOrders.map((order: Order) => (
            <Box key={order._id} sx={{
              border: '1px solid #ccc',
              borderRadius: 2,
              padding: 2,
              boxShadow: 3,
              backgroundColor: '#fafafa',
              transition: '0.3s',
              '&:hover': {
                boxShadow: 6,
              },
            }}>
              <Box sx={{ overflowY: 'auto', maxHeight: '300px', marginBottom: 2 }}>
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product | undefined = order.productData.find(
                    (ele: Product) => item.productId === ele._id
                  );

                  // Ensure product is defined before using it
                  if (!product) return null; // Skip if product not found

                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: 2,
                      borderBottom: '1px solid #e0e0e0',
                      paddingBottom: 1,
                    }}>
                      <img src={imagePath} alt={product.productName} style={{ borderRadius: '8px', width: '80px', height: '80px' }} />
                      <Box sx={{ flexGrow: 1, marginLeft: 2 }}>
                        <p className={"title-dish"}>{product.productName}</p>
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: 1,
                        }}>
                          <p style={{ fontWeight: 'bold' }}>${item.itemPrice}</p>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img src={"/icons/close.svg"} style={{ cursor: 'pointer', marginRight: '8px' }} alt="Remove" />
                            <p>{item.itemQuantity}</p>
                            <img src={"/icons/pause.svg"} style={{ cursor: 'pointer', marginLeft: '8px' }} alt="Pause" />
                            <p style={{ marginLeft: "15px", fontWeight: 'bold' }}>${(item.itemQuantity * item.itemPrice).toFixed(2)}</p>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: 2,
                backgroundColor: '#fff',
                borderRadius: 2,
                boxShadow: 1,
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: 1 }}>
                  <p>Product price</p>
                  <p>${(order.orderTotal - order.orderDelivery).toFixed(2)}</p>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: 1 }}>
                  <p>Delivery cost</p>
                  <p>${order.orderDelivery.toFixed(2)}</p>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: 1 }}>
                  <p>Total</p>
                  <p>${order.orderTotal.toFixed(2)}</p>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    value={order._id}
                    variant="contained"
                    color="secondary"
                    onClick={deleteOrderHandler}
                  >
                    Cancel
                  </Button>
                  <Button
                    value={order._id}
                    variant="contained"
                    color="primary"
                    onClick={processOrderHandler}
                  >
                    Payment
                  </Button>
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
            <img src={"/icons/noimage-list.svg"} style={{ width: 300, height: 300 }} alt="No orders" />
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
