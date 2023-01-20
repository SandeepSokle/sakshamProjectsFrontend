import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { SettingsSystemDaydreamOutlined } from "@mui/icons-material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/user/action";
import { Navigate } from "react-router-dom";
import { useNavigate  } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const dispatch = useDispatch();
  const history = useNavigate ();

  const handleSubmit = async () => {
    // console.log(email, password);
    try {
      let user = await axios.post("http://localhost:8080/users/login", {
        email,
        password,
      });
      dispatch(loginUser(user));
      history("/home")
      // console.log(user);
    } catch (err) {
      console.log(err);
      alert("wrong email or password")
    }
  };

  return (
    <Box
      // component="form"
      sx={{
        m: 1,
        marginTop: "5rem",
        // width: "25ch",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        onChange={(val) => {
          setEmail(val.target.value);
        }}
        sx={{ m: 4 }}
      />
      <TextField
        id="password"
        label="password"
        variant="outlined"
        onChange={(val) => {
          setPassword(val.target.value);
        }}
      />
      <Button
        //   fullWidth
        variant="contained"
        onClick={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
        sx={{ m: 4 }}
        type="submit"
      >
        Submit
      </Button>
    </Box>
  );
}

// export default Login
