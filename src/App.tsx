import React from "react";
import { ListProvider } from "./store/ListContext";
import List from "./components/List";
import "./App.css";

const App: React.FC = () => (
  <ListProvider>
    <div className="container">
      <h1>Should I eat at McDonalds?</h1>
      <div className="flex">
        <List title="Pros" listType="pros" />
        <List title="Cons" listType="cons" />
      </div>
    </div>
  </ListProvider>
);

export default App;
