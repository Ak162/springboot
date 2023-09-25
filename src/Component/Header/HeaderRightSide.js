import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { logoutUser } from "store/actions";

function HeaderRightSide(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const { authToken } = useSelector((state) => state.Login);
  // const { connectWallet } = useSelector((state) => state.Profile)
  const logout = () => {
    dispatch(logoutUser());
  }

  const viewDashButtonOn = ["/home","/welcome"];
  return (
    <>
      {!props.disableButton && (
        <div className="add-wallet-wrap">
          <div className="wallet-section">
          {viewDashButtonOn.includes(pathname) ? 
          <Link to={authToken ? "/inventory": "/signin"} className="nav-link sigb-up-link">
                  Dashboard
          </Link>
          : null}
            {authToken && (
              <>
                <div className="add-wallet-wrap">
                  <div className="wallet-section">
                    <Link to="/" onClick={logout}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="42"
                        height="42"
                        viewBox="0 0 42 42"
                        fill="none"
                      >
                        <path
                          d="M33.25 22.6016L19.25 22.6016L19.25 19.1849L33.25 19.1849L33.25 14.0599L42 20.8932L33.25 27.7266L33.25 22.6016ZM35 10.6432L30.261 10.6432C28.2403 8.90357 25.7483 7.77005 23.084 7.3787C20.4198 6.98735 17.6964 7.35478 15.2407 8.43691C12.7851 9.51904 10.7015 11.2699 9.23988 13.4794C7.7783 15.6889 7.00087 18.2631 7.00087 20.8932C7.00087 23.5233 7.7783 26.0976 9.23988 28.3071C10.7015 30.5166 12.7851 32.2674 15.2407 33.3495C17.6964 34.4317 20.4198 34.7991 23.084 34.4077C25.7483 34.0164 28.2403 32.8829 30.261 31.1432L35 31.1432C33.3713 33.2664 31.2579 34.9895 28.8276 36.1757C26.3973 37.3619 23.7171 37.9785 21 37.9766C11.3347 37.9766 3.5 30.3283 3.5 20.8932C3.5 11.4581 11.3348 3.80989 21 3.80989C23.7172 3.8079 26.3973 4.42451 28.8276 5.61072C31.2579 6.79693 33.3713 8.52007 35 10.6432Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default HeaderRightSide;
