import React from "react";
import Layout from "../components/Layout";
import {WithWeb3} from "../components/web3";
import {ContractExplorer} from "../components/ContractExplorer";

export default () =>
  <Layout>
    <WithWeb3
      network={'Rinkeby'}
      render={props => <ContractExplorer {...props}/>}/>
  </Layout>;

