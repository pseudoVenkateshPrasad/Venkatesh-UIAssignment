import React from "react";
import "./App.css";
import Main from "./components/main/Main";
import { Tabs, Tab } from "./utility/tabs/Tabs";

import AllTransactions from "./components/allTransactions/AllTransactions";

function App() {
  return (
    <div className="App">
      {/* <Main /> */}
      <div className="header">
        <span></span>
        <h2 className="title">Customer Transactions Dashboard</h2>
        <span className="accessories"></span>
      </div>

      <div className="tabs-container">
        <Tabs>
          <Tab label="All Transactions">
            <AllTransactions />
          </Tab>
          <Tab label="Customers Rewards Dashboard">
            <Main />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
