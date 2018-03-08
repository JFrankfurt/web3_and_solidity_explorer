import React from 'react';

export const Loader = () =>
  <div className='loader-root'>
    Loading...
    <img src="/static/eth.svg" className='dumbIcon'/>
    <style jsx>{`
    .loader-root {

    }
    .dumbIcon {
      border-radius: 50%;
      width: 30px;
      height: 30px;
      animation: 1s ease-in-out alternate infinite float;
      transition: all 0.3s ease, margin 1s ease-in-out;
    }
    @keyframes float {
      0% {transform: translateY(-4px)}
      100% {transform: translateY(4px)}
    }
    `}</style>
  </div>;