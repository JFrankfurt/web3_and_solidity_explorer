import React from 'react';
import {Meta} from "./Meta";

export default props => (
  <div className='root'>
    <Meta/>
    {props.children}
    <style jsx>
      {`
        .root {
          height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}
    </style>
  </div>
);

