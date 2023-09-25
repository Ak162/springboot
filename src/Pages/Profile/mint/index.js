import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { Button } from "reactstrap";
import { Fade } from "react-reveal";
import { useDispatch, useSelector } from "react-redux";
import { ContractFactory, ethers } from "ethers";
import { toast } from "react-toastify";
// actions
import { getCollection, getUserMintedNftsCountRequest, postMintActivity, postNftRrcToMainBucketRequest } from "store/actions";

// Web3
import Web3Intraction from "util/web3Intraction";
import useWallet from "hooks/wallet";
import SuccessMintModal from "Component/Modals/SuccessMintMod";

const MintOG = () => {
  const dispatch = useDispatch();
  const wallet = useWallet();

  const { user } = useSelector((state) => state.Login);
  const { settings } = useSelector((state) => state.Setting);
  const { collection } = useSelector((state) => state.Collection);

  const [counter, setCounter] = useState(0);
  const [loading, setloading] = useState(false);
  const [tokenPrice, settokenPrice] = useState();
  const [userDetail, setUserDetails] = useState();
  const [tokens, settokens] = useState([]);
  const [isRevealed, setisRevealed] = useState(false);
  const [errorMintedNftsCount,setErrorMintedNftsCount] = useState("");
  const [successMintModal,setSuccessinModal] = useState(false);

  useEffect(() => {
    wallet.connect("metamask", settings?.blockchainNetworkMode === "testnet" ? 5 : 1)
    setErrorMintedNftsCount("");
  }, [])
  useEffect(() => {
    if (user) {
      setUserDetails({ ...user, walletAddress: user?.walletId?.walletAddress });
    }
  }, [user])

  useEffect(() => {
    if (settings && settings.activeCollectionId) {
      dispatch(getCollection(settings.activeCollectionId));
    }
  }, [JSON.stringify(settings)]);

  useEffect(() => {
    if (
      collection &&
      collection.contractAbi &&
      settings &&
      JSON.stringify(settings) !== "{}"
    ) {
      const web3Intraction = new Web3Intraction(
        collection.blockchain,
        settings
      );
      console.log(userDetail?.walletAddress, "userDetail?.walletAddress")
      if (userDetail?.walletAddress) {
        (async () => {
          const contract = await web3Intraction.getContract(
            collection.contractAbi,
            collection.contractAddress
          );

          if (!contract) {
            return toast.error(`Error while wrong getting contract!`);
            // return toast.error(`Please connect with ${userDetail?.walletAddress}`)
            // setloading(false);
            // return toast.error("Service not provided!");
          }

          // const balance = await contract.methods
          //   .balanceOf(userDetail?.walletAddress)
          //   .call();
          //   console.log(`how many nfts minted of this contract for wallet ${userDetail?.walletAddress} : `,balance);

          // settokenPrice(balance);

          const revealed = await contract.methods.revealed().call();

          setisRevealed(revealed);

          const _tokens = await contract.methods
            .walletOfOwner(userDetail?.walletAddress)
            .call();
          console.log("v", _tokens);

          settokens(_tokens);

            //refreshTokenCounts
            setWalletMintedNftsCount();
        })();
      }
    }
  }, [
    userDetail?.walletAddress,
    JSON.stringify(collection),
    JSON.stringify(settings),
  ]);

  const increase = () => {
    setCounter((count) => {
      // if (collection.maxMintAmount < count + 1) {
      if (4 < count + 1) {
        // toast.error(
        //   `Quantity should not greater than ${collection.maxMintAmount}`
        // );
        toast.error(`Quantity should not greater than ${4}`);

        return count;
      }

      return count + 1;
    });
  };

  const decrease = () => {
    setCounter((count) => (count <= 0 ? 0 : count - 1));
  };

  const reset = () => {
    setCounter(0);
  };


  const onMint = async () => {
    try {

      if(errorMintedNftsCount){
       return toast.error("Not able to recognize your minted nfts, please reload and try again or contact with service provider");
      }
      const web3Intraction = new Web3Intraction(
        collection.blockchain,
        settings
      );
      // console.log(collection, "collection")

      const contract = await web3Intraction.getContract(
        collection.contractAbi,
        collection.contractAddress
      );
      const multiMint = await web3Intraction.getContract(
        web3Intraction.adminContractSetting.abi,
        web3Intraction.adminContractSetting.contractAddress
      );

      // const balance = await contract.methods
      //   .balanceOf(userDetail?.walletAddress)
      //   .call();

      // settokenPrice(balance);

      if (Number(tokenPrice) + counter > 4) return toast.error("Trying to mint more than allowed quantity")
      if (counter <= 0) return toast.error("Quantity needed!");
      // setloading(true);
      
      if (!contract || !multiMint) {
        // setloading(false);
        return toast.error("Service not provided!");
      }
      if(!wallet.account){
        return toast.error(`Make sure your metamask connected.`)
      }
      if (wallet.account && wallet.account?.toLowerCase() === userDetail?.walletAddress?.toLowerCase()) {
        wallet.switchNetwork(
          settings?.blockchainNetworkMode === "testnet" ? 5 : 1
        );
      } else {
        return toast.error(`Make sure your metamask connected account is same as primary wallet : ${userDetail?.walletAddress}`)
      }

      const cost = await contract.methods.cost().call();
      const value = web3Intraction.web3.utils.fromWei(cost) * counter;
      console.log("value", value);

      const valueEth = web3Intraction.convertPriceToEther(value);
      console.log(valueEth, "newvalue ");
      try {

        await multiMint.methods
          .Multimint(collection.contractAddress, counter)
          .call({
            value: valueEth?.toString(),
            from: userDetail?.walletAddress,
          });
      } catch (error) {
        return toast.error(error.message)
      }

      console.log("multiMint", multiMint);
      setloading(true);
      const { txHash, receipt } = await web3Intraction.eth_sendTransaction({
        from: userDetail?.walletAddress,
        to: web3Intraction.adminContractSetting.contractAddress,
        value: valueEth?.toString(),
        data: multiMint.methods
          .Multimint(collection.contractAddress, counter)
          .encodeABI(),
          gasLimit:300000
      });
      console.log("receipt after mint",receipt);
      setloading(false);
      if(txHash){
        setSuccessinModal(true);
      }
     
      // const balanceRefereshed = await contract.methods
      //   .balanceOf(userDetail?.walletAddress)
      //   .call();

      // settokenPrice(balanceRefereshed);


      const _tokens = await contract.methods
        .walletOfOwner(userDetail?.walletAddress)
        .call();
      console.log("v", _tokens);

      settokens(_tokens);

      setCounter(0);
      
      //save item and history
      if(_tokens?.length){
        dispatch(
          postMintActivity(
            {
              type: collection.blockchain,
              collection_id: collection._id,
              transactionHash: txHash,
              price: collection?.cost,
              quantity: counter,
              walletAddress : userDetail?.walletAddress,
              mint_type : "og-mint",
              token_ids : _tokens
            },
            () => {
              setloading(false);
              setTimeout(()=>{
                  //refreshTokenCounts
                  setWalletMintedNftsCount();
              },300)
            }
          )
        );
        //reveal nfts
        dispatch(postNftRrcToMainBucketRequest({tokens : _tokens},(response)=>{
          console.log("response after tokens move",response);
        }));
      }
      
    } catch (err) {
      console.log("err", err);
      setloading(false);
      if (err.message) {
        return toast.error(err.message);
      }
    }finally{
      setloading(false);
    }
  };

  const revealTokens = async () => {
    try {
      const web3Intraction = new Web3Intraction(
        collection.blockchain,
        settings
      );

      const contract = web3Intraction.getContract(
        collection.contractAbi,
        collection.contractAddress
      );

      console.log("tokens", tokens);
      for (let i = 0; i < tokens.length; i++) {
        const nft = await contract.methods.tokenURI(tokens[i]).call();

        console.log("nft", nft);

        window.open(nft, "_blank");
      }
    } catch (err) {
      if (err?.message) {
        toast.error(err.message);
      }
      console.log("error", err);
    }
  };


  const setWalletMintedNftsCount = () => {
    if(userDetail?.walletAddress && collection){
      const callback = (statusBool,response) =>{
           if(statusBool){ 
            //Successfully GET Minted Nfts Count
            console.log("minted nfts",response);
            const count = typeof response === "object" ? 0 : response;
            settokenPrice(count);
            setErrorMintedNftsCount("");
           }else{
            //Error case
            setErrorMintedNftsCount(response);
           }      
      }
       dispatch(getUserMintedNftsCountRequest({
         type : collection.blockchain,
         collection_id : collection?._id,
         walletAddress : userDetail?.walletAddress
       },callback))
     }
  }

  return (
    <Fade>
      <SuccessMintModal
        show={successMintModal}
        onhide={()=>setSuccessinModal(false)}
      />
      <section className="Workshop_main common-pad">
        <Container>
          <>
            <div className="Workshop_content">

              <h5>Collection Minting: {collection?.name}</h5>

              <div className="single_collectionuser_content">
                <p>
                  <span>Per Mint Price: </span>
                  {collection?.cost || 0}
                </p>
                <p>
                  <span>Rabbits Owned:</span>
                  {tokenPrice}
                  {/* {collection?.symbol}{" "} */}
                  {/* <a
                    href="/inventory"
                    className="text-primary"
                    onClick={(e) => {
                      e.preventDefault();

                      // if (isRevealed) {
                      //   revealTokens();
                      // }
                    }}
                  >
                    {isRevealed ? "Reveal NFT" : ""}
                  </a> */}
                </p>
                <p>
                  <span>Total Mint Price: </span>
                  {(collection?.cost || 0) * counter}
                </p>
                <p>
                  <span>Primary wallet: </span>
                  {userDetail?.walletAddress && userDetail?.walletAddress?.slice(0,20) + "..." + userDetail?.walletAddress?.slice(-4) }
                </p>
              </div>

              <div className="presale_Collection">
                <div className="couter_product">
                  <Button className="counter-btn" onClick={increase}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                    >
                      <path
                        d="M12.8677 21.9167V15.131H6.08203V12.8691H12.8677V6.08334H15.1297V12.8691H21.9154V15.131H15.1297V21.9167H12.8677Z"
                        fill="#21E786"
                      />
                    </svg>
                  </Button>

                  <div className="output">{counter}</div>

                  <Button className="counter-btn" onClick={decrease}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M13.8089 16.1905H6.66602V13.8095H13.8089H16.1898H23.3327V16.1905H16.1898H13.8089Z"
                        fill="#21E786"
                      />
                    </svg>
                  </Button>
                </div>
              </div>

              <Button className="Whitelists-btn" onClick={onMint}>
              {loading && <Spinner size="sm" color="light" className="me-2"/>} Mint
              </Button>
            </div>
          </>
        </Container>
      </section>
    </Fade>
  );
};

export default MintOG;
