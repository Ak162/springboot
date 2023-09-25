import { post } from "helpers/api_helper";

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { changePassword, updateProfile , getProfile,uploadFile} from "store/actions";

const Account = () => {
  const [state, setState] = useState({ tab: "tab1" });

  const { user } = useSelector((state) => state?.Login);
  
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const [fields, setfields] = useState({
    username: "",
    email: "",
  });

  const [tab2Fields,settab2Fields] = useState({
    oldPassword: "",
    newPassword: "",
    confirm_new_password: ""
  })


  // useEffect(()=>{
  //   dispatch(getProfile())
  // },[])

  useEffect(() => {
console.log('/////////',user)
    setfields((prev) => ({
      ...prev,
      username: user?.username,
      email: user?.email
    }));
  }, [user]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      const callback = (res) => {
        console.log("res",res);
        const link = res?.data?.link;
        dispatch(updateProfile({profileImage : link}, ()=>{
          toast.success("Update profile successfully");
          dispatch(getProfile());
        }));
      };
      dispatch(uploadFile({image : file}, callback))

    }
  };

  const handleChange = (name) => (e) => {
    setfields((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const handletab2Change = (name) => (e) => {
    settab2Fields((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const callback = (res) => {
      toast.success("Update profile successfully");
      dispatch(getProfile());
    };
    dispatch(updateProfile(fields, callback));
  };


  const handleSubmitTab2 = (e) => {

    e.preventDefault();
    if(tab2Fields.confirm_new_password !== tab2Fields.newPassword){
      toast.error('passwords must match')
      return
    }
    const callback = (res) => {
      dispatch(getProfile());
    };

    let requestData = {
      oldPassword : tab2Fields.oldPassword,
      newPassword : tab2Fields.newPassword
    }
    dispatch(changePassword(requestData, callback));
  }



  return (
    <section className="account_main common-pad">
      <Container>
        <div class="Workshop_content">
          <h1>Account</h1>
        </div>

        <div className="gen_Setting_form">
          <Row>
            <Col lg={3} md={6} sm={12}>
              <div className="account_Sider">
                <div className="profile_img_here mx-auto position-relative">
                  <img src={user?.profileImage} alt="" className="img-fluid" />
                  <label for="file-input" className="file-label">
                     <div  className="edit_btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#000" d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Z"/></svg>
                      </div>    
                </label>
                <input onChange={handleImageUpload} type="file" id="file-input"/>
                </div>

                <div className="person_details text-center py-3">
                  <h4>{fields?.username}</h4>
                  {/* <p>{fields?.email}</p> */}
                </div>


                {/* <Link to="" className="edit_profile_cta text-center">
                  Edit Profile
                </Link>

                <Link to="" className="logout_cta mt-3 text-center">
                  Logout
                </Link> */}
              </div>
            </Col>

            <Col lg={9} md={6} sm={12}>
              <div className="right_tabs">
                <div className="tab-frame account_frame">
                  <div className="clearfix">
                    <input
                      type="radio"
                      name="tab"
                      id="tab1"
                      checked={state.tab == "tab1"}
                      onClick={() => setState({ tab: "tab1" })}
                    />
                    <label for="tab1">Profile</label>

                    <input
                      type="radio"
                      name="tab"
                      id="tab2"
                      checked={state.tab == "tab2"}
                      onClick={() => setState({ tab: "tab2" })}
                    />
                    <label for="tab2">Change Password</label>
                  </div>

                  {state.tab == "tab1" && (
                    <div className="profile_tab mt-4">
                      <Form onSubmit={handleSubmit}>
                        <div className="outer_input_div">
                          <FormGroup>
                            <Label for="name">Username</Label>
                            <Input
                              type="text"
                              id="name"
                              readOnly
                              value={fields?.username}
                              onChange={handleChange("username")}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label for="name">Email</Label>
                            <Input
                              type="email"
                              id="email"
                              value={fields?.email}
                              onChange={handleChange("email")}
                            />
                          </FormGroup>
                          {/* <FormGroup>
                            <Label for="name">Profile Picture</Label>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                            />

                            {selectedImage && (
                              <div>
                                <h3>Selected Image:</h3>
                                <img
                                  src={selectedImage}
                                  alt="Selected"
                                  style={{ maxWidth: "100%" }}
                                />
                              </div>
                            )}
                          </FormGroup> */}
                          {/* <Button className="submit_form" type="submit">Submit</Button> */}
                        </div>

                        {/* <div className="outer_input_div">
              <FormGroup>
                <Label for="exampleEmail">Password</Label>
                <Input
                  type="password"
                  name="Password"
                  id="exampleEmail"
                  placeholder="Password"
                />
              </FormGroup>
            </div>

            <div className="outer_input_div">
              <FormGroup>
                <Label for="exampleEmail">Repeat Password</Label>
                <Input
                  type="password"
                  name="Password"
                  id="exampleEmail"
                  placeholder="Repeat Password"
                />
              </FormGroup>
            </div>

            <div className="outer_input_div">
              <FormGroup>
                <Label for="exampleEmail">
                  Sign
                  <Button className="btn_sign">Sign</Button>
                </Label>

                <p className="sign_text">
                  To set your username and password, please sign with this
                  wallet: 0x864f1D56d5a3F21Eab3Ed92F606FF542B3331BF0
                </p>
              </FormGroup>
            </div>

            <div className="outer_input_div">
              <FormGroup>
                <Label for="exampleEmail">Signature</Label>

                <div className="signature">
                  <p>
                    0xde756dea19821af86db67077e6fe3247894b4f187bc59daac24ca6b635ae0c8b429a665511c956a7290121630339bf6fa957f72081bf0b6fe8d0ed44f13f70771b
                  </p>
                </div>
              </FormGroup>
            </div> */}
                      </Form>
                    </div>
                  )}

                  {state.tab == "tab2" && (
                    <div className="profile_tab mt-4">
                    <Form onSubmit={handleSubmitTab2}>
                      <div className="outer_input_div">
                        <FormGroup>
                          <Label for="name">Old Password</Label>
                          <Input
                            type="password"
                            id="password"
                            value={tab2Fields?.oldPassword}
                            onChange={handletab2Change("oldPassword")}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="name">New Password</Label>
                          <Input
                            type="password"
                            id="new_password"
                            value={tab2Fields?.newPassword}
                            onChange={handletab2Change("newPassword")}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="name">Confirm New Password</Label>
                          <Input
                            type="password"
                            id="confirm_new_password"
                            value={tab2Fields?.confirm_new_password}
                            onChange={handletab2Change("confirm_new_password")}               
                          />

                        </FormGroup>
                        <Button className="submit_form" type="submit">Submit</Button>
                      </div>
                      </Form>
                    </div>
                  )}

                  
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Account;
