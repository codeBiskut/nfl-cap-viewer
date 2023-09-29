import React, { Component } from 'react';

class ContractList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: [],
    };
  }

  componentDidMount() {
    // Fetch the JSON data when the component mounts
    fetch('/browns_contracts.json')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        this.setState({ contracts: data });
      })
      .catch((error) => {
        console.error('Error fetching JSON:', error);
      });
  }

  render() {
    return (
      <div>
        <h1>NFL Contracts</h1>
        <ul>
          {this.state.contracts.map((contract, index) => (
            <li key={index}>
              Player: {contract.Player}<br />
              Position: {contract.Position}<br />
              Contract Value: {contract['Contract Value']}<br />
              Cap Hit: {contract['Cap Hit']}<br />
              Expires: {contract['Expires']}<br />
              Acquired: {contract.Acquired}<br/><br/>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ContractList;
