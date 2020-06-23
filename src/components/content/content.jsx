import React from "react";
import styled from "styled-components";

const TicketContainer = styled.div`
  width: 502px;
  height: 184px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

export const Content = () => {
  return <TicketContainer />;
};
