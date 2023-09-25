import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export default function Providerselectmod(props) {
  const navigate = useNavigate();

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="Authrizedmod-mod provider_select"
    >
      <Modal.Body>
        <div className="provider_select_modal">
          <h4 className="text-center">Select Provider</h4>
          <div className="connect_btns">
            <Button onClick={props.connectMetamask}>
              <div className="btntetxt">
                <h3>METAMASK</h3>
                <p>Recommended</p>
              </div>
            </Button>
            <Button onClick={props.connectWallet}>
              <div className="btntetxt">
                <h3>WALLETCONNECT</h3>
                <p>Wallet,....</p>
              </div>
            </Button>
            <Button onClick={props.onhide}>
              <div className="btntetxt">
                <h3>CLOSE</h3>
              </div>
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
