import React, {Fragment} from 'react';
import Head from 'next/head';

export const Meta = () =>
  <Fragment>
    <Head>
      <title>에테르</title>
      <meta name="theme-color" content="#33ffce"/>
      <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.png'/>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta charSet="utf-8"/>
    </Head>
    <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Open Sans', sans-serif;
        }
        *::selection {
          background: #33ffce;
          color: white;
        }
  `}</style>
  </Fragment>;