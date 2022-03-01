import styled from "styled-components";
import { FaPen } from "react-icons/fa";

export const ContainerWrapper = styled.div`
  overflow: hidden;
  padding: 0 0 32px;
  margin: 48px auto 0;
  max-width: 380px;
  font-family: Quicksand, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
`;

export const Container = styled.div`
  overflow: hidden;
  box-shadow: 0px 2px 8px 0px var(--clr-gray-light);
  background-color: white;
  text-align: center;
  border-radius: 1rem;
  position: relative;
`;

export const Icon = styled(FaPen)`
  z-index: 100;
`;

export const BannerImg = styled.div`
  position: absolute;
  background-color: black;
  height: 10rem;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const ProfileImg = styled.img`
  width: 8rem;
  clip-path: circle(60px at center);
  margin-top: 4.5rem;
`;

export const Name = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
`;
export const Content = styled.p`
  margin: 1rem 2rem;
  font-size: 0.9rem;
`;
