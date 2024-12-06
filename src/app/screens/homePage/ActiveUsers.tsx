import React from "react";
import { Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy";
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";
import { retrieveTopUsers } from "./selector";
import Avatar from "@mui/joy/Avatar";
import AvatarGroup from "@mui/joy/AvatarGroup";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);
  return (
    <div className="active-users-frame" style={{ marginBottom: "90px" }}>
      <Container sx={{ py: 4 }}>
        <Stack className="main">
          <Typography
            component="div"
            sx={{
              mb: 3,
              textAlign: "center",
              fontFamily: "Roboto Serif",
              fontSize: "36px",
              fontWeight: 600,
              lineHeight: "normal",
              letterSpacing: "1.44px",
              color: "#000",
              marginBottom: "60px", // Adjusted to use marginBottom correctly
            }}
          >
            Active Users
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            className="cards-frame"
          >
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((member: Member) => {
                  const imagePath = `${serverApi}/${member.memberImage}`;
                  return (
                    <Card
                      variant="outlined"
                      sx={{
                        width: 300,
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                      key={member._id} // Make sure to use a unique key
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          p: 2,
                        }}
                      >
                        <Avatar
                          src={imagePath}
                          sx={{ width: 88, height: 88 }}
                        />
                        <AvatarGroup size="sm" sx={{ "--Avatar-size": "28px" }}>
                          <Avatar src="/img/avatar/2.jpg" />
                          <Avatar src="/img/avatar/3.jpg" />
                          <Avatar src="/img/avatar/4.jpg" />
                          <Avatar>+1K</Avatar>
                        </AvatarGroup>
                      </Box>
                      <CardContent sx={{ padding: "16px" }}>
                        <Typography
                          level="title-lg"
                          sx={{ textAlign: "center", fontWeight: "600" }}
                        >
                          {member.memberNick}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{ justifyContent: "space-around", pb: 2 }}
                      >
                        <IconButton
                          variant="solid"
                          color="neutral"
                          sx={{
                            backgroundColor: "red",
                            "&:hover": { backgroundColor: "#f0f0f0" },
                          }}
                        >
                          <FavoriteBorder />
                        </IconButton>
                        <Button variant="outlined" color="neutral">
                          View
                        </Button>
                        <Button variant="solid" color="primary">
                          Join
                        </Button>
                      </CardActions>
                    </Card>
                  );
                })
              ) : (
                <Box
                  className="no-data"
                  sx={{ textAlign: "center", width: "100%", mt: 2 }}
                >
                  No Active Users!
                </Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
