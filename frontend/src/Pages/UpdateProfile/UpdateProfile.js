import React, { useState } from "react";
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
} from "./UpdateProfileStyle";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleClick = async () => {
    try {
      const res = await fetch("/updateprofile", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          name,
          password,
        }),
      });
      const response = await res.json();
      console.log(response);
      if (response.message) {
        swal(response.message, {
          buttons: false,
          timer: 2000,
        });
        history.push("/profile");
      } else {
        swal(response.error, {
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
        <CardHeading>Update Profile</CardHeading>
      </CardHeader>

      <CardBody>
        <CardFieldset>
          <CardInput
            placeholder="Name"
            type="text"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </CardFieldset>
        <CardFieldset>
          <CardInput
            placeholder="New Password"
            type="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </CardFieldset>

        <CardFieldset>
          <CardButton type="button" onClick={handleClick}>
            Update
          </CardButton>
        </CardFieldset>
      </CardBody>
    </CardWrapper>
  );
};
export default UpdateProfile;
