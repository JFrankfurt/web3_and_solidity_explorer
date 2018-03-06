import React from 'react';
import {WithWeb3} from "../components/eth/index";
import NetworkExplorer from "../components/NetworkExplorer";
import Layout from "../components/Layout";

export default () =>
  <Layout>
    <WithWeb3
      network={'Rinkeby'}
      render={props => <NetworkExplorer {...props}/>}/>
  </Layout>;

