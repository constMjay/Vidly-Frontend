import React, { Component } from 'react'

// Counter Counter
import Counters from './counters'
//Counter Navbar
import CounterNavbar from './counterNavbar'

class CounterApp extends Component {
    state = {
        counters: [
            { id: 1, value: 4 },
            { id: 2, value: 0 },
            { id: 3, value: 0 },
            { id: 4, value: 0 },
        ]
    }
    constructor(props) {
        super(props)
        console.log("App - Constructor:", props)
    }
    handleIncrement = (counter) => {
        const counters = [...this.state.counters];
        const index = counters.indexOf(counter);
        counters[index] = { ...counter };
        counters[index].value++;
        this.setState({ counters: counters });
    };
    handleDecrement = (counter) => {
        const counters = [...this.state.counters];
        const index = counters.indexOf(counter);
        counters[index] = { ...counter };
        counters[index].value--;
        this.setState({ counters: counters });
    };
    handleDelete = (counterId) => {
        const counters = this.state.counters.filter((c) => {
            return c.id !== counterId;
        });
        this.setState({ counters });
    };
    totalCounters = () => {
        return this.state.counters.filter(c => c.value > 0).length

    }
    componentDidMount = () => {
        console.log("ComponentDidMount - Rendered")
    }
    render() {

        const { counters } = this.state
        return (
            <React.Fragment>
                <CounterNavbar
                    totalCounters={this.totalCounters}
                />
                <main className="main">
                    <div className="container">
                        <h2 className="text-center my-3">Counter App</h2>
                        <Counters
                            counters={counters}
                            onIncrement={this.handleIncrement}
                            onDecrement={this.handleDecrement}
                            onDelete={this.handleDelete}
                        />
                    </div>

                </main >
            </React.Fragment>

        )
    }
}
export default CounterApp