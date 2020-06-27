import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { format, addMinutes } from "date-fns";

const Info = styled.div`
  width: 141px;
`;
const Main = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #4a4a4a;
`;
const Subsidiary = styled.div`
  text-transform: uppercase;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #a0b0b9;
`;

const getInWay = (duration) => {
  const day = Math.trunc(duration / 1440);
  const hours = Math.trunc((duration / 60) % 24);
  const minutes = duration % 60;
  return `${day ? `${day}д ` : ""}${hours}ч ${minutes}м`;
};
const getStart = (date) => {
  return format(date, "kk:mm");
};

export const Segment = ({ date, destination, duration, origin, stops }) => {
  const transplant = stops.length;
  let strTransplant = "";
  switch (transplant) {
    case 0:
      strTransplant = "Без пересадок";
      break;
    case 1:
      strTransplant = `${transplant} Пересадка`;
      break;
    default:
      strTransplant = `${transplant} Пересадки`;
      break;
  }

  const dateTime = new Date(date);
  const strInWay = getInWay(duration);
  const strStart = getStart(dateTime);
  const strEnd = getStart(addMinutes(dateTime, duration));
  return (
    <>
      <Info >
        <Subsidiary>{`${origin} - ${destination}`}</Subsidiary>
        <Main>{`${strStart} - ${strEnd}`}</Main>
      </Info>
      <Info >
        <Subsidiary>В пути</Subsidiary>
        <Main>{strInWay}</Main>
      </Info>
      <Info >
        <Subsidiary>{strTransplant}</Subsidiary>
        <Main>{stops.join(", ")}</Main>
      </Info>
    </>
  );
};
Segment.propTypes = {
  date: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  origin: PropTypes.string.isRequired,
  stops: PropTypes.arrayOf(PropTypes.string).isRequired,
};
