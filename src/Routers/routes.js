import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// importing all the themes
import Welcometheme from "../themes/welcome-theme";
import Hometheme from "themes/home-theme";
import Singlecollectiontheme from "themes/singlecollection-theme";
import Myprofiletheme from "themes/myprofile-theme";

// profile routes
import Workshop from "Pages/Profile/Workshop";
import Nfts from "Pages/Profile/Nfts";
import Account from "Pages/Profile/Account";
import Scannizer from "Pages/Profile/Scannizer";
import Linkedwallet from "Pages/Profile/Linkedwallet";
import Discordlink from "Pages/Profile/Discordlink";
import MintOG from "Pages/Profile/mint";
import Collectionstack from "Pages/Profile/Collectionstack";
import PowerRoom from "Pages/Profile/PowerRoom"
import Signintheme from "themes/signin-theme";
import Signuptheme from "themes/signup-theme";
import Forgotpasstheme from "themes/forgotpass-theme";

import Notfound from "Pages/Notfound";
import { Navigate } from "react-router-dom";

// Store
import { getProfile, getSettings } from "store/actions";
import OGAuthRoute from "Component/OGAuthRoute";
export function ProtectedWrapper({ children }) {
  const {
    Login: { user, authToken },
  } = useSelector((state) => state);

  if (authToken) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
}
export function RedirectWrapper({ children }) {
  const {
    Login: { user, authToken },
  } = useSelector((state) => state);

  if (authToken) {
    return <Navigate to="/inventory" replace />;
  } else {
    return <Navigate to="/welcome" replace />;
  }
}
function MyRouts() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Login);
  console.log("user", user);
  useEffect(() => {
    dispatch(getSettings());
  }, []);
  useEffect(() => {
    dispatch(getProfile());
  }, []);
  console.log(user, "user")
  const isOgAuth = user?.discord_link && user?.og_role_status;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RedirectWrapper></RedirectWrapper>} />
          <Route path="/welcome" element={<Welcometheme />} />
          <Route path="/home" element={<Hometheme />} />
          <Route path="/minting" element={<Singlecollectiontheme />} />

          <Route exact path="/signin" element={<Signintheme />} />
          <Route exact path="/signup" element={<Signuptheme />} />
          <Route exact path="/forgot-password" element={<Forgotpasstheme />} />

          <Route element={<ProtectedWrapper><Myprofiletheme /></ProtectedWrapper>}>
            <Route path="/workshop" element={<ProtectedWrapper><Workshop /></ProtectedWrapper>} />
            <Route path="/og-mint" element={
              <OGAuthRoute isOgAuthenticated={isOgAuth} isAuth={user} element={MintOG} />
            } />
            <Route path="/inventory" element={<ProtectedWrapper><Nfts /></ProtectedWrapper>} />
            <Route path="/account" element={<ProtectedWrapper><Account /></ProtectedWrapper>} />
            <Route path="/scaning" element={<ProtectedWrapper><Scannizer /></ProtectedWrapper>} />
            <Route path="/wallet-link" element={<ProtectedWrapper><Linkedwallet /></ProtectedWrapper>} />
            <Route path="/discord-link" element={<ProtectedWrapper><Discordlink /></ProtectedWrapper>} />
            {/* <Route path="/collection-stacks" element={<ProtectedWrapper><Collectionstack /></ProtectedWrapper>} /> */}
            <Route path="/power_room" element={<ProtectedWrapper><PowerRoom /></ProtectedWrapper>} />
          </Route>
          success
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default MyRouts;
