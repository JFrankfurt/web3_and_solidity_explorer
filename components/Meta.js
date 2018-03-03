import React, {Fragment} from 'react';
import Head from 'next/head';

export const Meta = () => (
  <Fragment>
    <Head>
      <title>월광</title>
      <link rel='shortcut icon' type='image/x-icon' href='/static/images/favicon.png'/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta charSet="utf-8"/>
    </Head>
    <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
  `}</style>
  </Fragment>
);