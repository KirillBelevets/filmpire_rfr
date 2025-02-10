import React, { useState, useEffect } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";

import { setUser, userSelector } from "../../features/auth";
import { Sidebar, Search } from "..";
import { fetchToken, createSessionId, moviesApi } from "../../utils";

import useStyles from "./styles";

const NavBar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();
  const dispatch = useDispatch();

  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: UserData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );

          dispatch(setUser(UserData));
        } else {
          const sessionId = await createSessionId();

          const { data: UserData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );

          dispatch(setUser(UserData));
        }
      }
    };

    logInUser();
  }, [token]);

  return (
    <>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          {!isAuthenticated ? (
            <Button
              color="inherit"
              onClick={() => {
                fetchToken();
              }}
            >
              Login &nbsp; <AccountCircle />
            </Button>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to={`/profile/${user.id}`}
              className={classes.linkButton}
              onClick={() => {}}
            >
              {!isMobile && <>My Movies &nbsp;</>}
              <Avatar
                style={{ width: 30, height: 30 }}
                alt="Profile"
                src="https://toolset.com/wp-content/uploads/2018/06/909657-profile_pic.png"
              />
            </Button>
          )}
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
