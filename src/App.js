import React from "react";
import web3 from "./web3";
import lottery from "./lottery";
import "./App.css";

class App extends React.Component {
    state = {
        admin: "",
        balance: "",
        players: [],
        minBuyin: 0,
        value: "",
        message: "",
    };

    async componentDidMount() {
        const admin = await lottery.methods.admin().call();
        const players = await lottery.methods.getTickets().call();
        const balance = await web3.eth.getBalance(lottery.options.address);
        const minBuyin = await lottery.methods.minPayin().call();

        this.setState({ admin, balance, players, minBuyin });
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();
        
        this.setState({ message: "Waiting on transaction..." });
        await lottery.methods.enter().send({
            value: web3.utils.toWei(this.state.value, "ether"),
            from: accounts[0],
        });

        this.setState({ message: "You have been entered!" });
    };

    onClick = async () => {
        const accounts = await web3.eth.getAccounts();

        this.setState({ message: "Waiting on transaction..." });
        await lottery.methods.draw().send({
            from: accounts[0],
        });

        this.setState({ message: "A winner has been picked!" });
    };

    render() {
        return (
            <div className="App">
                <h1>A Lottery Pool Contract</h1>
                <p>
                    This contract is created and managed by <code>{this.state.admin}</code> on Ropsten Network. <br />
                    The winning price is {web3.utils.fromWei(this.state.balance, "ether")} ether <br />
                    There are {this.state.players.length} tickets in the pool. The chance of winning the price if you enter now is {1 / (this.state.players.length + 1)}.
                </p>
                <hr className="Line"/>
                <form onSubmit={this.onSubmit}>
                    <h4>Enter the Pool</h4>
                    <div>
                        <label>Amount of ether to enter. (The minimum amount is {web3.utils.fromWei(String(this.state.minBuyin), "ether")} ether). <br /> <br /></label>
                        <input
                            value={this.state.value}
                            onChange={(event) => this.setState({ value: event.target.value })}
                        />
                    </div>
                    <button className="Button">Enter</button>
                </form>

                <hr className="Line"/>

                <h4>Draw the winner</h4>
                <p>Only the owner of the contract can pick the winner. Otherwise will result in an undefined error.</p>
                <button onClick={this.onClick} className="Button">Draw</button>

                <hr className="Line"/>

                <p>{this.state.message}</p>
            </div>
        );
    }
}
export default App;
