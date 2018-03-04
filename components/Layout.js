import React from 'react';
import Link from 'next/link'
import {Meta} from "./Meta";

export default props => (
  <div className='root'>
    <Meta/>
    <div className='navigation'>
      <Link href="/"><span className='link'>web3 eth api explorer</span></Link>
      <Link href="/contract"><span className='link'>contract interactions</span></Link>
    </div>
    {props.children}
    <style jsx>
      {`
        .root {
          height: 100vh;
          width: 100vw;
          display: grid;
          grid-template-rows: 40px auto;
          align-items: center;
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
        span {
          position: relative;
          cursor: pointer;
          text-decoration: none;
        }
        span::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 1px;
          bottom: 6px;
          left: 0;
          background-color: #000;
          visibility: hidden;
          transform: scaleX(0);
          transition: all 0.3s ease-in-out 0s;
        }
        span:hover::before {
          visibility: visible;
          transform: scaleX(1);
        }
      `}
    </style>
  </div>
);

