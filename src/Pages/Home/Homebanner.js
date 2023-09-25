import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Fade } from "react-reveal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Web3Intraction, { convertFromWei } from "util/web3Intraction";

///store
import { getProfile, postWhitelist, getCollection } from "store/actions";
import moment from "moment";

const Homebanner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { authToken, user } = useSelector((state) => state.Login);
  const { loading } = useSelector((state) => state.Whitelist);
  const { settings } = useSelector((state) => state?.Setting);
  const { collection } = useSelector((state) => state?.Collection);

  const [activeCollection, setActiveCollection] = useState({});
  const [endSaleTime, setSaleEndTime] = useState("");

  const handleWhitelist = (e) => {
    e.preventDefault();
    if (!authToken) {
      return toast.error("Please connect wallet!");
    }
    dispatch(postWhitelist(null, () => dispatch(getProfile())));
  };

  useEffect(() => {
    dispatch(getCollection(settings?.activeCollectionId));
  }, [settings]);

  useEffect(() => {
    if (collection) {
      setActiveCollection(collection);
    }
  }, [collection]);
  useEffect(() => {
    if (activeCollection && settings) {
      (async () => {
        const web3Intraction = new Web3Intraction(
          activeCollection.blockchain,
          settings
        );

        try {
          const contract = await web3Intraction.getContract(
            activeCollection.contractAbi,
            activeCollection.contractAddress
          );

          if (!contract) return;

          var saleEndTime = await contract.methods.saleEndTime().call();
          if (saleEndTime) {
            saleEndTime = moment.unix(saleEndTime).format("DD MMM HH:mm");
            setSaleEndTime(saleEndTime);
          }
        } catch (err) {
          console.log("Contract error", err);
        }
      })();
    }
  }, [settings, activeCollection]);
  return (
    // <Fade>
      <section id="homesection" className="home_banner position-relative">
        <div className="banner_overlay"></div>
        <Container>
          <div className="home_banner_content position-relative">
            {/* <p className="sub_head">{activeCollection?.mintedNft || 0} / {activeCollection?.maxSupply} MINTED</p> */}
           

           <div className="banner_logo">
            
            <img src="/images/logo.png" alt="logo" className="img-fluid" />
           </div>

            {/* <h2>EXPLORE NFT COLLECTION</h2>
            <p className="sub_para">
              PRICE {activeCollection?.cost} ETH + GAS MINT IS LIVE UNTIL {endSaleTime}H PRESALE SOLDOUT
            </p> */}

            {/* <div className="button_banner">
              <Button className="Whitelists_btn" onClick={handleWhitelist}>
                Whitelists
              </Button>
              <Button className="MINT_btn" onClick={() => navigate("/og-mint")}>
                MINT
              </Button>
            </div> */}
            <section className="home-page" style={{ zIndex: "99" }}>
              <div className="home-desc text-center mt-4">
                <div className="enter-btn-part">
                  <p className="welcome_text text-center mt-3 mb-0 text-white">
                    {settings?.homePageBannerSetting?.description}
                  </p>
                </div>
                <div className="animated-text">
                  <p>
                    <svg width="22" height="22" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="m10.875 19.3l-6.6-6.6q-.15-.15-.213-.325Q4 12.2 4 12t.062-.375q.063-.175.213-.325l6.6-6.6q.275-.275.687-.288q.413-.012.713.288q.3.275.313.687q.012.413-.288.713L7.4 11h11.175q.425 0 .713.287q.287.288.287.713t-.287.712Q19 13 18.575 13H7.4l4.9 4.9q.275.275.288.7q.012.425-.288.7q-.275.3-.7.3q-.425 0-.725-.3Z"
                      />
                    </svg>
                    scroll down
                  </p>
                </div>
              </div>
            </section>
          </div>
        </Container>
      </section>
    // </Fade>
  );
};

export default Homebanner;
