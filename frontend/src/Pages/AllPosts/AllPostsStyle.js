import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

export const CardWrapper = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 50px;
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  @media only screen and (min-width: 768px) {
    grid-template-columns: auto auto;
  }
  @media only screen and (min-width: 992px) {
    grid-template-columns: auto auto auto;
  }
  @media only screen and (min-width: 1250px) {
    grid-template-columns: auto auto auto auto;
  }
`;

export const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin: 20px;
  width: 280px;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 50, 100, 0.8);
  }
  @media screen and (max-width: 768px) {
    width: 60%;
    margin-left: 20%;
  }
`;

export const CardImage = styled.img`
  width: 100%;
`;

export const CardContainer = styled.div`
  padding: 2px 16px;
  text-align: center;
`;

export const CutIcon = styled(FaTimes)`
  float: right;
`;
