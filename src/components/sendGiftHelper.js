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
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SendGiftHelper = ({ id, idx, getAllData, userEmail }) => {
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
  }, [id]);



  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState([]);

  const getUsers = async () => {
    try {
      let dt = await axios.get("http://localhost:8080/users/");
    //   console.log(
    //     dt.data.filter((e) => e.email != userEmail),
    //     userEmail
    //   );
      setUsers(dt.data.filter((e) => e.email != userEmail));
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpen = () => {
    getUsers();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleGift = async (toEmail) => {
    try {
      let dt = await axios.post("http://localhost:8080/users/sendgift", {
        email: userEmail,
        toEmail,
        productId: id,
      });
      console.log(dt.data.fUser)
      dispatch(updateUser(dt.data.fUser));
      getAllData();
      alert(`Gifted Successfully`);
      handleClose();
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
        <IconButton edge="end" aria-label="comments" onClick={handleOpen}>
          <CardGiftcardIcon color="primary" />
        </IconButton>
      }
      disablePadding
      sx={{
        bgcolor: "background.paper",
      }}
    >
      <ListItemButton role={undefined} dense>
        <ListItemText id={labelId} primary={treeDetail?.name} />
        <ListItemText id={labelId} primary={treeDetail?.rate} />
      </ListItemButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              User List
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
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
                {users?.map((e, i) => {
                  return (
                    <ListItem
                      key={i}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="comments"
                          onClick={(event) => {
                            event.preventDefault()
                            handleGift(e.email);
                          }}
                        >
                          <CardGiftcardIcon color="primary" />
                        </IconButton>
                      }
                      disablePadding
                      sx={{
                        bgcolor: "background.paper",
                      }}
                    >
                      <ListItemButton role={undefined} dense>
                        <ListItemText id={labelId} primary={e?.name} />
                        <ListItemText id={labelId} primary={e?.userName} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </ListItem>
  );
};

export default SendGiftHelper;
