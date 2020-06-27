import React from "react";
import styled from "styled-components";
import { Header } from "../header/header";
import { Filter } from "../filter/filter";
import { Content } from "../content/content";
import { Spinner } from "../spinner/spinner";
import { GlobalStyle } from "../../global";
import { API } from "../../utils/API";

const CHEAPEST = "Самый дешевый";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 754px;
`;
const Aviasales = styled.div`
  padding-bottom: 20px;
  display: grid;
  grid-template-columns: 232px auto;
  gap: 20px;
`;

const sortFlight = (tickets, fn) => tickets.sort(fn);
const sumDuration = (ticket) =>
  ticket.segments.reduce((acc, segment) => acc + segment.duration, 0);
const fastestFlight = (ticketPrev, ticketNext) =>
  sumDuration(ticketPrev) - sumDuration(ticketNext);
const cheapestFlight = (ticketPrev, ticketNext) =>
  ticketPrev.price - ticketNext.price;
const filterTop5 = (tickets) => tickets.slice(0, 5);
const filterFlight = (tickets, stopsArr) =>
  tickets.filter(({ segments }) => {
    return segments.every(({ stops }) =>
      stopsArr.some((count) => count === stops.length)
    );
  });
const normaliseStops = (stops) =>
  stops.reduce((acc, { id, isChecked }) => {
    if (isChecked) {
      acc.push(id);
    }
    return acc;
  }, []);

export class App extends React.Component {
  state = {
    isLoading: true,
    tickets: [],
    selectedSort: CHEAPEST,
    allStops: true,
    stops: [
      { id: 0, name: "Без пересадок", isChecked: true },
      { id: 1, name: "1 пересадка", isChecked: true },
      { id: 2, name: "2 пересадки", isChecked: true },
      { id: 3, name: "3 пересадки", isChecked: true },
    ],
  };

  async componentDidMount() {
    this.getTickets();
  }

  getTickets = async () => {
    try {
      const {
        data: { searchId },
      } = await API.get("/search");
      const { tickets } = this.state;
      const ticketsArr = await this.getTicketsChunk(tickets, searchId);
      const ticketsPlusId = ticketsArr.map((ticket, ind) => {
        // eslint-disable-next-line no-param-reassign
        ticket.id = ind;
        return ticket;
      })
      this.setState({ tickets: ticketsPlusId, isLoading: false });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }    
  }

  getTicketsChunk = async (ticketsAcc, searchId, isEnd) => {
    if (isEnd) return ticketsAcc;
    try {
      const {
        data: { tickets, stop },
      } = await API.get(`/tickets?searchId=${searchId}`);
      const newArr = ticketsAcc.concat(tickets);
      return this.getTicketsChunk(newArr, searchId, stop);
    } catch (err) {
      if (err.response) {
        // попросить пользователя обновить страницу
        // eslint-disable-next-line no-alert
        alert(err.response); // (5xx, 4xx)
      } else if (err.request) {
        // client never received a response, or request never left
        // eslint-disable-next-line no-console
        console.error(err);
      } else {
        // eslint-disable-next-line no-console
        console.error(err); // отправка сообщения со стеком
      }
      return [];
    }
  };

  handlerFilter = ({ target: { name, checked } }) => {
    this.setState(({ stops }) => {
      const newStops = stops.map((stop) =>
        stop.name === name ? { ...stop, isChecked: checked } : stop
      );
      const allCheck = newStops.every((stop) => stop.isChecked);
      return { allStops: allCheck, stops: newStops };
    });
  };

  handlerAllFiltered = ({ target: { checked } }) => {
    this.setState(({ stops }) => {
      const newStops = stops.map((stop) => ({ ...stop, isChecked: checked }));
      return {
        stops: newStops,
        allStops: checked,
      };
    });
  };

  handlerSorting = ({ target: { value } }) => {
    this.setState({ selectedSort: value });
  };

  render() {
    const { allStops, stops, selectedSort, tickets, isLoading } = this.state;
    const filterTickets = filterFlight(tickets, normaliseStops(stops));
    let viewTickets = [];
    if (filterTickets.length !== 0) {
      const sortFn = selectedSort === CHEAPEST ? cheapestFlight : fastestFlight;
      const sortingTickets = sortFlight(filterTickets, sortFn);
      viewTickets = filterTop5(sortingTickets);
    }
    return (
      <Wrapper>
        <Header />
        {isLoading ? (
          <Spinner style={{ margin: "20px auto" }} />
        ) : (
          <Aviasales>
            <Filter
              handlerFilter={this.handlerFilter}
              handlerAllFiltered={this.handlerAllFiltered}
              allStops={allStops}
              stops={stops}
            />
            <Content
              tickets={viewTickets}
              selectedSort={selectedSort}
              handlerSorting={this.handlerSorting}
            />
          </Aviasales>
        )}
        <GlobalStyle />
      </Wrapper>
    );
  }
}
