import React, {Component, Fragment} from 'react';
import InputMenu from './InputMenu/index';

export class ContractExplorer extends Component {
  state = {
    commitmentPending: false,
    requiresValidation: false,
    showModal: false,
  };

  render() {
    const {showModal} = this.state;
    return (
      <Fragment>
        {showModal ? <div className='modal'>test</div> : null}
        <div className='contract-root'>
          <InputMenu {...this.state}/>
          <div className='epoch'>
            <h3 className='title'>past epochs</h3>
            <div className='epoch-list'>
            </div>
          </div>
          <style jsx>{`
          .contract-root {
            width: 800px;
            display: grid;
            grid-template-columns: 2fr 3fr;
            grid-column-gap: 25px;
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
            height: 100%;
            overflow-y: auto;
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
        </div>
      </Fragment>
    );
  }
}