import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/Proyecto-Final-JoseMariaLopez">
    <CarritoProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CarritoProvider>
  </BrowserRouter>
);
