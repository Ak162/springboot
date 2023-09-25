import React, { useState, useCallback, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Fade } from "react-reveal";
import { toast } from "react-toastify";
import useWallet from "hooks/wallet";
// Components  // Validation  Helper
import { ValidEmail } from "helpers/validations";
import Wishlistmod from "Component/Modals/Wishlistmod";
import moment from "moment";
import Web3 from "web3";

import Web3Intraction, { convertFromWei } from "util/web3Intraction";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Store
import {
  postWhitelist,
  getCollection,
  getSettings,
  postMintActivity,
} from "store/actions";
import TimeCountDown from "Component/TimeCounDown/TimeCountDown";

export default function Singlecollection() {
  const wallet = useWallet();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state?.Whitelist);
  const { user, authToken } = useSelector((state) => state.Login);
  const { settings } = useSelector((state) => state?.Setting);
  const { collection } = useSelector((state) => state?.Collection);
  const [wishlist, setwishlist] = useState(false);
  const [loadings, setloading] = useState({});
  const [activeCollection, setActiveCollection] = useState({});
  const [auctionDetails, setAuctionDetails] = useState({});
  const [fields, setfields] = useState({
    email: "",
    address: "",
  });

  // User Whitelist Request
  const toggleModal = () => {
    if (!wallet?.isActive) {
      return toast.error("Please Connect your metamask wallet!!");
    }
    setwishlist(true);
  };

  const whiteListHandleChange = useCallback(
    (name) => (evt) => {
      setfields((prevState) => ({ ...prevState, [name]: evt.target.value }));
    },
    [fields]
  );

  const onSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      if (loading) return;
      if (!ValidEmail(fields?.email)) {
        return toast.error("Email is not valid!!");
      }
      const callback = () => {
        setwishlist(!wishlist)
        toast.success("Send request for whitelist successfully!")
      };
      dispatch(postWhitelist(fields, callback));
    },
    [fields]
  );

  useEffect(() => {
    dispatch(getCollection(settings?.activeCollectionId));
  }, [settings]);

  useEffect(() => {
    if (collection) {
      setActiveCollection(collection);
    }
  }, [collection]);

  useEffect(() => {
    if (collection) {
      if (
        collection.contractAddress &&
        collection.receiptStatus === "success" &&
        JSON.stringify(settings) !== "{}"
      ) {
        (async () => {
          console.log(wallet?.provider, " wallet?.provider");
          const web3Intraction = new Web3Intraction(
            collection.blockchain,
            settings
          );
          console.log(collection, "collection");
          try {
            const contract = await web3Intraction.getContract(
              collection.contractAbi,
              collection.contractAddress
            );
            // console.log(contract, "contract")

            const saleStartTime = await contract.methods.saleStartTime().call();
            const saleEndTime = await contract.methods.saleEndTime().call();
            console.log(saleStartTime, saleEndTime, "sale times");
            setAuctionDetails({
              saleStartTime: moment
                .unix(saleStartTime)
                .format("YYYY-MM-DDTHH:mm"),
              saleEndTime: moment.unix(saleEndTime).format("YYYY-MM-DDTHH:mm"),
            });
          } catch (err) {
            console.log("Contract error", err);
          }
        })();
      }
    }
  }, [collection, settings, wallet]);

  const onMint = async () => {
    console.log("minting");
    dispatch(getSettings(beforeMint()));
  };

  const beforeMint = () => {
    if (!authToken) {
      console.log("minting call before wallet");
      wallet.connect();
    } else {
      console.log("minting call");
      mintNft();
    }
  };

  const mintNft = async () => {
    try {
      console.log("coming");
      if(collection.maxSupply == collection.mintedNft){
        return toast.error("All Nft minted for current active collection!")
      }
      setloading(true);
      const web3Intraction = new Web3Intraction(
        collection.blockchain,
        settings
      );  

      const contract = web3Intraction.getContract(
        collection.contractAbi,
        collection.contractAddress
      );

      if (!contract) {
        setloading(false);
        return toast.error("Contract not found!");
      }

      await wallet.switchNetwork(web3Intraction.networkUrl.chainId);

      const cost = await contract.methods.cost().call();
      console.log(cost, "cost");
      const value = Number(convertFromWei(cost.toString()));

      const options = {
        value: web3Intraction.convertPriceToEther(value.toString()),
      };

      // const transaction = await contract.methods.mintNFT(1, user?.root, user?.proof, options);
      // const receipt = await transaction.wait();
      //set up transaction parameters
      const transactionParameters = {
        to: collection.contractAddress, // Required except during contract publications.
        from: user.walletAddress, // must match user's active address.
        data: contract.methods.mintNFT(1, user?.root, user?.proof).encodeABI(),
        value: web3Intraction.convertPriceToEther(value.toString()),
      };

      try {
        let receipt = await web3Intraction.eth_sendTransaction(
          transactionParameters,
          true
        );
        dispatch(
          postMintActivity(
            {
              blockchain: collection.blockchain,
              type: collection.blockchain,
              collection_id: collection._id,
              name: collection.name + receipt?.token_id,
              description: collection.description,
              price: value,
              transactionHash: receipt?.transactionHash,
              token_id: receipt?.token_id,
            },
            async () => {
              // let total = await contract.totalSupply();

              // setGetData({ total: total?.toString() });
              setloading(false);
              toast.success("Mint Nft Successully");
              window.location.reload();
            }
          )
        );
      } catch (error) {
        console.log(error, "error");
      }
    } catch (err) {
      setloading(false);
      if (err.message) {
        return toast.error(err.message);
      }
      console.log("err", err);
    }
  };
  return (
    <Fade>
      <Wishlistmod
        title={
          "After previews on our NFTs and an official showing across various influencers /KOLs, Legendary Racers is finally offering a chance toget your exclusive NFTs"
        }
        desc={
          "  1,999 Whitelisted NFTs, if you’re into Supercars, yachts, exclusive events, networking, great community and so much more, then this is the Brand you want to be a part of."
        }
        show={wishlist}
        fields={fields}
        handleChange={whiteListHandleChange}
        onSubmit={onSubmit}
        onhide={() => setwishlist(false)}
      />

      <section className="single_collection cutom_padding">
        <Container>
          <Row>
            <Col lg={5} md={6} sm={12}>
              <div className="single_image_grid">
                <div className="single_top_big">
                  <img
                    src={
                      activeCollection?.image
                        ? activeCollection?.image?.link
                        : "/images/singlebig.png"
                    }
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
            </Col>

            <Col lg={6} md={6} sm={12} className="offset-lg-1">
              <div className="single_pagerigth_cont">
                <h2>{activeCollection?.name}</h2>

                <div className="single_collectionuser_wrap">
                  <div className="single_collectionuser_name">
                    <div className="single_collectionuser_img">
                      <img
                        src={
                          activeCollection?.author?.profileImage
                            ? activeCollection?.author?.profileImage
                            : "/images/usergif.gif"
                        }
                        alt=""
                        className="img-fluid"
                      />
                    </div>

                    <div className="single_collectionuser_content">
                      <span>Collection</span>
                      <p>
                        "ADMIN"
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#4A3AFF"
                            d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12Z"
                          ></path>
                        </svg>
                      </p>
                    </div>
                  </div>
                  {/* <div className="single_collectionuser_id">
                    <p>Doodle #1410</p>
                  </div> */}
                </div>
                <div className="single_collectionuser_content">
                  <p><b>Total Nft:</b> {activeCollection?.maxSupply}</p>
                  <p>Minted Nft: {activeCollection?.mintedNft || 0}</p>
                </div>

                <div className="sendiing_ending">
                  <p className="sending_heading">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="19"
                      viewBox="0 0 15 19"
                      fill="none"
                    >
                      <path
                        d="M15 11.4173C15 15.6051 11.6421 19 7.50001 19C3.36807 19 0.0309508 15.6524 0.000213311 11.475C-0.0113231 9.91086 0.445631 8.45531 1.23766 7.24316C1.41398 6.9733 2.44294 5.53887 2.44294 5.53887L3.13698 6.24061C3.31239 6.41794 3.52838 6.54874 3.76579 6.62141C4.0032 6.69408 4.25469 6.70637 4.49793 6.65719C5.20501 6.51423 5.71305 5.88499 5.70905 5.15597C5.70499 4.40442 5.80613 3.42508 6.23574 2.55642C7.13712 0.733732 8.76428 0 8.76428 0C8.76428 0 9.54437 2.98242 12.9785 6.81708C14.0445 8.00745 15 9.6875 15 11.4173Z"
                        fill="#21E786"
                      />
                    </svg>
                    Sale Ending In :
                  </p>
                  <TimeCountDown auctionDetails={auctionDetails} />
                  {/* <ul className="timing_list_single">
                    <li>
                      <div className="timing_div_single">
                        <h4>01</h4>
                        <p>Days</p>
                      </div>
                    </li>

                    <li>
                      <div className="timing_div_single">
                        <h4>18</h4>
                        <p>Hours</p>
                      </div>
                    </li>

                    <li>
                      <div className="timing_div_single">
                        <h4>06</h4>
                        <p>MIns</p>
                      </div>
                    </li>

                    <li>
                      <div className="timing_div_single">
                        <h4>35</h4>
                        <p>Secs</p>
                      </div>
                    </li>
                  </ul> */}

                  <div className="presale_Collection">
                    <p>
                      <strong className="color-blue">Presale:</strong>{" "}
                      {activeCollection?.name}
                    </p>

                    <div className="single_price_wrap">
                      <div className="single_token_price">
                        <img
                          src="/images/bigeth.png"
                          alt=""
                          className="img-fluid"
                        />
                        <h4>{activeCollection.cost} ETH</h4>
                      </div>

                      {/* <div className="couter_product">
                        <Button className="counter-btn" onClick={increment}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                          >
                            <path
                              d="M12.8677 21.9167V15.131H6.08203V12.8691H12.8677V6.08334H15.1297V12.8691H21.9154V15.131H15.1297V21.9167H12.8677Z"
                              fill="#21E786"
                            />
                          </svg>
                        </Button>
                        <div className="output">{counter}</div>
                        <Button className="counter-btn" onClick={decrement}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                          >
                            <path
                              d="M13.8089 16.1905H6.66602V13.8095H13.8089H16.1898H23.3327V16.1905H16.1898H13.8089Z"
                              fill="#21E786"
                            />
                          </svg>
                        </Button>
                       </div> */}
                    </div>
                  </div>
                  {user?.whitelistStatus == "accepted" ? (
                    <Button className="Whitelists-btn" onClick={onMint}>
                      {" "}
                      {/**/}
                      Mint
                    </Button>
                  ) : (
                    <Button className="Whitelists-btn" onClick={toggleModal}>
                      Whitelists
                    </Button>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Fade>
  );
}
