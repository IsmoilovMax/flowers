/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import {
  Box,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Button,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { useEffect, useState } from "react";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onDelete,
    onDeleteAll,
    onRemove,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;
  const { authMember } = useGlobals();

  /** HANDLERS */

  return (
    <div>
      {/* Header / Navbar */}
      <header>
        <nav className="navbar">
          <NavLink to="/" className="nav-logo">
            <h2 className="logo-text">🌹 Flowers</h2>
          </NavLink>

          <ul className="nav-menu">
            <button id="menu-close-button" className="fas fa-times"></button>

            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/products" className="nav-link">
                Products
              </NavLink>
            </li>
            {authMember ? (
              <li className={"hover-line"}>
                <NavLink to="/orders" className="nav-link">
                  Orders
                </NavLink>
              </li>
            ) : null}
            {authMember ? (
              <li className="nav-item">
                <NavLink to="#menu" className="nav-link">
                  My page
                </NavLink>
              </li>
            ) : null}

            <li className="nav-item">
              <NavLink to="/help" className="nav-link">
                Help
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            </li>
            <Basket
              cartItems={cartItems}
              onRemove={onRemove}
              onAdd={onAdd}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />
            {!authMember ? (
              <Box>
                <Button
                  variant="contained"
                  className="login-button"
                  onClick={() => setLoginOpen(true)}
                  sx={{
                    background: "#f3961c",
                    color: "white",
                    margin: "-6px",
                  }}
                >
                  Login
                </Button>
              </Box>
            ) : (
              <img
                className="user-avatar"
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember?.memberImage}`
                    : "/icons/default-user.svg"
                }
                aria-haspopup={"true"}
                onClick={handleLogoutClick}
              />
            )}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              onClick={handleCloseLogout}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
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
              <MenuItem onClick={handleLogoutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "blue" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </ul>

          <button id="menu-open-button" className="fas fa-bars"></button>
        </nav>
      </header>

      <main>
        {/* Hero section */}
        <section className="hero-section">
          <div className="section-content">
            <div className="hero-details">
              <h2 className="title">The Best Flowers</h2>
              <h3 className="subtitle">
                Make your day great with our special Flowers!
              </h3>
              <p className="description">
                Welcome to our flower paradise, where every petal tells a story
                of love and kindness.
              </p>

              <div className="buttons">
                <Box
                  className="button sign-up"
                  onClick={() => setSignupOpen(true)}
                >
                  SIGN UP
                </Box>

                <a
                  href="#contact"
                  className="button contact-us"
                  // onClick={() => setOpen(true)}
                >
                  Contact Us
                </a>
              </div>
            </div>
            <div className="hero-image-wrapper">
              <img
                src="/img/images/images.png.png"
                alt="flowers"
                className="hero-image"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
