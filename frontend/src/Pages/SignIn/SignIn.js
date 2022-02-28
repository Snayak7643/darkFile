import React, { useState, useContext } from "react";
import { AppContext } from "../../App";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardInput,
  CardButton,
  CardLink,
} from "./SignInStyle";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { dispatch } = useContext(AppContext);

  const handleClick = async () => {
    try {
      const res = await fetch("/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.message) {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch({ type: "USER", payload: data.user });
        swal("Signed in successfully " + data.user.name, {
          icon: "success",
          buttons: false,
          timer: 2000,
        });
        history.push("/");
      } else {
        swal(data.error, {
          icon: "error",
          buttons: false,
          timer: 2000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CardWrapper>
      <CardHeader>
        <CardHeading>Sign in</CardHeading>
      </CardHeader>

      <CardBody>
        <CardFieldset>
          <CardInput
            placeholder="E-mail"
            type="text"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </CardFieldset>

        <CardFieldset>
          <CardInput
            placeholder="Password"
            type="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </CardFieldset>

        <CardFieldset>
          <CardButton type="button" onClick={handleClick}>
            Sign In
          </CardButton>
        </CardFieldset>

        <CardFieldset>
          <CardLink>
            <Link to="/signup">Don't have an account</Link>
          </CardLink>
        </CardFieldset>
      </CardBody>
    </CardWrapper>
  );
};
export default SignIn;
