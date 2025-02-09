import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Use createRoot from react-dom/client
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import "./index.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';

// Get the root element
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </Provider>
  );
}
