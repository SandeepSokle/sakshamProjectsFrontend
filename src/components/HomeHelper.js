import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { select, unselect } from "../redux/home/action";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { updateUser } from "../redux/user/action";

export default function HomeHelper({ data, idx }) {
  const imageArr = [
    "/contemplative-reptile.jpg",
    "plant1.jpg",
    "plant3.jpg",
    "plant2.cms",
    "plant4.jpg",
    "plant5.jpg",
    "plant6.webp",
  ];

  const isSelect = useSelector((state) => {
    return state.home.select.filter((ele) => {
      return ele === data._id;
    });
  });

  const isSelectAny = useSelector((state) => {
    return state.home.select.length > 0;
  });
  const user = useSelector((state) => {
    return state?.user?.user;
  });
  

  const dispatch = useDispatch();
  const handleSelect = () => {
    if (isSelect.length > 0) {
      dispatch(unselect(data._id));
    } else {
      dispatch(select(data._id));
    }
  };

  const handleCart = async ()=>{
    try{
      let crt = await axios.post("http://localhost:8080/users/addcart",{
        email:user.data.email,
        product:data._id
      })
      console.log(crt)
      dispatch(updateUser(crt.data))
    }catch(err){
      console.log(err)
    }
  }

  let selectVariant = isSelect.length > 0 ? "contained" : "outlined";
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={imageArr[idx % 7]}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {/* Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica */}
        </Typography>
      </CardContent>
      <CardActions variant="body2">
        <Button
          disabled={!data.isAvailable}
          fullWidth
          variant={selectVariant}
          onClick={handleSelect}
        >
          select
        </Button>
        <Button
          disabled={!data.isAvailable || isSelectAny}
          fullWidth
          variant="outlined"
          sx={{ lineBreak: "none" }}
          onClick={handleCart}
        >
          <ShoppingCartIcon sx={{ fontSize: 25 }} />
        </Button>
        <Button
          fullWidth
          varient="text"
          color={data.isAvailable ? "success" : "error"}
        >
          {data.isAvailable ? "Available" : "unAvailable"}
        </Button>
      </CardActions>
    </Card>
  );
}
