import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardInput,
  CardButton,
  CardLink,
} from "./SignUpStyle";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleClick = async () => {
    try {
      const res = await fetch("/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const response = await res.json();
      console.log(response);
      if (response.message) {
        history.push("/signin");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CardWrapper>
      <CardHeader>
        <CardHeading>Sign Up</CardHeading>
      </CardHeader>

      <CardBody>
        <CardFieldset>
          <CardInput
            placeholder="Name"
            type="text"
            required
            onChange={(e) => {
              setName(e.target.value);
              console.log(name);
            }}
          />
        </CardFieldset>

        <CardFieldset>
          <CardInput
            placeholder="E-mail"
            type="text"
            required
            onChange={(e) => {
              setEmail(e.target.value);
              console.log(email);
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
            Sign Up
          </CardButton>
        </CardFieldset>

        <CardFieldset>
          <CardLink>
            <Link to="/signin">Already have an account</Link>
          </CardLink>
        </CardFieldset>
      </CardBody>
    </CardWrapper>
  );
};
export default SignUp;
