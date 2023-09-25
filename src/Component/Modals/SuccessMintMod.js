import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export default function SuccessMintModal(props) {
  const navigate = useNavigate();
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="buybtc_mod"
    >
      <Modal.Body>
        <div className="Buybtcmod_inner position-relative px-3 py-4">
      {/* <a href="javascript:void(0)" className="modal_close" onClick={props.onhide}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6.758 17.2431L12.001 12.0001M17.244 6.75708L12 12.0001M12 12.0001L6.758 6.75708M12.001 12.0001L17.244 17.2431"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a> */}
          <div className="inner_success_Card text-center px-3 pb-4">
            <div className="gif_img">
              <img src="/images/gift.gif" alt="" className="img-fluid" />
            </div>
            <span className="successful">Successfull</span>

            {/* <h2>0,0023 BTC</h2>
            <h6>$550,00</h6>
            <p>
              You have successfully purchased crypto asset, all of your assets
              will be shown on Wallet menu under your My Assets
            </p> */}
            <Button className="buy_btn border-0 mt-4" onClick={props.onhide}>
              Done
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}