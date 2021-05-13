import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar/index";
import DataPickers from "./Components/DatePicker/DatePicker";
import "./Styles/style.css";
import "./App.css";
import FromDesign from "./Components/FormDesign/FromDesign";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
// import SearchBox from "./SearchTest/SearchBox";
import Tables from "./Components/Tables/Tables";
import ApiTable from "./Components/Tables/API-Table/ApiTable";
import { TodosProvider } from "./store/ContextStore/TodoContext";

function App() {
  return (
    <div className="App">
      <TodosProvider>
        <Router>
          <Navbar />
          {/* <SearchBox /> */}
          <Switch>
            <Route exact path="/" component={DataPickers} />
            <Route path="/formdesign" component={FromDesign} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/table" component={Tables} />
            <Route path="/mytable" component={ApiTable} />
          </Switch>
        </Router>
      </TodosProvider>
    </div>
  );
}

export default App;
