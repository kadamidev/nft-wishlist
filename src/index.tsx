import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import List from "./List"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SessionProvider } from "./SessionContext"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <SessionProvider>
          <Route path="/list" element={<List />}>
            <Route path=":listId" element={<List />} />
          </Route>
        </SessionProvider>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)
