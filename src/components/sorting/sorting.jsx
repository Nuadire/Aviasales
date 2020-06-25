import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const SORT_TYPES = ["Самый дешевый", "Самый быстрый"];

const Container = styled.div`
  display: flex;
`;

const Label = styled.label`
  color: ${({ isActive }) => (isActive ? "#FFFFFF !important" : "#4A4A4A")};
  background-color: ${({ isActive }) =>
    isActive ? "#2196F3 !important" : "#FFFFFF"};
  border: ${({ isActive }) =>
    isActive ? "none !important" : "1px solid #DFE5EC"};
  border-radius: ${({ind}) => {
    if (ind === 0) {return "5px 0 0 5px"}
    if (ind === SORT_TYPES.length - 1) { return "0 5px 5px 0"}
    return "none";
  }};
  display: block;
  height: 52px;
  width: 252px;
  padding: 15px 56px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.5px;
  text-transform: uppercase;

  &:hover {
    background-color: #f1fcff;
    border-color: #2196f3;
  }
`;
const HideRadio = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  overflow: hidden;
`;

const createButton = (sortType, ind, isActive, handlerSorting) => {
  return (
    <Label key={ind} ind={ind} isActive={isActive}>
      <HideRadio
        type="radio"
        name="sortTypes"
        value={sortType}
        onChange={handlerSorting}
      />
      {sortType}
    </Label>
  );
};

export const Sorting = ({ selectedSort, handlerSorting }) => {
  return (
    <Container>
      {SORT_TYPES.map((sortType, ind) => {
        const isActive = sortType === selectedSort;
        return createButton(sortType, ind, isActive, handlerSorting);
      })}
    </Container>
  );
};

Sorting.propTypes = {
  selectedSort: PropTypes.string,
  handlerSorting: PropTypes.func.isRequired,
};

Sorting.defaultProps = {
  selectedSort: SORT_TYPES[0],
};
