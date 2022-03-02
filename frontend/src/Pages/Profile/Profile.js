import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  BannerImg,
  ProfileImg,
  Name,
  ContainerWrapper,
  Content,
  Icon,
} from "./ProfileStyle";

const Profile = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch("/profile", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ContainerWrapper>
      <Container>
        <BannerImg />
        <ProfileImg
          src="https://res.cloudinary.com/multiverse/image/upload/v1646081849/eiyfoxixergto73mjhyo.jpg"
          alt="Photo"
        />
        <Link to="/updateprofile" style={{ textDecoration: "none" }}>
          <Icon />
        </Link>
        <Name>{data.name}</Name>
        <Content>{data.email}</Content>
      </Container>
    </ContainerWrapper>
  );
};

export default Profile;
