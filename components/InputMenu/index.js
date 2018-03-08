import React from 'react';
import SubmitNewCommitment from "./SubmitNewCommitment";
import ValidateCommitment from "./ValidateCommitment";

const FillerStyles = () =>
  <style jsx>{`
  .filler {
    align-items: center;
    background-color: #f0f0f0;
    color: #878787;
    display: flex;
    font-weight: bold;
    height: 250px;
    justify-content: center;
    padding: 0 16px;
  }
  `}</style>;

export const MenuStyles = () =>
  <style jsx>{`
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
        input {
          border: 1px solid black;
          border-radius: 1px;
          outline: none;
          padding: 1px 4px;
        }
        input:focus {
          border-color: #33ffce;
        }
        .title {
          background-color: #33ffce;
          margin-bottom: 6px;
          padding-left: 4px;
          text-transform: uppercase;
        }
      `}</style>;

export default props => {
  if (props.commitmentPending && props.requiresValidation) {
    return <ValidateCommitment {...props}/>;
  } else if (props.commitmentPending && !props.requiresValidation) {
    return <div className="filler">
      <h4>You've validated your submission. Time to see if you're in the money!</h4>
      <FillerStyles/>
    </div>;
  } else if (!props.commitmentPending) {
    return <SubmitNewCommitment {...props}/>
  } else {
    return <div className="filler">
      <h4>Submissions are open every N blocks. (n remaining)</h4>
      <FillerStyles/>
    </div>;
  }
};