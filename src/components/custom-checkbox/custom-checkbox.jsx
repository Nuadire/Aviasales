import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const InputCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  overflow: hidden;
`;

const Icon = styled.svg`
  fill: none;
  stroke: #2196f3;
  stroke-width: 2px;
`;

const NewChekbox = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  margin-top: -2px;
  border: 1px solid ${(props) => (props.checked ? "#2196F3" : "#9ABBCE")};
  border-radius: 2px;

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

export const Checkbox = ({checked, name, onChange}) => {
  return (
    <>
      <InputCheckbox checked={checked} name={name} onChange={onChange} />
      <NewChekbox checked={checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </NewChekbox>
    </>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};
