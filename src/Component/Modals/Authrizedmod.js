import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Authrizedmod(props) {
  const navigate = useNavigate();


  const onClickAuth = () =>{
   props.togglemod();
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="Authrizedmod-mod"
    >
      <Modal.Body>
        <div className="Authrizedmod_wrapping">
          <div className="top_content-auth">
            <div className="top_first">
              <p>An external application</p>
              <h5>Robotic Rabbit Syndicate</h5>
              <p>Want to access your Discord account</p>
            </div>
            <div className="top-center">
              <p>THIS WILL ALLOW THE DEVELOPER OF RRS</p>
              <ul>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
                      fill="#21E786"
                    />
                  </svg>
                  <p>Access your username, avater, and banner</p>
                </li>

                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M8.4 17L12 13.4L15.6 17L17 15.6L13.4 12L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4L10.6 12L7 15.6L8.4 17ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88333 20.6867 5.825 19.9743 4.925 19.075C4.025 18.175 3.31267 17.1167 2.788 15.9C2.26333 14.6833 2.00067 13.3833 2 12C2 10.6167 2.26267 9.31667 2.788 8.1C3.31333 6.88333 4.02567 5.825 4.925 4.925C5.825 4.025 6.88333 3.31267 8.1 2.788C9.31667 2.26333 10.6167 2.00067 12 2C13.3833 2 14.6833 2.26267 15.9 2.788C17.1167 3.31333 18.175 4.02567 19.075 4.925C19.975 5.825 20.6877 6.88333 21.213 8.1C21.7383 9.31667 22.0007 10.6167 22 12C22 13.3833 21.7373 14.6833 21.212 15.9C20.6867 17.1167 19.9743 18.175 19.075 19.075C18.175 19.975 17.1167 20.6877 15.9 21.213C14.6833 21.7383 13.3833 22.0007 12 22Z"
                      fill="#80838F"
                    />
                  </svg>
                  <p>Microbrew some local kombucha</p>
                </li>
              </ul>
            </div>
            <div className="top_last">
              <div className="conditionone">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <g opacity="0.5">
                    <path
                      d="M14.5602 7.353C15.3732 6.10294 15.0189 4.43051 13.7688 3.61753C12.5187 2.80456 10.8463 3.15888 10.0333 4.40894L8.07064 7.42686C7.25766 8.67692 7.61199 10.3493 8.86205 11.1623C10.1121 11.9753 11.7845 11.621 12.5975 10.3709L14.5602 7.353Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M10.1071 10.8979C10.9201 9.64786 10.5657 7.97543 9.31568 7.16246C8.06562 6.34948 6.3932 6.7038 5.58022 7.95386L3.61752 10.9718C2.80454 12.2218 3.15886 13.8943 4.40892 14.7072C5.65899 15.5202 7.33141 15.1659 8.14439 13.9158L10.1071 10.8979Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </g>
                </svg>
                <p>
                  Once you authorize, you will be redirected outside of Discord
                  to: https://roboticrabbitsyndicate.com
                </p>
              </div>

              <div className="conditionone">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <g opacity="0.5">
                    <path
                      d="M9 12.75C9.39782 12.75 9.77936 12.592 10.0607 12.3107C10.342 12.0294 10.5 11.6478 10.5 11.25C10.5 10.8522 10.342 10.4706 10.0607 10.1893C9.77936 9.90804 9.39782 9.75 9 9.75C8.60218 9.75 8.22064 9.90804 7.93934 10.1893C7.65804 10.4706 7.5 10.8522 7.5 11.25C7.5 11.6478 7.65804 12.0294 7.93934 12.3107C8.22064 12.592 8.60218 12.75 9 12.75ZM13.5 6C13.8978 6 14.2794 6.15804 14.5607 6.43934C14.842 6.72064 15 7.10218 15 7.5V15C15 15.3978 14.842 15.7794 14.5607 16.0607C14.2794 16.342 13.8978 16.5 13.5 16.5H4.5C4.10218 16.5 3.72064 16.342 3.43934 16.0607C3.15804 15.7794 3 15.3978 3 15V7.5C3 7.10218 3.15804 6.72064 3.43934 6.43934C3.72064 6.15804 4.10218 6 4.5 6H5.25V4.5C5.25 3.50544 5.64509 2.55161 6.34835 1.84835C7.05161 1.14509 8.00544 0.75 9 0.75C9.49246 0.75 9.98009 0.846997 10.4351 1.03545C10.89 1.22391 11.3034 1.50013 11.6517 1.84835C11.9999 2.19657 12.2761 2.60997 12.4645 3.06494C12.653 3.51991 12.75 4.00754 12.75 4.5V6H13.5ZM9 2.25C8.40326 2.25 7.83097 2.48705 7.40901 2.90901C6.98705 3.33097 6.75 3.90326 6.75 4.5V6H11.25V4.5C11.25 3.90326 11.0129 3.33097 10.591 2.90901C10.169 2.48705 9.59674 2.25 9 2.25Z"
                      fill="white"
                    />
                  </g>
                </svg>
                <p>
                  the developer of roboticrabbitsyndicate privacy policy and
                  terms of service apply to this application.
                </p>
              </div>
            </div>
          </div>
          <div className="modal_footer">
            <Button className="cancel_btn" onClick={props.onhide}>Cancel</Button>
             <a 
               className="Authorize_btn"
               target="_self" 
               href={props?.discordLink}  
               onClick={onClickAuth} >
                Authorize
            </a>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
