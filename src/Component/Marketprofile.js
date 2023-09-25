import React from 'react'
import { Container } from 'react-bootstrap'
import { Fade } from "react-reveal";


const Marketprofile = () => {
  return (
    <Fade>
    <section className='market_profile'>
        <div className="profile_banner"></div>
       <Container>
           <div className="market_bio_section">
                <div className="bio_profile">
                      <img src="/images/marketuser.png" alt="" className='img-fluid'/>
                </div>

                <div className="bio_content">
                      <h3>AKIMME</h3>
                      <p>Items <span>20K</span> Created <span>Mar 2023</span></p>

                      <ul className='bio_list'>
                        <li>
                            <h4>10k</h4>
                            <p>Items</p>
                        </li>
                        <li>
                            <h4>3593</h4>
                            <p>Owners</p>
                        </li>
                        <li>
                            <h4>15 ETH</h4>
                            <p>Floor</p>
                        </li>
                        <li>
                            <h4>0.01%</h4>
                            <p>Listed</p>
                        </li>
                        <li>
                            <h4>₳ 43.2m</h4>
                            <p>Volume</p>
                        </li>
                      </ul>
                </div>
           </div>
       </Container> 
    </section>
    </Fade>
  )
}

export default Marketprofile;