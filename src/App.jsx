import axios from "axios";
import { UserContextProvider } from "./UserContext";
import { Routes } from "./Routes";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes as Router, Route } from "react-router-dom";
import { RegisterOrLogin } from "./RegisterOrLogin";

function App() {
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Toaster
          position="right-top"
          toastOptions={{
            success: {
              style: {
                background: "#98ABEE",
              },
            },
            error: {
              style: {
                background: "#D04848",
              },
            },
            iconTheme: {
              primary: "#EEF5FF",
              secondary: "#000",
            },
          }}
        />

        <Router>
          <Route path="/" element={<Routes />} />
          <Route path="/auth" element={<RegisterOrLogin />} />
        </Router>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
