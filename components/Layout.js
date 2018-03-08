import React from 'react';
import Link from 'next/link'
import {Meta} from "./Meta";

export default ({children}) => (
  <div className='root'>
    <Meta/>
    <div className='navigation'>
      <Link href="/"><span className='link'>web3 eth api explorer</span></Link>
      <img className='dumbIcon' src='/static/eth.svg'/>
      <Link href="/contract"><span className='link'>contract interactions</span></Link>
    </div>
    {children}
    <style jsx>
      {`
        .root {
          height: 100vh;
          width: 100vw;
          display: grid;
          grid-row-gap: 36px;
          grid-template-rows: 40px 40px auto;
          align-items: flex-start;
          justify-content: center;
        }
        .navigation {
          align-self: center;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 800px;
        }
        .dumbIcon {
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: 1.5s ease-in-out alternate infinite float;
          transition: all 0.3s ease, margin 1s ease-in-out;
        }
        @keyframes float {
            0% {transform: translateY(-2px)}
            100% {transform: translateY(2px)}
        }
        span {
          position: relative;
          cursor: pointer;
          text-decoration: underline;
        }
        span.active {
          font-weight:bold;
        }
        span::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 6px;
          left: 0;
          background-color: #000;
          visibility: hidden;
          transform: scaleX(0);
          transition: all 150ms ease-in-out 0s;
        }
        span:hover::before {
          visibility: visible;
          transform: scaleX(1);
        }
      `}
    </style>
  </div>
);
