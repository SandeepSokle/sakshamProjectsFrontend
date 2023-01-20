import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import MuiAppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, { useState } from "react";
import { Box, Button, List, Popover } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, updateUser } from "../redux/user/action";
import { useDispatch, useSelector } from "react-redux";
import CartHelper from "./cartHelper";
import axios from "axios";
import { getData } from "../redux/home/action";
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const NavbarTop = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElModel, setAnchorElModel] = useState(null);
  const [anchorElModelCart, setAnchorElModelCart] = useState(null);

  const history = useNavigate();
  const dispatch = useDispatch();
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open1 = Boolean(anchorEl);

  const user = useSelector((state) => {
    return state?.user?.user;
  });
  const cartdata = useSelector((state) => {
    return state?.user?.user?.data?.cart;
  });

  const handleClick = (event) => {
    setAnchorElModel(event.currentTarget);
  };
  const handleClickCart = (event) => {
    setAnchorElModelCart(event.currentTarget);
  };

  const handleCloseCart = () => {
    setAnchorElModelCart(null);
  };
  const handleClose = () => {
    setAnchorElModel(null);
  };

  const openModel = Boolean(anchorElModel);
  const openModelCart = Boolean(anchorElModelCart);

  const id = openModel ? "simple-popover" : undefined;
  const id2 = openModelCart ? "simple-popover" : undefined;

  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const getAllData = async () => {
    let data = await axios.get("http://localhost:8080/products");
    // console.log(data.data.product);
    dispatch(getData(data.data.product));
    return data.data.product;
  };

  const handlePurchage = async () => {
    // console.log(checked.map((e) => cartdata[e]));
    try {
      let dt = await axios.post("http://localhost:8080/users/purchase", {
        email: user?.data?.email,
        plants: checked.map((e) => cartdata[e]),
      });
      if (dt.data.err.length > 0)
        alert(`Not able to Purchase ${dt.data.err.join(" : ")}`);
      else alert(`Purchased Successfully`);

      setChecked([]);
      handleCloseCart();
      dispatch(updateUser(dt.data.user));
      getAllData();
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };
  return (
    <AppBar position="fixed" open={false}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              cursor:"pointer"
              // justifyContent: "space-evenly",
            }}
            onClick={()=>{
              history("/home")
            }}
          >
            {/* <Link to="/home" innerRef={anchorRef}> */}
            Purchase Tree
            {/* </Link> */}
          </Typography>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Badge
                badgeContent={cartdata?.length || 0}
                color="error"
                sx={{
                  mr: 4,
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  handleClickCart(e);
                }}
              >
                <ShoppingCartIcon sx={{ fontSize: 25 }} />
              </Badge>
            </div>
            <div
              style={{
                fontSize: "1.3rem",
                cursor: "default",
              }}
            >
              {user?.data?.name}
            </div>
            <Typography
              aria-owns={open1 ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={(e) => {
                if (user?.data?.name) handlePopoverOpen(e);
              }}
              onMouseLeave={(e) => {
                if (user?.data?.name) handlePopoverClose(e);
              }}
              onClick={(e) => {
                if (user?.data?.name) {
                  handleClick(e);
                } else {
                  // history(`../login`, { replace: false });
                }
              }}
              sx={{
                m: "0rem 0.8rem",
                cursor: "pointer",
              }}
            >
              {/* Hover with a Popover. */}
              <Avatar
                // alt={`${userData?.displayName}`}
                alt={user?.data?.name}
              />
            </Typography>
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: "none",
              }}
              open={open1}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Typography sx={{ p: 1, textAlign: "center" }}>
                <div
                  style={{
                    margin: "0px 10px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {user?.data?.name}
                </div>
                <div
                  style={{
                    margin: "0px 10px",
                    fontSize: "18px",
                    // fontWeight: "bold",
                  }}
                >
                  {" "}
                  {user?.data?.email}
                </div>
              </Typography>
            </Popover>
            <Popover
              id={id}
              open={openModel}
              anchorEl={anchorElModel}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography sx={{ p: 2, textAlign: "center" }}>
                <Button
                  sx={{
                    m: "8px 0px",
                    mb: "0px",
                    // fontSize: "18px",
                    // fontWeight: "bold",
                  }}
                  variant="outlined"
                  onClick={() => {
                    // dispatch(logoutUser());
                    // // history.push("/");
                    handleClose();
                    history("/profile", { replace: false });
                  }}
                >
                  Profile
                </Button>
                <div
                  style={{
                    margin: "8px 1px",
                    marginTop: "0px",
                    fontSize: "22px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {user?.data?.name}
                </div>
                <div
                  style={{
                    margin: "8px 1px",
                    fontSize: "20px",
                    // fontWeight: "bold",
                  }}
                >
                  {" "}
                  {user?.data?.email}
                </div>
                <div
                  style={{
                    margin: "8px 1px",
                  }}
                ></div>
                <Button
                  sx={{
                    m: "8px 0px",
                    mb: "0px",
                    // fontSize: "18px",
                    // fontWeight: "bold",
                  }}
                  variant="contained"
                  onClick={() => {
                    dispatch(logoutUser());
                    // history.push("/");
                    handleClose();
                    history("/", { replace: false });
                  }}
                >
                  Sign Out
                </Button>
              </Typography>
            </Popover>

            <Popover
              id={id2}
              open={openModelCart}
              anchorEl={anchorElModelCart}
              onClose={handleCloseCart}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography
                sx={{
                  p: 2,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h1>Cart Items</h1>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {cartdata?.map((e, i) => {
                    return (
                      <CartHelper
                        id={e}
                        idx={i}
                        handleToggle={handleToggle}
                        checked={checked}
                        userEmail={user?.data?.email}
                        getAllData={getAllData}
                      />
                    );
                  })}
                  {/* <CartHelper />
                  <CartHelper />
                  <CartHelper />
                  <CartHelper />
                  <CartHelper /> */}
                </List>
                <Button variant="contained" onClick={handlePurchage}>
                  Purchase
                </Button>
              </Typography>
            </Popover>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarTop;
