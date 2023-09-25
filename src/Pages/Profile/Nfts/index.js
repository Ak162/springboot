import { getProfile } from "helpers/backend_helper";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Fade } from "react-reveal";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { getCollection, getItems } from "store/actions";
import Web3Intraction from "util/web3Intraction";

const mintdata = [
  {
    mintimg: "/images/mintone.png",
  },
  {
    mintimg: "/images/minttwo.png",
  },
  {
    mintimg: "/images/mintthree.png",
  },
  {
    mintimg: "/images/mintfour.png",
  },
  {
    mintimg: "/images/mintfive.png",
  },
  {
    mintimg: "/images/mintone.png",
  },
  {
    mintimg: "/images/minttwo.png",
  },
  {
    mintimg: "/images/mintthree.png",
  },
  {
    mintimg: "/images/mintfour.png",
  },
  {
    mintimg: "/images/mintfive.png",
  },
];

const Nfts = () => {
  var sliderSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => state.Setting);
  const { collection } = useSelector((state) => state.Collection);
  const { user } = useSelector((state) => state.Login);
  const [pageKey,setPageKey] = useState(undefined);
  const [totalNfts,setTotalNfts] = useState(0);
  const [nftsList,setNftsList] = useState(0);
  const [loading,setLoading] = useState(null);
  const [userDetail, setUserDetails] = useState();
  
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
  
  function generateOpenSeaUrl(network, contractAddress, tokenId) {
    const baseUrl = network === 'mainnet' ? 'https://opensea.io' : `https://testnets.opensea.io`;
    return `${baseUrl}/assets/goerli/${contractAddress}/${tokenId}`;
  }

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
      if (userDetail?.walletAddress) {
        (async () => {
      
          if (!collection.contractAddress) {
            return toast.error(`Contract address is missing!`)
          }
           const params = {
              owner : userDetail?.walletAddress,
              contractAddresses : collection.contractAddress,
              pageKey : pageKey,
           }
           try{
            setLoading(true);
            const response = await web3Intraction.getNfts(params);
            const {ownedNfts,
                  pageKey,
                  totalCount} = response;
                  console.log("ownedNfts",ownedNfts)
            setPageKey(pageKey);
            setTotalNfts(totalCount);
            let contractNfts = (ownedNfts || []).filter((item)=>item?.contract?.address?.toLowerCase() === collection.contractAddress?.toLowerCase());
            console.log("contractNfts",contractNfts)
            contractNfts = contractNfts.map((item)=> {
              const opensea_url =  generateOpenSeaUrl(settings?.blockchainNetworkMode,collection?.contractAddress?.toLowerCase(),item?.tokenId)
            return{
               ...item,
               opensea_url : opensea_url || null
            }});
            console.log("contractNfts",contractNfts)
            setNftsList(contractNfts);
            setLoading(false);
           }catch(e){
            setLoading(false);
              console.log("Error while getting nft's");
           }finally{
            setLoading(false);
           }
        })();
      }
    }
  }, [
    userDetail?.walletAddress,
    JSON.stringify(collection),
    JSON.stringify(settings),
  ]);
  

  const downloadNft = (url, fileName) => {
    if (url) {
      try {
        var linkElement = document.createElement('a');
        linkElement.id = 'link';
        window.document.body.appendChild(linkElement);
        var link = document.getElementById('link');
        link.setAttribute('href', url);
        link.setAttribute('target', "_blank");
        link.setAttribute('download', fileName); // Set the desired file name
        link.click();
      } catch (err) {
        console.log("Error", err);
      }
    }
  }
  
  return (
    <Fade>
      <section className="Nfts_section common-pad">
        <Container>
          <div class="Workshop_content">
            <h1>Inventory</h1>
            {/* <p>Under Construction</p> */}
            {/* <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </p> */}
          </div>

          <div className="nft_slider mt-5">
              <Row>
              {nftsList && nftsList?.map((item, idx) => {
                console.log("nft item",item)
                const filename = item?.tokenId + ".png";
                return (
                  <Col lg={3}>
                    <div key={idx} className="nft_cover mb-3">
                      <div className="card_img">
                      <img src={item?.rawMetadata?.image} alt="" className="img-fluid" />
                      </div>
                      <p className="item-name">{item?.rawMetadata?.name}</p>
                      <div className="btn_openseawrap mt-3">
                          <Button target="_blank" href={item?.opensea_url} className="btn_openseas">Opensea</Button>
                          <Button onClick={()=>downloadNft(item?.rawMetadata?.image,filename)} className="btn_download">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32"><path fill="currentColor" d="M15 4v16.563L9.72 15.28l-1.44 1.44l7 7l.72.686l.72-.687l7-7l-1.44-1.44L17 20.564V4h-2zM7 27v2h18v-2H7z"/></svg>
                          </Button>

                      </div>
                    </div>
                  </Col>
                );
              })}
              {!loading && !nftsList?.length
              ? 
               <p className="text-center text-light">No record found.</p>
              : 
              loading && !nftsList?.length && 
              <div className="d-flex justify-content-center text-light">
                  <Spinner color="#fff"/>
               </div>
              }
              </Row>
             
          </div>
        </Container>
      </section>
    </Fade>
  );
};

export default Nfts;
