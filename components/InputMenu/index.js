import React from 'react';
import SubmitNewCommitment from "./SubmitNewCommitment";
import ValidateCommitment from "./ValidateCommitment";

const FillerStyle = () =>
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

export default ({commitmentPending, requiresValidation}) => {
  if (commitmentPending && requiresValidation) {
    return <ValidateCommitment/>;
  } else if (commitmentPending && !requiresValidation) {
    return <div className="filler">
      <h4>You've validated your submission. Time to see if you're in the money!</h4>
      <FillerStyle/>
    </div>;
  }else if (!commitmentPending) {
    return <SubmitNewCommitment/>
  } else {
    return <div className="filler">
      <h4>Submissions are open every N blocks. (n remaining)</h4>
      <FillerStyle/>
    </div>;
  }
};