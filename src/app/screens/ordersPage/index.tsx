import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { useState, SyntheticEvent, useEffect } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { useDispatch } from "react-redux";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/order.css";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

/** Redux Slice & Selector*/
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const { authMember, orderBuilder } = useGlobals();
  const history = useHistory();
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });
  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  /**Handlers */

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) history.push("/");

  return (
    <>
      <div className={"order-page"}>
        <Container className="order-container">
          <Stack className={"order-left"}>
            <TabContext value={value}>
              <Box className={"order-nav-frame"}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    className={"table_list"}
                  >
                    <Tab label="PAUSED ORDERS" value={"1"} />
                    <Tab label="PROCESS ORDERS" value={"2"} />
                    <Tab label="FINISHED ORDERS" value={"3"} />
                  </Tabs>
                </Box>
              </Box>
              <Stack className={"order-main-content"}>
                <PausedOrders setValue={setValue} />
                <ProcessOrders setValue={setValue} />
                <FinishedOrders />
              </Stack>
            </TabContext>
          </Stack>

          <Stack spacing={3} sx={{ padding: 2 }}>
            <Box
              sx={{
                padding: 3,
                boxShadow: 3,
                backgroundColor: "#f9f9f9",
                borderRadius: 2,
                transition: "0.3s",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <div style={{ position: "relative", marginRight: 16 }}>
                  <img
                    src={
                      authMember?.memberImage
                        ? `${serverApi}/${authMember.memberImage}`
                        : "/icons/default-user.svg"
                    }
                    alt="User"
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      objectFit: "cover",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: -4,
                      right: -4,
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      padding: 4,
                    }}
                  >
                    <img
                      src={
                        authMember?.memberType === MemberType.ADMIN
                          ? "/icons/restaurant.svg"
                          : "/icons/user-badge.svg"
                      }
                      alt="User Type"
                      style={{ width: 24, height: 24 }}
                    />
                  </div>
                </div>
                <div>
                  <p style={{ fontWeight: "bold", marginBottom: 4 }}>
                    {authMember?.memberNick || "Guest"}
                  </p>
                  <p style={{ color: "#888" }}>{authMember?.memberType}</p>
                </div>
              </Box>
              <Box sx={{ borderTop: "1px solid #e0e0e0", paddingTop: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <LocationOnIcon />
                  <p style={{ marginLeft: 8 }}>
                    {authMember?.memberAddress || "No address available"}
                  </p>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                padding: 3,
                boxShadow: 3,
                backgroundColor: "#f9f9f9",
                borderRadius: 2,
                mt: 2,
              }}
            >
              <input
                type="text"
                name="cardNumber"
                placeholder="Gwandju Bank : **** 5077 1995 2023"
                className="card-input"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "15px",
                }}
              >
                <input
                  type="text"
                  name="cardPeriod"
                  placeholder="11 / 99"
                  className="card-half-input"
                  style={{
                    width: "48%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
                <input
                  type="text"
                  name="cardCVV"
                  placeholder="CVV : 070"
                  className="card-half-input"
                  style={{
                    width: "48%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </Box>
              <input
                type="text"
                name="cardCreator"
                placeholder="Samsung"
                className="card-input"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  marginBottom: "15px",
                }}
              />
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <img
                  src="/icons/paypal-card.svg"
                  alt="Paypal"
                  style={{ width: 40 }}
                />
                <img
                  src="/icons/visa-card.svg"
                  alt="Visa"
                  style={{ width: 40 }}
                />
                <img
                  src="/icons/western-card.svg"
                  alt="Western Union"
                  style={{ width: 40 }}
                />
                <img
                  src="/icons/master-card.svg"
                  alt="MasterCard"
                  style={{ width: 40 }}
                />
              </Box>
            </Box>
          </Stack>
        </Container>
      </div>
      <div className={"brands-logo"}>
        <Container>
          <Box
            className={"category-title"}
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "20px",
              color: "#333",
            }}
          >
            Our Delivery Photos
          </Box>
          <Stack
            direction="row"
            spacing={3}
            justifyContent="center"
            className={"brand-list"}
            sx={{
              flexWrap: "wrap",
              gap: 2,
              marginTop: "20px",
            }}
          >
            <Box
              className={"review-box"}
              sx={{
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                overflow: "hidden",
                width: { xs: "100%", sm: "48%", md: "24%" },
                "& img": {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                },
              }}
            >
              <img src={"/img/our/21.jpg"} alt={""} />
            </Box>
            <Box
              className={"review-box"}
              sx={{
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                overflow: "hidden",
                width: { xs: "100%", sm: "48%", md: "24%" },
                "& img": {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                },
              }}
            >
              <img src={"/img/our/22.jpg"} alt={""} />
            </Box>
            <Box
              className={"review-box"}
              sx={{
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                overflow: "hidden",
                width: { xs: "100%", sm: "48%", md: "24%" },
                "& img": {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                },
              }}
            >
              <img src={"/img/our/23.jpg"} alt={""} />
            </Box>
            <Box
              className={"review-box"}
              sx={{
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                overflow: "hidden",
                width: { xs: "100%", sm: "48%", md: "24%" },
                "& img": {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                },
              }}
            >
              <img src={"/img/our/24.jpg"} alt={""} />
            </Box>
          </Stack>
        </Container>
      </div>
    </>
  );
}
