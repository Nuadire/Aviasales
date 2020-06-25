import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Sorting } from "../sorting/sorting";
import LogoS7 from "./S7 Logo.png";

const Ticket = styled.div`
  width: 502px;
  height: 184px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 6px;
  padding-bottom: 20px;
  align-items: center;
`;
const Price = styled.div`
  width: 147px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: #2196f3;
`;
const Logo = styled.img`
  margin-right: 30px;
  ${"" /* width: 110px;
  height: 36px; */}
`;
const InfoContainer = styled.div`
  display: grid;
  gap: 10px 20px;
  grid-template-columns: 141px 141px 141px;
  grid-template-rows: 39px 39px;
`;
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

const Container = styled.div`
  display: grid;
  gap: 20px;
`;

const getSegment = ({ date, destination, duration, origin, stops }) => {
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
  const dateTime = new Date(date).getHours();
  return (
    <>
      <Info>
        <Subsidiary>{`${origin} - ${destination}`}</Subsidiary>
        <Main>{dateTime}</Main>
      </Info>
      <Info>
        <Subsidiary>В пути</Subsidiary>
        <Main>{duration}</Main>
      </Info>
      <Info>
        <Subsidiary>{strTransplant}</Subsidiary>
        <Main>{stops.join(", ")}</Main>
      </Info>
    </>
  );
};
getSegment.propTypes = {
  date: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  origin: PropTypes.string.isRequired,
  stops: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const getTicket = ({ price, segments }) => {
  const priceInCurrency = `${price} P`;
  return (
    <Ticket>
      <Header>
        <Price>{priceInCurrency}</Price>
        <Logo src={LogoS7} />
      </Header>
      <InfoContainer>
        {segments.map((segment) => getSegment(segment))}
      </InfoContainer>
    </Ticket>
  );
};
getTicket.propTypes = {
  price: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  segments: PropTypes.array.isRequired,
};

const getTikets = (tickets) =>
  tickets.length
    ? tickets.map((ticket) => getTicket(ticket))
    : <Ticket style={{height: "150px"}}>We did not find flights matching your filters.</Ticket>;

export const Content = ({ selectedSort, handlerSorting, tickets }) => {
  return (
    <Container>
      <Sorting selectedSort={selectedSort} handlerSorting={handlerSorting} />
      {getTikets(tickets)}
    </Container>
  );
};

Content.propTypes = {
  selectedSort: PropTypes.string.isRequired,
  handlerSorting: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  tickets: PropTypes.array.isRequired,
};
