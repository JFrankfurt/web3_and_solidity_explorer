import React from "react";
import Layout from "../components/Layout";
import {WithWeb3} from "../components/eth/index";
import {ContractExplorer} from "../components/ContractExplorer";

export default () =>
  <Layout>
    <WithWeb3
      network={'Rinkeby'}
      renderLoading={() => <div>loading...</div>}
      render={props => <ContractExplorer {...props}/>}/>
  </Layout>;

