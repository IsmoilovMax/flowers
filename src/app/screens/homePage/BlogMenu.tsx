import { Box, Stack } from "@mui/material";
import React from "react";

export default function Blog() {
  return (
    <Stack sx={{height: "800px"}}>
      <Box className="category-title">Blog Menu</Box>
      <div className="container">
        <div className="row align-items-stretch retro-layout">
          <div className="col-md-4">
            <a href="#" className="h-entry mb-30 v-height gradient">
              <div
                className="featured-img"
                style={{
                  backgroundImage: "url(/img/blog/11.jpg)",
                }}
              ></div>
              <div className="text">
                <span className="date">Apr. 14th, 2024</span>
                <h2>
                  What flowers are prohibited: what not to give as a gift.
                </h2>
              </div>
            </a>

            <a href="#" className="h-entry v-height gradient">
              <div
                className="featured-img"
                style={{
                  backgroundImage: "url('img/blog/12.jpg')",
                }}
              ></div>
              <div className="text">
                <span className="date">June. 21th, 2024</span>
                <h2>How to Keep a Bouquet Fresh: Tips and Recommendations</h2>
              </div>
            </a>
          </div>

          <div className="col-md-4">
            <a href="#" className="h-entry img-5 h-100 gradient">
              <div
                className="featured-img"
                style={{
                  backgroundImage: "url('/img/blog/13.jpg')",
                }}
              ></div>
              <div className="text">
                <span className="date">Sep. 23th, 2024</span>
                <h2>Floral Etiquette - How to Properly Give Flowers</h2>
              </div>
            </a>
          </div>

          <div className="col-md-4">
            <a href="#" className="h-entry mb-30 v-height gradient">
              <div
                className="featured-img"
                style={{
                  backgroundImage: "url('img/blog/14.jpg')",
                }}
              ></div>
              <div className="text">
                <span className="date">Oct. 05th, 2024</span>
                <h2>Symbolism of Flowers</h2>
              </div>
            </a>

            <a href="#" className="h-entry v-height gradient">
              <div
                className="featured-img"
                style={{
                  backgroundImage: "url('img/blog/15.jpg')",
                }}
              ></div>
              <div className="text">
                <span className="date">July. 03th, 2024</span>
                <h2>DIY Flower Projects</h2>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Stack>
  );
}
