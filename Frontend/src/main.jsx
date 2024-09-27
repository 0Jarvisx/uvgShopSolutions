import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { FiltersProvider } from "./Context/FilterContext.jsx";
import { CarritoProvider } from "./Context/CarritoContext.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
createRoot(document.getElementById("root")).render(
  <FiltersProvider>
    <AuthProvider>
      <CarritoProvider>
        <Router>
          <App />
        </Router>
      </CarritoProvider>
    </AuthProvider>
  </FiltersProvider>
);
