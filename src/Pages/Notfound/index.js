import React from 'react'
import { Button } from 'react-bootstrap';
import { Fade } from 'react-reveal';
import { useNavigate } from 'react-router-dom';

const Notfound = () => {
    const navigate = useNavigate();
  return (
    <Fade>
    <section className='not_found'>
        <div className="not_found_box text-center">
              <h1>404</h1>
              <p>Page not found</p>
              <Button className='back_to_home' onClick={()=> navigate("/")}>Back to Home</Button>
        </div>
    </section>
    </Fade>
  )
}

export default Notfound;