import React, { useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { Button } from "reactstrap";
import { Fade } from "react-reveal";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// components
import Providerselectmod from "Component/Modals/Providerselectmod";
import Editwallet from "Component/Modals/Editwallet";
import Confirmmationmod from "Component/Modals/Confirmmationmod";

// store
import { addWallet, editWallet, deleteWallet, getWallets, linkWallet } from "store/actions";

// helpers
import useWallet from "hooks/wallet";
import { getProfile } from "store/actions";
import { call } from "redux-saga/effects";

const Linkedwallet = () => {
  const dispatch = useDispatch();
  const { connect } = useWallet();

  const { settings } = useSelector((state) => state.Setting);
  const { wallets } = useSelector((state) => state.Wallets)

  const [providermod, setprovidermod] = useState(true);
  const [editwallet, seteditwallet] = useState(false);
  const [confrimmodal, setconfrimmodal] = useState(false);
  const [currentId, setCurrentId] = useState('');

  const [walletUpdate, setWalletUpdate] = useState(false)



  const connectMetamask = async () => {
    setprovidermod(!providermod);

    const getaccount = await connect(
      "metamask",
      settings.blockchainNetworkMode === "testnet" ? 5 : 1
    );

    let _account;

    if (
      getaccount &&
      getaccount[0] &&
      getaccount[0].accounts &&
      getaccount[0].accounts[0]
    ) {
      _account = getaccount[0].accounts[0].address;
    }

    if (!_account) return "Failed to connect wallet";

    const callback = (response) => {
      if (response.status == "success") {
        toast.success("Wallet link sucessfully!");
        setWalletUpdate(!walletUpdate);
      } else {
        toast.error("Wallet Address already linked!")
      }
    };

    let requestForAdd = {
      walletAddress: _account,
      walletname: "Rabbit" + `${parseInt(Math.random() * 100)}`,
      default: true
    }

    dispatch(addWallet(requestForAdd, callback))
  };

  const connectWallet = async () => {
    setprovidermod(!providermod);

    const getaccount = await connect(
      null,
      settings.blockchainNetworkMode === "testnet" ? 5 : 1
    );

    let _account;

    if (
      getaccount &&
      getaccount[0] &&
      getaccount[0].accounts &&
      getaccount[0].accounts[0]
    ) {
      _account = getaccount[0].accounts[0].address;
    }

    if (!_account) return "Failed to connect wallet";



    const callback = (response) => {
      if (response.status == "success") {
        toast.success("Wallet link sucessfully!");
        setWalletUpdate(!walletUpdate);
      } else {
        toast.error(response.message.replace("_", " ").toLocaleLowerCase().charAt(0).toUpperCase() + response.message.replace("_", " ").toLocaleLowerCase().slice(1))
      }
    };

    let requestForAdd = {
      walletAddress: _account,
      walletname: "Rabbit" + `${parseInt(Math.random() * 100)}`,
      default: true
    }

    dispatch(addWallet(requestForAdd, callback));
  };

  useEffect(() => {

    dispatch(getWallets())
  }, [])

  useEffect(() => {
    setTimeout(()=>{
      dispatch(getWallets())
      dispatch(getProfile());
    },1000)
  }, [walletUpdate])


  const PrimaryWalletUpdate = (id) => {
    if (id) {
      let requestUpdate = {
        "_id": id,
        "default": true
      }

      const callback = (res) => {
        if (res.status == "success") {
          toast.success("Primary Wallet Updated");
          setWalletUpdate(!walletUpdate);
        } else {
          toast.error(res.message);
        }
      };

      dispatch(editWallet(requestUpdate, callback))
    }
  }

  const editWalletName = (name) => {
    if (currentId) {
      let requestUpdate = {
        "_id": currentId,
        "walletname": name
      }

      const callback = (res) => {
        if (res.status == "success") {
          toast.success("Primary Wallet Updated");
          setWalletUpdate(!walletUpdate);

        } else {
          toast.error(res.message);
        }
      };

      seteditwallet(!editWallet)
      dispatch(editWallet(requestUpdate, callback))
    }
  }

  const DeleteWallet = () => {
    if (currentId) {
      let requestUpdate = {
        "_id": currentId
      }

      const callback = (res) => {
        if (res.status == "success") {
          toast.success("Primary Wallet Updated");
          setWalletUpdate(!walletUpdate);
        } else {
          toast.error(res.message);
        }
      };

      setconfrimmodal(!confrimmodal)
      dispatch(deleteWallet(requestUpdate, callback))
    }
  }

  return (

    <>

      <Providerselectmod
        show={providermod}
        onhide={() => setprovidermod(false)}
        connectMetamask={connectMetamask}
        connectWallet={connectWallet}
      />
      <Editwallet onEdit={editWalletName} wallet={wallets.length > 0 && wallets.find(wallet => wallet._id == currentId)} show={editwallet} wallets onhide={() => seteditwallet(false)} />
      <Confirmmationmod onDelete={DeleteWallet} show={confrimmodal} onhide={() => setconfrimmodal(false)} />

      <section className="Workshop_main common-pad">
        <Container>
          <div className="Workshop_content">
            <h1>Linked Wallets</h1>
            <p>
              Here you can link multiple wallets to the same account. This
              allows you to see all your Rabbits, even if they're spread across
              multiple wallets, and it's especially useful when using cold
              storage.
            </p>
            <Button
              className="link_wallet"
              onClick={() => setprovidermod(true)}
            >
              Link A Wallet
            </Button>
          </div>

          <div className="mt-5">
            <Row>
              <Col lg={6}>
                <div className="table_wallel_list">
                  <ul>
                    {

                      wallets.length > 0 ? (wallets.map((item, index) => (
                        <li key={index}>
                          <div className="wallet_data d-flex justify-content-between">
                            <div className="wallet_left d-flex justify-content -between">
                              <div>
                              <h6>{item?.walletname}</h6>
                              <p className="text-truncate w-50">
                                {item?.walletAddress}    
                              </p>
                              
                              </div>
                            
                            </div>
                            <div className="action_div">
                            {item.default && 
                                 <span>
                                    <Badge className="theme_bagde" bg="success">Primary</Badge>
                                 </span>
                                }
                              <UncontrolledDropdown>
                                <DropdownToggle>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 256 256"
                                  >
                                    <path
                                      fill="#000"
                                      d="M112 60a16 16 0 1 1 16 16a16 16 0 0 1-16-16Zm16 52a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm0 68a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z"
                                    />
                                  </svg>
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem onClick={() => PrimaryWalletUpdate(item?._id)}>Make Primary</DropdownItem>
                                  <DropdownItem onClick={() => { setCurrentId(item?._id); seteditwallet(true) }}>
                                    Edit
                                  </DropdownItem>
                                  <DropdownItem onClick={() => { setCurrentId(item?._id); setconfrimmodal(true) }}>Delete</DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>
                          </div>
                        </li>
                      ))) : "NO WALLETS AVAILABLE"

                    }



                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Linkedwallet;
