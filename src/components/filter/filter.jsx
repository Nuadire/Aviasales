import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Checkbox } from "../custom-checkbox/custom-checkbox";

const TitleFilter = styled.h3`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  color: #4a4a4a;
  margin: 0;
  padding-left: 20px;
  padding-bottom: 10px;
`;
const FilterContainer = styled.div`
  padding-top: 20px;
  width: 232px;
  height: 252px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background: #ffffff;
`;
const LabelCheckbox = styled.label`
  vertical-align: middle;
  padding-left: 30px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
  color: #4a4a4a;
  cursor: pointer;
`;
const WrapperUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const WrapperLi = styled.li`
  padding: 10px 20px;

  &:hover {
    background-color: #F1FCFF;
  }
`;

const ContainerCheckbox = (stop, handler) => {
  const { id, name, isChecked } = stop;
  return (
    <WrapperLi key={id}>
      <LabelCheckbox>
        <Checkbox checked={isChecked} name={name} onChange={handler} />
        {name}
      </LabelCheckbox>
    </WrapperLi>
  );
};

export const Filter = ({
  stops,
  allStops,
  handlerFilter,
  handlerAllFiltered,
}) => {
  return (
    <FilterContainer>
      <TitleFilter>Количество пересадок</TitleFilter>
      <WrapperUl>
        {ContainerCheckbox(
          { id: "all", name: "Все", isChecked: allStops },
          handlerAllFiltered
        )}
        {stops.map((stop) => ContainerCheckbox(stop, handlerFilter))}
      </WrapperUl>
    </FilterContainer>
  );
};

Filter.propTypes = {
  allStops: PropTypes.bool.isRequired,
  stops: PropTypes.arrayOf( PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    isChecked: PropTypes.bool,
  })).isRequired,
  handlerFilter: PropTypes.func.isRequired,
  handlerAllFiltered: PropTypes.func.isRequired,
};
