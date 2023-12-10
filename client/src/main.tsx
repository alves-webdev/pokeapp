import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Navigate, Routes } from "react-router-dom";
import Root from "./routes/root";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import PokemonDetailsPage from "./routes/pokemonDetails";
import Login from "./routes/login";
import { Provider, useSelector } from "react-redux";
import store, { RootState, persistor } from "./redux/store";
import Register from "./routes/register";
import NavBar from "./components/navBar";
import User from "./routes/user";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// New functional component to encapsulate routing logic
export const AppRoutes = () => {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);

  return (
    <Routes>
      <Route
        path="/"
        element={isLogged ? <Root /> : <Navigate to="/login" />}
      />
      <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
      <Route
        path="/login"
        element={isLogged ? <Navigate to="/user" /> : <Login />}
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/user"
        element={isLogged ? <User /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <React.StrictMode>
        <Router>
          <ToastContainer />
          <NavBar />
          <AppRoutes />
        </Router>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
