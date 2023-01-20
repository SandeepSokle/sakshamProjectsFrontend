import { useDispatch, useSelector } from "react-redux";
import HomeHelper from "./HomeHelper";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import axios from "axios";
import { updateUser } from "../redux/user/action";
import { unselectall } from "../redux/home/action";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allData = useSelector((state) => {
    return state.home.allData;
  });
  const isSelectAny = useSelector((state) => {
    return state.home.select.length > 0;
  });

  const SelectedItems = useSelector((state) => {
    return state.home.select;
  });

  const user = useSelector((state) => {
    return state?.user?.user;
  });
  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  const handleCart = async (product) => {
    try {
      let crt = await axios.post("http://localhost:8080/users/addcart", {
        email: user.data.email,
        product,
      });
      console.log(crt);
      dispatch(updateUser(crt.data));
    } catch (err) {
      console.log(err);
    }
  };

  const addMultiple = async () => {
    console.log(SelectedItems);
    for (let i = 0; i < SelectedItems.length; i++) {
      await handleCart(SelectedItems[i]);
    }
    // let dt = SelectedItems.map(async (ele) => {
    //   return await handleCart(ele);
    // });
    dispatch(unselectall());
  };

  return (
    <>
      <Header />

      <div
        className="homeContainer"
        style={{
          marginTop: "5rem",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          columnGap: "20px",
          rowGap: "20px",
        }}
      >
        {allData?.map((ele, i) => {
          return <HomeHelper data={ele} idx={i} />;
        })}
        <Button
          disabled={!isSelectAny}
          variant="outlined"
          color="success"
          sx={{
            position: "fixed",
            right: "1rem",
            bottom: "1rem",
            zIndex: 1010,
          }}
          onClick={addMultiple}
        >
          <ShoppingCartIcon sx={{ fontSize: 120 }} />
        </Button>
      </div>
    </>
  );
};

export default Home;
