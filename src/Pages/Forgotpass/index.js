import React, { useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Fade } from "react-reveal";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordRequest, resetPasswordRequest } from "store/actions";

const Forgotpass = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {forgotResetLoading} = useSelector(({Login}) =>Login);

  const [forgotshow, setforgotshow] = useState(true);
  const [otp, setOtp] = useState("");
  const [fields,setFields] =useState({
    email : "",
    OTP : "",
    password : ""
  });
  const [showSigninPassword,setShowSigninPassword] = useState(false);

  const onChangeFields = (name,value) =>{
     setFields((prev)=>({...prev, [name] : value}))
  }

  const onSubmitForgotPassword = () =>{
    if(forgotResetLoading){
      return;
    }
         const payload = {
           email : fields.email
         }
    dispatch(forgotPasswordRequest(payload,()=>{
      setforgotshow(false);
    }))
  }

  const onSubmitResetPassword = () =>{
    if(forgotResetLoading){
      return;
    }
    dispatch(resetPasswordRequest({...fields},()=>{
      navigate("/signin");
    }))
  }


  return (
    <section className="common_sign_main sign_in position-relative">
        <a href="javascript:void(0)" className="back_btn" onClick={() => navigate(-1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fff"
            d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.425 12q0-.2.063-.375T4.7 11.3l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13H7.825Z"
          />
        </svg>
      </a>
      <Container fluid>
        <div className="common_sign_inner">
          <Row>
            <Col lg={6} md={6} sm={12} className="position-relative order-2 order-md-1">
              <Fade>
                <div className="left_form_part">
                  <Form className="form_sign_inout">
                    {forgotshow ? (
                      <>
                        <h3 className="sign_head">Forgot Password</h3>
                      </>
                    ) : (
                      <>
                        <h3 className="sign_head">Send OTP</h3>
                      </>
                    )}

                    {forgotshow ? (
                      <>
                        <Row>
                          <Col lg={12} sm={12}>
                            <FormGroup className="position-relative">
                              <Label for="examplePassword">Enter Email</Label>
                              <Input
                                type="email"
                                name="email"
                                value={fields?.email}
                                id="examplePassword"
                                placeholder="Please enter your email"
                                onChange={(e)=>onChangeFields(e.target.name,e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                           <Col>
                           <Button
                              className="btn_sign_in w-100 mt-4"
                              onClick={(e) => {
                                e.preventDefault();
                                onSubmitForgotPassword();
                              }}
                            >
                               {forgotResetLoading && <Spinner size="sm" color="light" className="me-2"/>}
                              Send OTP
                            </Button>
                           </Col>
                        </Row>
                      </>
                    ) : (
                      <>
                        <div className="oto_screen">
                          <p className="text-white">
                          (OTP) has been successfully sent to your registered Email address.
                          </p>
                          <Row>
                            <Col lg={12} sm={12}>
                              <OtpInput
                                value={fields.OTP}
                                onChange={(otp)=>onChangeFields("OTP",otp)}
                                numInputs={4}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props} />}
                              />
                            </Col>
                           
                          </Row>
                        </div>
                        <Row>

                          <Col lg={12} sm={12}>
                        <FormGroup className="position-relative">
                          <Label for="examplePassword">Password</Label>
                          <Input
                            type={showSigninPassword ? "text" : "password"}
                            name="password"
                            id="examplePassword"
                            placeholder="........."
                            value={fields?.password}
                            onChange={(e)=>onChangeFields(e.target.name,e.target.value)}
                          />
                            {showSigninPassword ? 
                            <Button className="eye_btn" onClick={()=>setShowSigninPassword(false)}>

                              <svg xmlns="http://www.w3.org/2000/svg"width="24"
                            height="19"
                            viewBox="0 0 24 19"
                            fill="none"><path fill="#9BA1B3" d="M12 16q1.875 0 3.188-1.313T16.5 11.5q0-1.875-1.313-3.188T12 7q-1.875 0-3.188 1.313T7.5 11.5q0 1.875 1.313 3.188T12 16Zm0-1.8q-1.125 0-1.913-.788T9.3 11.5q0-1.125.788-1.913T12 8.8q1.125 0 1.913.788T14.7 11.5q0 1.125-.787 1.913T12 14.2Zm0 4.8q-3.475 0-6.35-1.838T1.3 12.2q-.075-.125-.1-.312t-.025-.388q0-.2.025-.388t.1-.312q1.475-3.125 4.35-4.963T12 4q3.475 0 6.35 1.838T22.7 10.8q.075.125.1.313t.025.387q0 .2-.025.388t-.1.312q-1.475 3.125-4.35 4.963T12 19Zm0-7.5Zm0 5.5q2.825 0 5.188-1.488T20.8 11.5q-1.25-2.525-3.613-4.013T12 6Q9.175 6 6.812 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17Z"/></svg>
                            </Button>
                            : 
                            <Button className="eye_btn" onClick={()=>setShowSigninPassword(true)}>

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="19" viewBox="0 0 24 19"><path fill="#9BA1B3" d="m16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862Zm3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.588-4.013T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.775 0 6.725 2.087T23 11.5q-.575 1.475-1.513 2.738T19.3 16.45Zm.5 6.15l-4.2-4.15q-.875.275-1.762.413T12 19q-3.775 0-6.725-2.087T1 11.5q.525-1.325 1.325-2.463T4.15 7L1.4 4.2l1.4-1.4l18.4 18.4l-1.4 1.4ZM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.588 4.013T12 17q.5 0 .975-.063t.975-.137l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525L5.55 8.4Zm7.975 2.325ZM9.75 12.6Z"/></svg>
                          </Button>
                           }
                        </FormGroup>
                      </Col>
                            <Col lg={12} sm={12}>
                            <Button
                                className="btn_sign_in w-100 mt-4"
                                onClick={()=>onSubmitResetPassword()}
                              >
                                {forgotResetLoading && <Spinner size="sm" color="light" className="me-2"/>}
                                 Submit
                              </Button>
                            </Col>
                        </Row>
                      </>
                    )}
                  </Form>
                </div>
              </Fade>
            </Col>

            <Col lg={6} md={6} sm={12} className="p-lg-0 order-1 order-md-2">
              <Fade>
                <div className="right_gradient_part position-relative">
                  <div className="logo">
                    <img src="/images/logo.png" alt="" className="img-fluid" />
                  </div>
                </div>
              </Fade>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Forgotpass;
