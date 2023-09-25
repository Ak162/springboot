import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function Editwallet(props) {
  const [name, setName] = useState()

  const handleChange = (e) => {
    setName(e.target.value)
  }
  
  useEffect(() => {
    if (props.wallet) {
      setName(props.wallet.walletname)
    }
  }, [props.wallet])

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="wistlist_mod editmod"
    >
      <Modal.Body>
        <div className="editmod_inner pt-5">
          <a
            href="javascript:void(0)"
            className="close_icon"
            onClick={props.onhide}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="39"
              height="39"
              viewBox="0 0 39 39"
              fill="none"
            >
              <path
                d="M12.75 28.875L19.5 22.125L26.25 28.875L28.875 26.25L22.125 19.5L28.875 12.75L26.25 10.125L19.5 16.875L12.75 10.125L10.125 12.75L16.875 19.5L10.125 26.25L12.75 28.875ZM19.5 38.25C16.9062 38.25 14.4688 37.7575 12.1875 36.7725C9.90625 35.7875 7.92188 34.4519 6.23438 32.7656C4.54688 31.0781 3.21125 29.0938 2.2275 26.8125C1.24375 24.5312 0.75125 22.0938 0.75 19.5C0.75 16.9062 1.2425 14.4688 2.2275 12.1875C3.2125 9.90625 4.54813 7.92188 6.23438 6.23438C7.92188 4.54688 9.90625 3.21125 12.1875 2.2275C14.4688 1.24375 16.9062 0.75125 19.5 0.75C22.0938 0.75 24.5312 1.2425 26.8125 2.2275C29.0938 3.2125 31.0781 4.54813 32.7656 6.23438C34.4531 7.92188 35.7894 9.90625 36.7744 12.1875C37.7594 14.4688 38.2513 16.9062 38.25 19.5C38.25 22.0938 37.7575 24.5312 36.7725 26.8125C35.7875 29.0938 34.4519 31.0781 32.7656 32.7656C31.0781 34.4531 29.0938 35.7894 26.8125 36.7744C24.5312 37.7594 22.0938 38.2513 19.5 38.25Z"
                fill="#fff"
              />
            </svg>
          </a>


          <Form onSubmit={(evt) => { evt.preventDefault(); props.onEdit(name) }}>
            <FormGroup>

              <Input
                type="text"
                name="walletname"
                placeholder="Enter wallet name"
                value={name}
                onChange={handleChange}
                required
              />
            </FormGroup>



            <div className="btn-submit">
              <Button type="submit" className="btnsubmit">
                Save
              </Button>
            </div>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
