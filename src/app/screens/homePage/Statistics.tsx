import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";

export default function Statistics() {
  return (
    <div className="static-frame">
      <Container>
        <Stack className="info">
          <Stack className="static-box">
            <Box className="static-num">101+</Box>
            <Box className="static-text">Flowers Available</Box>
          </Stack>

          <Divider height="64" width="2" bg="#B0C4DE" />

          <Stack className="static-box">
            <Box className="static-num">8</Box>
            <Box className="static-text">Years of Experience</Box>
          </Stack>

          <Divider height="64" width="2" bg="#B0C4DE" />

          <Stack className="static-box">
            <Box className="static-num">50+</Box>
            <Box className="static-text">Bouquet Styles</Box>
          </Stack>

          <Divider height="64" width="2" bg="#B0C4DE" />

          <Stack className="static-box">
            <Box className="static-num">200+</Box>
            <Box className="static-text">Happy Clients</Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
