import React from 'react';

const stopPropagation = e => e.stopPropagation();

export default ({close}) =>
  <div className='modal-container' onClick={close}>
    <div className='modal-body' onClick={stopPropagation}>
      <h3>Details:</h3>
      <p>
        The idea here is that you can stake some amount of ETH on what you believe to be the consensus price of ETH in USD. If you're within the two inner quartiles of all guesses submitted in the last epoch (100 blocks) you split the bets of all those who guessed in the outer quartiles with the other winners, plus your initial investment.
      </p>
    </div>
    <style jsx>{`
      .modal-container {
        align-items: center;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        height: 100vh;
        justify-content: center;
        left: 0;
        position: absolute;
        top: 0;
        width: 100vw;
        z-index: 2;
      }
      .modal-body {
        background-color: white;
        border-radius: 2px;
        height: 400px;
        padding: 12px;
        width: 400px;
      }
    `}</style>
  </div>