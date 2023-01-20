import * as React from "react";
import List from "@mui/material/List";
// import ListItem from '@mui/material/ListItem';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import { ListItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { updateUser } from "../redux/user/action";
import axios from "axios";
const CartHelper = ({
  id,
  idx,
  getAllData,
  handleToggle,
  checked,
  userEmail,
}) => {
  const labelId = `checkbox-list-label-${idx}`;
  const allData = useSelector((state) => {
    return state.home.allData;
  });
  const dispatch = useDispatch();

  const [treeDetail, setTreeDetail] = React.useState();

  React.useEffect(() => {
    // console.log(id, allData);
    let dt = allData.find((ele) => {
      return ele._id === id;
    });
    setTreeDetail(dt);
  }, []);

  const handlePurchage = async () => {
    try {
      let dt = await axios.post("http://localhost:8080/users/purchase", {
        email: userEmail,
        plants: [id],
      });
      console.log(dt.data.user);
      if (dt.data.err.length > 0)
        alert(`Not able to Purchase ${dt.data.err.join(" : ")}`);
      else alert(`Purchased Successfully`);
      dispatch(updateUser(dt.data.user));
      getAllData();
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };
  console.log(treeDetail);

  return (
    <ListItem
      key={idx}
      secondaryAction={
        <IconButton edge="end" aria-label="comments" onClick={handlePurchage}>
          <ShoppingBasketIcon color="primary" />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} onClick={handleToggle(idx)} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked.indexOf(idx) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={treeDetail?.name} />
        <ListItemText id={labelId} primary={treeDetail?.rate} />
      </ListItemButton>
    </ListItem>
  );
};

export default CartHelper;
