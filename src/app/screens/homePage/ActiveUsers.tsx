import React from "react";
import { Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
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

/** Redux Slice & Selector */
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);
  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active Users</Box>
          <Stack className="cards-frame">
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((member: Member) => {
                  const imagePath = `${serverApi}/${member.memberImage}`;
                  return (
                    <Card
                      variant="outlined"
                      sx={{
                        width: 280,
                        height: "100%",
                        // to make the card resizable
                        overflow: "auto",
                        resize: "horizontal",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Avatar src={imagePath} sx={{ "--Avatar-size": "88px" }} />
                        <AvatarGroup size="sm" sx={{ "--Avatar-size": "28px" }}>
                          <Avatar src="/img/avatar/2.jpg" />
                          <Avatar src="/img/avatar/3.jpg" />
                          <Avatar src="/img/avatar/4.jpg" />
                          <Avatar>+1K</Avatar>
                        </AvatarGroup>
                      </Box>
                      <CardContent>
                        <Typography level="title-lg">
                          {member.memberNick}
                        </Typography>
                      </CardContent>
                      <CardActions buttonFlex="0 1 120px">
                        <IconButton
                          variant="solid"
                          color="neutral"
                          sx={{ mr: "auto",backgroundColor: "red"}}
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
                <Box className="no-data">No Active Users!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
