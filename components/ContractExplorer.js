import React, {Component, Fragment} from 'react';
import InputMenu from './InputMenu/index';
import ExplanationModal from "./ExplanationModal";

export class ContractExplorer extends Component {
  state = {
    commitmentPending: false,
    requiresValidation: false,
    showModal: false,
  };

  toggleModal = () =>
    this.setState(({showModal}) => ({showModal: !showModal}));

  render() {
    const {showModal} = this.state;
    const {toggleModal} = this;
    return (
      <Fragment>
        {showModal ? <ExplanationModal close={toggleModal}/> : null}
        <div className='contract-root'>
          <InputMenu {...this.state}/>
          <div className='epoch'>
            <h3 className='title'>past epochs</h3>
            <div className='epoch-list'>
            </div>
          </div>
          <span className='help' onClick={toggleModal}>?</span>
        </div>
        <style jsx>{`
          .contract-root {
            display: grid;
            grid-template-columns: 2fr 3fr;
            grid-column-gap: 25px;
            position: relative;
            width: 800px;
          }
          .epoch {
            background-color: #f0f0f0;
            grid-column: 2/3;
            grid-row: 1/3;
            display: flex;
            flex-direction: column;
          }
          .epoch-list {
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            height: 350px;
          }
          .help {
            align-items: center;
            background-color: #f8f8f8;
            border: 1px solid grey;
            border-radius: 50%;
            color: grey;
            cursor: pointer;
            display: flex;
            font-weight: bold;
            font-size: 110%;
            height: 25px;
            justify-content: center;
            position: absolute;
            top: -30px;
            width: 25px;
            transition: 300ms ease all;
          }
          .help:hover {
            background-color: #33ffc3;
            color: black;
            border-color: black;
          }
          input {
            border: 1px solid #33ffcc;
            border-radius: 1px;
            outline: none;
            padding: 1px 4px;
          }
          .title {
            background-color: #33ffce;
            margin-bottom: 6px;
            padding-left: 4px;
            text-transform: uppercase;
          }
          .user-history {
            background-color: #f0f0f0;
          }
        `}</style>
      </Fragment>
    );
  }
}