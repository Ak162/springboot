import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Fade } from "react-reveal";
import Slider from "react-slick";
import { getCollection } from "store/actions";

const mintdata = [
  {
    mintimg: "/images/1.png",
  },
  {
    mintimg: "/images/2.png",
  },
  {
    mintimg: "/images/3.png",
  },
  {
    mintimg: "/images/4.png",
  },
  {
    mintimg: "/images/5.png",
  },
  {
    mintimg: "/images/6.png",
  },
  {
    mintimg: "/images/7.png",
  },
  {
    mintimg: "/images/8.png",
  },
  {
    mintimg: "/images/9.png",
  },
  {
    mintimg: "/images/10.png",
  },
];

const Mintsection = () => {
  const dispatch = useDispatch();
  const { collection } = useSelector((state) => state?.Collection);
  const { settings } = useSelector((state) => state?.Setting);

  useEffect(() => {
    if (settings?.activeCollectionId) {
      dispatch(getCollection(settings?.activeCollectionId));
    }
  }, [settings]);

  console.log("collection", collection);

  var setting = {
    dots: false,
    infinite: false,
    autoplay: true,
    speed: 500,
    slidesToShow: 4.5,
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
  return (
    <>
      <section id="mintsection" className="mint_section">
        <Container>
          <Row>
            <Col lg={3} md={6} sm={12}>
              <div className="mint_cont_common">
                <h3>{collection?.maxSupply || 0}</h3>
                <p>Total Items</p>
              </div>
            </Col>

            <Col lg={3} md={6} sm={12}>
              <div className="mint_cont_common">
                <h3>{collection?.mintedNft || 0}</h3>
                <p>Total Owners</p>
              </div>
            </Col>

            <Col lg={3} md={6} sm={12}>
              <div className="mint_cont_common">
                <h3>{collection?.cost || 0}</h3>
                <p>Floor Price (ETH)</p>
              </div>
            </Col>

            <Col lg={3} md={6} sm={12}>
              <div className="mint_cont_common">
                <h3>{(collection?.cost * collection?.mintedNft) || 0}</h3>
                <p>Volume Traded (ETH)</p>
              </div>
            </Col>
          </Row>
        </Container>

        {/* <div className="mint_slider mt-5">
          <Slider {...setting}>
            {mintdata.map((items, idx) => {
              return (
                <div key={idx} className="img_cover">
                  <img src={items.mintimg} alt="" className="img-fluid" />
                </div>
              );
            })}
          </Slider>
        </div> */}
      </section>
    </>
  );
};

export default Mintsection;
