import React, { Component } from "react";

import Counter from "./counter";

class Counters extends Component {
  render() {
    const { onDelete, onIncrement, onDecrement, counters } = this.props;
    console.log("Counters - Rendered")
    return (
      <div className="counters d-flex flex-column align-items-center">
        {counters.map((counter) => {
          return (
            <Counter
              key={counter.id}
              onDelete={onDelete}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              counter={counter}
            />
          );
        })}
      </div>
    );
  }
}
export default Counters;
