import React from "react";
import styled from "styled-components";
import logoPng from "./Logo.png";

const HeaderContainer = styled.header`
  padding: 50px 0;
`;
const Logo = styled.img`
  display: block;
  margin: 0 auto;
  width: 60px;
  height: 60px;
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <Logo src={logoPng} alt="Logo" />
    </HeaderContainer>
  );
};
