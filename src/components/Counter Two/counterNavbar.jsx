import React, { Component } from "react";

// Stateless Functional Components
const CounterNavbar = (props) => {
  console.log("CounterNavbar - Rendered")
  const { totalCounters } = props;
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand mb-0 h1">
        Navbar
        <span className="badge badge-pill badge-secondary mx-2">
          {totalCounters()}
        </span>
      </a>
    </nav>
  );
};
/* 
class CounterNavbar extends Component {
  render() {
    const { totalCounters } = this.props;

    return (
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand mb-0 h1">
          Navbar
          <span className="badge badge-pill badge-secondary mx-2">
            {totalCounters()}
          </span>
        </a>
      </nav>
    );
  }
}
*/

export default CounterNavbar;
