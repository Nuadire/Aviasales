import React from "react";
import styled from "styled-components";
import { Header } from "../header/header";
import { Filter } from "../filter/filter";
import { Content } from "../content/content";

const Aviasales = styled.div`
  width: 754px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 232px auto;
  gap: 20px;
`;

export class App extends React.Component {

  state = {
    selectedSort: "Самый дешевый",
    allStops: true,
    stops: [
      { id: 0, name: "Без пересадок", isChecked: true },
      { id: 1, name: "1 пересадка", isChecked: true },
      { id: 2, name: "2 пересадки", isChecked: true },
      { id: 3, name: "3 пересадки", isChecked: true },
    ],
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

  handlerSorting = ({target: {value}}) => {
    this.setState({selectedSort: value });
  };

  render() {
    const { allStops, stops, selectedSort } = this.state;
    return (
      <>
        <Header />
        <Aviasales>
          <Filter
            handlerFilter={this.handlerFilter}
            handlerAllFiltered={this.handlerAllFiltered}
            allStops={allStops}
            stops={stops}
          />
          <Content selectedSort={selectedSort} handlerSorting={this.handlerSorting} />
        </Aviasales>
      </>
    );
  }
}
