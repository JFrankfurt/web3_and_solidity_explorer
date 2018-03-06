import React, {Component} from 'react'

export default class SubmitNewCommitment extends Component {
  state = {
    commitment: '',
    stake: ''
  };
  change = e => {
    if (!isNaN(parseInt(e.target.value)) || e.target.value === '') {
      this.setState({[e.target.name]: e.target.value});
    }
  };
  submitCommitment = () => {
    console.log(this.state);
  };

  render() {
    const {commitment, stake} = this.state;
    const {change, submitCommitment} = this;
    return (
      <div className='commitment-root'>
        <h3 className='title'>new commitment</h3>
        <span className='input'>USD/ETH:
            <input type="text" placeholder="Price of 1 Eth in USD" name="commitment"
                   value={commitment} onChange={change}/>
            </span>
        <span className='input'>Stake (ETH):
            <input type="text" placeholder="Stake in eth" name="stake"
                   value={stake} onChange={change}/>
            </span>
        <span className="button" onClick={submitCommitment}>Submit</span>
        <style jsx>{`
          .commitment-root {
            background-color: #f0f0f0;
            display: grid;
            grid-template-rows: 32px auto auto 40px;
            grid-row-gap: 4px;
            height: auto;
            width: 100%;
          }
          .buttons {
            align-items: center;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            width: 100%;
          }
          .button {
            align-items: center;
            background-color: #33ffce;
            border-radius: 1px;
            border: 1px solid transparent;
            cursor: pointer;
            display: flex;
            font-weight: bold;
            margin: 5px 0;
            padding: 2px 4px;
            justify-content: center;
            justify-self: center;
            transition: 200ms ease all;
          }
          .button:hover {
            background-color: #12ffc6;
            border: 1px solid black;
          }
          .input {
            align-items: center;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 0 12px;
            width: 100%;
          }
          input:focus {
            outline: 1px solid #33ffce;
          }
          .title {
            background-color: #33ffce;
            margin-bottom: 6px;
            padding-left: 4px;
            text-transform: uppercase;
          }
        `}</style>
      </div>
    );
  }
}