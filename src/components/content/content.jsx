import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Sorting } from "../sorting/sorting";

const Ticket = styled.div`
  width: 502px;
  height: 184px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;
const Container = styled.div`
  display: grid;
  gap: 20px;
`;

export const Content = ({ selectedSort, handlerSorting }) => {
  return (
    <Container>
      <Sorting selectedSort={selectedSort} handlerSorting={handlerSorting} />
      <Ticket />
    </Container>
  );
};

Content.propTypes = {
  selectedSort: PropTypes.string.isRequired,
  handlerSorting: PropTypes.func.isRequired
};

