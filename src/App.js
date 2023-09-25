import React from "react";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
//store
import store from "./store";
//Context
import { WalletProvider } from "util/wallet";
//component
import MyRouts from "./Routers/routes";

//Css
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "toastr/build/toastr.min.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <WalletProvider>
          <ToastContainer />
          <MyRouts />
        </WalletProvider>
      </Provider>
    </div>
  );
}

export default App;
