import { Avatar, Box, List } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getData } from "../redux/home/action";
import NavbarTop from "./header";
import SendGiftHelper from "./sendGiftHelper";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state?.user?.user;
  });

  useEffect(() => {
    if (!user) navigate("/login");
  }, []);
  const getAllData = async () => {
    let data = await axios.get("http://localhost:8080/products");
    // console.log(data.data.product);
    dispatch(getData(data.data.product));
    return data.data.product;
  };

  console.log(user)

  return (
    <>
      <NavbarTop />
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#0000ff36",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          overFlow: "auto",
          flexWrap: "wrap",
          marginTop: "3rem",
          gap: 8,
        }}
      >
        <Box
          sx={{
            width: "60%",
            backgroundColor: "primary.main",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: ".5rem",
            padding: ".5rem",
            borderRadius: "8px",
          }}
        >
          {" "}
          <Avatar
            // alt={`${userData?.displayName}`}
            alt={user?.data?.name}
            sx={{ width: "13rem", height: "13rem" }}
          />
          <h3>{user?.data?.name}</h3>
          <h4>{user?.data?.email}</h4>
        </Box>
        <Box
          sx={{
            width: "40%",
            backgroundColor: "primary.main",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: ".5rem",
            padding: ".5rem",
            borderRadius: "8px",
            overFlow: "auto",
          }}
        >
          <h3>My Purchase</h3>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              // bgcolor: "background.paper",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {user?.data?.products?.map((e, i) => {
              return (
                <SendGiftHelper
                  id={e}
                  idx={i}
                  userEmail={user?.data?.email}
                  getAllData={getAllData}
                />
              );
            })}
          </List>
        </Box>
        <Box
          sx={{
            width: "40%",
            backgroundColor: "primary.main",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: ".5rem",
            padding: ".5rem",
            borderRadius: "8px",
            overFlow: "auto",
          }}
        >
          <h3>Gifted Items</h3>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              // bgcolor: "background.paper",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {user?.data?.gifts?.map((e, i) => {
              return (
                <SendGiftHelper
                  id={e}
                  idx={i}
                  userEmail={user?.data?.email}
                  getAllData={getAllData}
                />
              );
            })}
          </List>
        </Box>
      </div>
    </>
  );
};

export default Profile;
