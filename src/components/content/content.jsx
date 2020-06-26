import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Sorting } from "../sorting/sorting";
import { Segment } from "../segment/segment";
import LogoS7 from "./S7 Logo.png";
// pics.avs.io/99/36/{IATA_CODE_HERE}.png

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

const Container = styled.div`
  display: grid;
  gap: 20px;
`;

const getTicket = ({ price, segments }) => {
  const strPrice = String(price).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
  const priceInCurrency = `${strPrice} P`;
  return (
    <Ticket >
      <Header>
        <Price>{priceInCurrency}</Price>
        <Logo src={LogoS7} />
      </Header>
      <InfoContainer>
        {segments.map((segment) => <Segment {...segment} />)}
      </InfoContainer>
    </Ticket>
  );
};
getTicket.propTypes = {
  price: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  segments: PropTypes.array.isRequired
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
