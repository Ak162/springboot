export default () => {
  const obj = JSON.parse(localStorage.getItem("authUser"));
  console.log('abc',obj)

  if (obj && obj.token || obj && obj.Token) {
    console.log('//////////obj',obj.token || obj.Token);
    let token = obj.token || obj.Token

    return { Authorization: "Bearer " + token};
  } else {
    return {};
  }
};
