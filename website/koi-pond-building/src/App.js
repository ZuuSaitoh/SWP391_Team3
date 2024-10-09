import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from './page/homePage/homepage';
import ServiceDesign from './page/serviceDesign/serviceDesign';
import ServiceClean from './page/serviceClean/serviceClean';
import ServiceMaintenance from './page/serviceMaintenance/serviceMaintenance';
// Import other components as needed

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/service-design" component={ServiceDesign} />
        <Route path="/service-clean" component={ServiceClean} />
        <Route path="/service-maintenance" component={ServiceMaintenance} />
        {/* Add other routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;