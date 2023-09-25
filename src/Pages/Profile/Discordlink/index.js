import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { Button } from "reactstrap";
import { Fade } from "react-reveal";
import { useLocation, useNavigate } from 'react-router-dom';

import Authrizedmod from "Component/Modals/Authrizedmod";
import { getDiscordData, getDiscordUserData, getProfile, unlinkDiscord } from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Discordlink = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authToken, user } = useSelector(state => state.Login)
  const {loading} = useSelector(state => state.Discord)
  const { userDetails } = useSelector(state => state.Profile)
  const [authorized, setauthorized] = useState(false);
  const [discord, setdiscord] = useState('0');
  const [discordLink,setDiscordLink] = useState(null);
  const location = useLocation();

  const fragment = window.location.hash;
  const params = fragment.slice(1).split('&');
  const accessToken = params[1] && params[1].slice(13);

  useEffect(() => {
    if (accessToken && authToken) {
      let data = accessToken
      const callback = (response) => {
        if (response.status == "success") {
          dispatch(getProfile());
          toast.success("Discord connect successfully!")
        } else {
          toast.error(response.message)
        }
        console.log(userDetails, "userDetails123")
        if (userDetails?.discord_link && userDetails?.og_role_status) {
          setdiscord('1');
        } else if (userDetails?.discord_link && !userDetails?.og_role_status && userDetails?.wl_role_status) {
          setdiscord('2');
        } else if (userDetails?.discord_link && !userDetails?.og_role_status && !userDetails?.wl_role_status) {
          setdiscord('3');
        } else if (userDetails?.discord_link && userDetails?.og_role_status === false) {
          setdiscord('3');
        }
        navigate(location.pathname, { replace: true })
      }
      dispatch(getDiscordUserData(data, callback))
    }
  }, [authToken, accessToken])

  useEffect(() => {
    console.log(userDetails, "userDetails123")
    if (userDetails?.discord_link && userDetails?.og_role_status) {
      setdiscord('1');
    } else if (userDetails?.discord_link && userDetails?.og_role_status === false && userDetails?.wl_role_status) {
      setdiscord('2');
    } else if (userDetails?.discord_link && userDetails?.og_role_status === false && userDetails?.wl_role_status === false) {
      setdiscord('3');
    } else if (userDetails?.discord_link && userDetails?.og_role_status === false) {
      setdiscord('3');
    }
  }, [userDetails])

  const openLink = (url) => {
    // Add a <a> to use to download an image file
    try{
      var linkElement = document.createElement('a');
      linkElement.id = 'link';
      window.document.body.appendChild(linkElement);
      var link = document.getElementById('link');
      link.setAttribute('href', url);
      link.setAttribute('target', "_blank");
      link.click();
    }catch(err){
      console.log("Error",err);
    }
};


  const Authrized = async () => {
    if (discord) {
      // dispatch(getDiscordData({}, (data) => {
      //   if (data) {
      //     console.log("data", data);
      //     openLink(data);
      //     // window.open(data, '_blank');
      //     setTimeout(()=>{
      //       setdiscord('0');
      //       setauthorized(false);
      //     },2000)
      //   }
      // }));

      // setdiscord("0");
      setauthorized(false);
      setDiscordLink(null);
    }
  
  };

  const disconnectDiscord = () => {
    const callback = (response) => {
      if (response.status == "success") {
        toast.success("Discord unlink successfully")
        dispatch(getProfile());
      } else {
        toast.error(response.error);
      }
    }
    dispatch(unlinkDiscord({}, callback));
  }

  // const {code} = useParams();
  console.log(discord, "discord")

  const onClickLinkToDiscord = () =>{
   dispatch(getDiscordData({}, (data) => {
        if (data) {
          console.log("data", data);
           setDiscordLink(data);
           setauthorized(true)
          // window.open(data, '_blank');
        }
      }));
  }

  return (
    <>
      {authorized && discordLink
      &&(
      <Authrizedmod
        show={authorized}
        onhide={() => setauthorized(false)}
        togglemod={Authrized}
        discordLink={discordLink}
      />
      )
      }
      <section className="Workshop_main common-pad">
        <Container>
          {(() => {
            switch (discord) {
              case '0':
                return (
                  <>
                    <div className="Workshop_content">
                      <h1>Discord Role Bot</h1>
                      <p>Connect Your Discord account to get your roles.</p>
                      <Button
                        className="link_wallet"
                        onClick={() => onClickLinkToDiscord()}
                      >
                        {loading && <Spinner size="sm" color="light" className="mr-2"/>} Link Your Discord Account
                      </Button>
                    </div>
                  </>
                )
              case '1':
                return (
                  <>
                    <div className="Workshop_content">
                      <h1>Discord Role Bot</h1>
                      <p>Connect Your Discord account to get your roles.</p>
                      <Button
                        className="disconnect_account"

                      >
                        Discord account connected !
                      </Button>

                      <div className="mt-4">
                        <p>You are assigned A OG mint session role</p>
                        <Button
                          className="link_wallet text-uppercase"
                          onClick={() => { setdiscord('0'); disconnectDiscord() }}
                        >
                          Unlink your discord Account
                        </Button>
                      </div>
                    </div>
                  </>
                )
              case '2':
                return (
                  <>
                    <div className="Workshop_content">
                      <h1>Discord Role Bot</h1>
                      <p>Connect Your Discord account to get your roles.</p>
                      <Button
                        className="disconnect_account"

                      >
                        Discord account connected !
                      </Button>

                      <div className="mt-4">
                        <p>OG mint session role not assigned return to Wl mint session</p>
                        <Button
                          className="link_wallet text-uppercase"
                          onClick={() => { setdiscord('0'); disconnectDiscord() }}
                        >
                          Unlink your discord Account
                        </Button>
                      </div>
                    </div>
                  </>
                )
              case '3':
                return (
                  <>
                    <div className="Workshop_content">
                      <h1>Discord Role Bot</h1>
                      <p>Connect Your Discord account to get your roles.</p>
                      <Button
                        className="disconnect_account"

                      >
                        Discord account connected !
                      </Button>

                      <div className="mt-4">
                        <p> OG/WL mint session role not assigned please return to PUB mint session</p>
                        <Button
                          className="link_wallet text-uppercase"
                          onClick={() => { setdiscord('0'); disconnectDiscord() }}
                        >
                          Unlink your discord Account
                        </Button>
                      </div>
                    </div>
                  </>
                )
            }
          })()}
        </Container>
      </section>
    </>
  );
};

export default Discordlink;
