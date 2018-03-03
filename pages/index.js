import React from 'react';
import {WithWeb3} from "../components/web3";
import NetworkExplorer from "../components/NetworkExplorer";
import Layout from "../components/Layout";

export default () =>
  <Layout>
    <WithWeb3
      network={'Rinkeby'}
      render={props => <NetworkExplorer {...props}/>}/>
  </Layout>;

