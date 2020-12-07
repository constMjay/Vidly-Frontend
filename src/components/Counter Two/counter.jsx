import React, { Component } from "react";

class Counter extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps", prevProps);
    console.log("prevState", prevState);
    if (prevProps.counter.value !== this.props.counter.value) {
      // Ajax call here
    }
  }
  componentWillUnmount() {
    console.log("Counter - Unmount");
  }
  render() {
    const { onDelete, counter, onIncrement, onDecrement } = this.props;
    const { formatCount, getBadgeClasses, disabledDecrementButton } = this;
    console.log("Counter - Rendered");
    return (
      <div className="counter d-flex align-items-center my-3">
        <h4 className="m-0">
          Count: <span className={getBadgeClasses()}>{formatCount()}</span>
        </h4>
        <button
          onClick={() => onDecrement(counter)}
          disabled={disabledDecrementButton()}
          className="btn btn-secondary btn-sm mr-2"
        >
          Decrement
        </button>
        <button
          onClick={() => onIncrement(counter)}
          className="btn btn-success btn-sm"
        >
          Increment
        </button>

        <button
          onClick={() => onDelete(counter.id)}
          className="btn btn-danger btn-sm ml-2"
        >
          Delete
        </button>
      </div>
    );
  }
  disabledDecrementButton = () => {
    return this.props.counter.value === 0 ? "disabled" : "";
  };
  formatCount = () => {
    const { value } = this.props.counter;
    return value === 0 ? 0 : value;
  };
  getBadgeClasses = () => {
    let classes = "badge m-2 badge-";

    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  };
}

export default Counter;
