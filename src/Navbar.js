import React, { useState, useCallback, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ loggedIn, logout }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  // Update background style based on mode
  const updateBackground = useCallback(() => {
    const body = document.body;
    body.style.background = darkMode
      ? "linear-gradient(135deg, #00415A, #E4E5E6)"
      : "#f5f5f5"; // Off-white for light mode
  }, [darkMode]);

  useEffect(() => {
    updateBackground(); // Invoke the function when `darkMode` changes
  }, [darkMode, updateBackground]);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Handle logout
  const handleLogout = () => {
    logout(); // Call logout function from props
    navigate("/login"); // Redirect to login page after logout
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          background: darkMode
            ? "linear-gradient(135deg, #00416A, #E4E5E6)"
            : "#fff",
          color: darkMode ? "#fff" : "#000",
        }}
      >
        <Toolbar>
          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            PharmacyApp
          </Typography>

          {/* Links (visible only when logged in) */}
          {loggedIn && (
            <>
              <Typography
                variant="body1"
                sx={{ mx: 2, cursor: "pointer" }}
                onClick={() => navigate("/products")}
              >
                Products
              </Typography>
              <Typography
                variant="body1"
                sx={{ mx: 2, cursor: "pointer" }}
                onClick={() => navigate("/orders")}
              >
                Orders
              </Typography>
              <Typography
                variant="body1"
                sx={{ mx: 2, cursor: "pointer" }}
                onClick={() => navigate("/users")}
              >
                Users
              </Typography>
            </>
          )}

          {/* Search */}
          <TextField
            size="small"
            placeholder="Search..."
            sx={{
              mx: 2,
              backgroundColor: darkMode ? "#fff" : "#f0f0f0",
              borderRadius: 1,
              width: "200px",
            }}
          />

          {/* Toggle Dark/Light Mode */}
          <Button
            variant="contained"
            onClick={toggleDarkMode}
            sx={{
              mx: 2,
              backgroundColor: darkMode ? "#00bfa5" : "#4caf50",
              color: "#fff",
            }}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>

          {/* Profile Icon */}
          <IconButton color="inherit" onClick={handleProfileMenuOpen}>
            <AccountCircle />
          </IconButton>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {loggedIn && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
