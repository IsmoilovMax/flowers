import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Settings } from "./Settings";
import "../../../css/userPage.css";
import React from "react";
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

export default function UserPage() {
  const history = useHistory();
  const { authMember } = useGlobals();

  if (!authMember) history.push("/");

  return (
    <div className={"user-page"}>
      <Container>
        <Stack className={"my-page-frame"}>
          <Stack
            sx={{
              flex: 1,
              backgroundColor: "#f9f9f9",
              borderRadius: 2,
              p: 2,
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
            className={"my-page-left"}
          >
            <Box
              sx={{
                mb: 2,
                fontSize: "24px",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Modify Member Details
            </Box>
            <Box sx={{ p: 2 }}>
              <Settings />
            </Box>
          </Stack>

          <Stack
            sx={{
              flex: 2,
              backgroundColor: "#ffffff",
              borderRadius: 2,
              p: 3,
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
            className={"my-page-right"}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box sx={{ position: "relative", mb: 2 }}>
                <img
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember.memberImage}`
                      : "/icon/default-user.svg"
                  }
                  className={"order-user-avatar"}
                  style={{
                    borderRadius: "50%",
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "white",
                    borderRadius: "50%",
                    p: 0.5,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <img
                    src={
                      authMember?.memberType === MemberType.ADMIN
                        ? "/icons/restaurant.svg"
                        : "/icons/user-badge.svg"
                    }
                    style={{ width: "30px", height: "30px" }}
                  />
                </Box>
              </Box>

              <span
                className={"order-user-name"}
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  marginBottom: "5px",
                }}
              >
                {authMember?.memberNick}
              </span>
              <span
                className={"order-user-prof"}
                style={{ color: "#555", marginBottom: "5px" }}
              >
                {authMember?.memberType}
              </span>
              <span className={"order-user-prof"} style={{ color: "#777" }}>
                {authMember?.memberAddress
                  ? authMember.memberAddress
                  : "no address"}
              </span>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <FacebookIcon
                sx={{
                  color: "#3b5998",
                  mx: 1,
                  fontSize: "30px",
                  "&:hover": { color: "#2d4373" },
                }}
              />
              <InstagramIcon
                sx={{
                  color: "#E1306C",
                  mx: 1,
                  fontSize: "30px",
                  "&:hover": { color: "#c32aa3" },
                }}
              />
              <TelegramIcon
                sx={{
                  color: "#0088cc",
                  mx: 1,
                  fontSize: "30px",
                  "&:hover": { color: "#007bb5" },
                }}
              />
              <YouTubeIcon
                sx={{
                  color: "#FF0000",
                  mx: 1,
                  fontSize: "30px",
                  "&:hover": { color: "#cc0000" },
                }}
              />
            </Box>

            <p
              className={"user-desc"}
              style={{ textAlign: "center", color: "#333", marginTop: 2 }}
            >
              {authMember?.memberDesc
                ? authMember.memberDesc
                : "No description"}
            </p>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
