import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Placebidmod(props) {
  const navigate = useNavigate();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="Placebidmod-mod"
    >
      <Modal.Body>
        <div class="mystery-modal-data">
          <a href="javascript:void(0)" className="close_btn" onClick={props.onhide}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="51"
              height="52"
              viewBox="0 0 51 52"
              fill="none"
            >
              <path
                d="M43.75 8.25C34 -1.5 18 -1.5 8.25 8.25C-1.5 18 -1.5 34 8.25 43.75C18 53.5 33.75 53.5 43.5 43.75C53.25 34 53.5 18 43.75 8.25ZM33 36.5L26 29.5L19 36.5L15.5 33L22.5 26L15.5 19L19 15.5L26 22.5L33 15.5L36.5 19L29.5 26L36.5 33L33 36.5Z"
                fill="black"
              />
            </svg>
          </a>
          <div class="placebid_head">
            <h4 class="green-col">Place Bid</h4>
          </div>
          <div class="counter_here">
            <div class="counter_box">
              <strong>01</strong>
              <p>Days</p>
            </div>

            <div class="counter_box">
              <strong>18</strong>
              <p>Hours</p>
            </div>

            <div class="counter_box">
              <strong>06</strong>
              <p>Minutes</p>
            </div>

            <div class="counter_box">
              <strong>35</strong>
              <p>Seconds</p>
            </div>
          </div>
          <div class="placebid_item">
            <div class="placebid_item-left">
              <div class="item_img_here text-center">
                <h5>Item </h5>
                <div class="img150140">
                  <img src="/images/greenground.png" alt="" class="img-fluid" />
                </div>
              </div>
              <div class="place_itmecontent">
                <h4>BOB</h4>
                <p>
                  Owned by <strong>AKIMEE</strong>
                </p>
              </div>
            </div>

            <div class="placebid_item-right">
              <p>
                <img src="/images/ethblack.png" alt="" class="img-fluid" />
                200
              </p>
              <p>($606,276.00)</p>
            </div>
          </div>
          <div class="placrbid_price">
            <div class="placrbid_price_left">
              <p>Price</p>
              <img src="/images/ethblack.png" alt="" class="img-fluid" />
            </div>
            <div class="placrbid_price_right">
              <h3>350</h3>
            </div>
          </div>

          <div class="form-group form-check placebid-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
            By Checking this box, I agree to AKIMME Terms & Conditions
            </label>
          </div>
          <button type="button" class="btn placebid-btn" data-dismiss="modal">
            Bid
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
