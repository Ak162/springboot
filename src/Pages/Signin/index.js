import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Fade } from "react-reveal";
import { loginUserWithEmail,loginUser, getDiscordLoginRedirectRequest, postDiscordLoginRequest } from "store/actions";
import { toast } from "react-toastify";
import useWallet from "hooks/wallet";

const Signin = () => {
  const wallet = useWallet();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  useEffect(()=>{
    wallet.initializeOnBoard();
  },[]);

  const [showSigninPassword,setShowSigninPassword] = useState(false);

  const { loading,loadingLoginWithWallet } = useSelector((state) => state.Login);
  const {loading : discordLoading} = useSelector((state)=>state.Discord);


  const fragment = window.location.hash;
  const params = fragment.slice(1).split('&');
  const accessToken = params[1] && params[1].slice(13);
  
  useEffect(()=>{
    console.log("accessToken discord",accessToken)
    if(accessToken){
      const callback = (response) => {
        if (response?.status == "success") {
          toast.success("Login succesfully");
          navigate("/inventory");
        };
      };
        dispatch(postDiscordLoginRequest({accessToken},callback));
    }
  },[accessToken]);


  const handleChange = (name) => (e) => {
    setFields((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
    console.log("fields", fields);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(loading){
      return;
    }
    console.log("....", fields);
    const callback = (response) => {
      if (response.status == "success") {
        toast.success("Login succesfully");
        navigate("/inventory");
      } else {
        toast.error(
          response.message
            .replace("_", " ")
            .toLocaleLowerCase()
            .charAt(0)
            .toUpperCase() +
            response.message.replace("_", " ").toLocaleLowerCase().slice(1)
        );
      }
    };
    dispatch(loginUserWithEmail(fields, callback));
  };

  const loginWithWallet = async() =>{
    if(loadingLoginWithWallet){
      return;
    }
    const callback = (response) => {
      if (response?.status == "success") {
        toast.success("Login succesfully");
        navigate("/inventory");
      } else {
        toast.error(
          response?.message
            .replace("_", " ")
            .toLocaleLowerCase()
            .charAt(0)
            .toUpperCase() +
            response?.message?.replace("_", " ").toLocaleLowerCase().slice(1)
        );
      }
    };
      const walletAccount = await wallet.connect();
      console.log("walletAccount",walletAccount)
      const walletAddress = walletAccount?.[0]?.["accounts"]?.[0]?.["address"];
      console.log("wallet after connect",walletAccount?.[0]?.["accounts"]?.[0]?.["address"])
      if(!walletAddress && !wallet.account){
        return;
      }
      dispatch(loginUser({walletAddress : walletAddress || wallet.account},callback))
  }

  const loginWithDiscord = () =>{
    if(discordLoading){
      return;
    }
      console.log("loginWithDiscord")
    dispatch(getDiscordLoginRedirectRequest({},(redirectUrl)=>{
        console.log("getDiscordRedirectUrl",redirectUrl);
        if(redirectUrl){
            const discordLoginBtn = document.getElementById("discord_login");
            if(discordLoginBtn){
                discordLoginBtn.setAttribute("href",redirectUrl);
                discordLoginBtn.click();
            }  
        }  
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
            <Col
              lg={6}
              md={6}
              sm={12}
              className="position-relative order-2 order-md-1"
            >
              <Fade>
                <div className="left_form_part">
                  <Form className="form_sign_inout" onSubmit={handleSubmit}>
                    <h3 className="sign_head">
                      Login to <br></br>your account
                    </h3>

                    <Row>
                      <Col lg={12} sm={12}>
                        <FormGroup>
                          <Label for="exampleEmail">Email</Label>
                          <Input
                            type="email"
                            name="email"
                            id="exampleEmail"
                            placeholder="Tonynguyen@example.com"
                            value={fields?.email}
                            onChange={handleChange("email")}
                          />
                        </FormGroup>
                      </Col>

                      <Col lg={12} sm={12}>
                        <FormGroup className="position-relative">
                          <Label for="examplePassword">Password</Label>
                          <Input
                            type={showSigninPassword ? "text" : "password"}
                            name="password"
                            id="examplePassword"
                            placeholder="........."
                            value={fields?.password}
                            onChange={handleChange("password")}
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
                    </Row>

                    <div className="remember_mer">
                      <Link to="/forgot-password">Forgot password?</Link>
                    </div>

                    <Button className="btn_sign_in w-100 mt-4" type="submit">
                    {loading && <Spinner size="sm" color="light" className="mr-2"/>}
                     Login
                    </Button>

                    <div className="or_col position-relative mt-3">
                        <p className="m-0">OR</p>
                    </div>

                    <div className="btn_extralogin mt-4">
                    <Button className="btn_login w-100" type="button" onClick={()=>loginWithWallet()}>
                    {loadingLoginWithWallet && <Spinner size="sm" color="light" className="me-2"/>}
                       <span className="me-2"> 
                           <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 240"><path fill="#E17726" d="M250.066 0L140.219 81.279l20.427-47.9z"/><path fill="#E27625" d="m6.191.096l89.181 33.289l19.396 48.528zM205.86 172.858l48.551.924l-16.968 57.642l-59.243-16.311zm-155.721 0l27.557 42.255l-59.143 16.312l-16.865-57.643z"/><path fill="#E27625" d="m112.131 69.552l1.984 64.083l-59.371-2.701l16.888-25.478l.214-.245zm31.123-.715l40.9 36.376l.212.244l16.888 25.478l-59.358 2.7zM79.435 173.044l32.418 25.259l-37.658 18.181zm97.136-.004l5.131 43.445l-37.553-18.184z"/><path fill="#D5BFB2" d="m144.978 195.922l38.107 18.452l-35.447 16.846l.368-11.134zm-33.967.008l-2.909 23.974l.239 11.303l-35.53-16.833z"/><path fill="#233447" d="m100.007 141.999l9.958 20.928l-33.903-9.932zm55.985.002l24.058 10.994l-34.014 9.929z"/><path fill="#CC6228" d="m82.026 172.83l-5.48 45.04l-29.373-44.055zm91.95.001l34.854.984l-29.483 44.057zm28.136-44.444l-25.365 25.851l-19.557-8.937l-9.363 19.684l-6.138-33.849zm-148.237 0l60.435 2.749l-6.139 33.849l-9.365-19.681l-19.453 8.935z"/><path fill="#E27525" d="m52.166 123.082l28.698 29.121l.994 28.749zm151.697-.052l-29.746 57.973l1.12-28.8zm-90.956 1.826l1.155 7.27l2.854 18.111l-1.835 55.625l-8.675-44.685l-.003-.462zm30.171-.101l6.521 35.96l-.003.462l-8.697 44.797l-.344-11.205l-1.357-44.862z"/><path fill="#F5841F" d="m177.788 151.046l-.971 24.978l-30.274 23.587l-6.12-4.324l6.86-35.335zm-99.471 0l30.399 8.906l6.86 35.335l-6.12 4.324l-30.275-23.589z"/><path fill="#C0AC9D" d="m67.018 208.858l38.732 18.352l-.164-7.837l3.241-2.845h38.334l3.358 2.835l-.248 7.831l38.487-18.29l-18.728 15.476l-22.645 15.553h-38.869l-22.63-15.617z"/><path fill="#161616" d="m142.204 193.479l5.476 3.869l3.209 25.604l-4.644-3.921h-36.476l-4.556 4l3.104-25.681l5.478-3.871z"/><path fill="#763E1A" d="M242.814 2.25L256 41.807l-8.235 39.997l5.864 4.523l-7.935 6.054l5.964 4.606l-7.897 7.191l4.848 3.511l-12.866 15.026l-52.77-15.365l-.457-.245l-38.027-32.078zm-229.628 0l98.326 72.777l-38.028 32.078l-.457.245l-52.77 15.365l-12.866-15.026l4.844-3.508l-7.892-7.194l5.952-4.601l-8.054-6.071l6.085-4.526L0 41.809z"/><path fill="#F5841F" d="m180.392 103.99l55.913 16.279l18.165 55.986h-47.924l-33.02.416l24.014-46.808zm-104.784 0l-17.151 25.873l24.017 46.808l-33.005-.416H1.631l18.063-55.985zm87.776-70.878l-15.639 42.239l-3.319 57.06l-1.27 17.885l-.101 45.688h-30.111l-.098-45.602l-1.274-17.986l-3.32-57.045l-15.637-42.239z"/></svg>
                       </span>
                      Login with Metamask
                    </Button>
                    <Button onClick={()=>loginWithDiscord()} className="btn_login w-100 mt-2" type="button">
                    {discordLoading && <Spinner size="sm" color="light" className="me-2"/>}
                    <span className="me-2"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 199"><path fill="#5865F2" d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046c-19.692-2.961-39.203-2.961-58.533 0c-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632a108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237a136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848c21.142-6.58 42.646-16.637 64.815-33.213c5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2c.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2c0 14.375-10.148 26.18-23.015 26.18Z"/></svg>
                       </span>
                      Login with Discord
                    </Button>
                    <a href="" id="discord_login" style={{display:"none"}} target="_self"/>
                    </div>

                    <div className="dont_have_accoutn text-center pt-4">
                      <p>
                        Don’t have an account?{" "}
                        <Link to="/signup">Signup here.</Link>
                      </p>
                    </div>
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

export default Signin;
