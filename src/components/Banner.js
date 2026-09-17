import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import img1 from "./assets/bannerimages/1.png";
import img2 from "./assets/bannerimages/2.png";
import img3 from "./assets/bannerimages/3.png";
import img4 from "./assets/bannerimages/4.png";
import img5 from "./assets/bannerimages/5.png";


export const Banner = () => {
  return (
             
     <Carousel autoPlay infiniteLoop interval={3000} showThumbs={false} selectedItem={false}>
          <div>
             <img src={img1} alt='Banner 1'  className='w-full h-[250px] object-conytain'/>
         </div>

          <div>
             <img src={img2} alt='Banner 2'  className='w-full h-[250px] object-conytain'/>
         </div>

          <div>
             <img src={img3} alt='Banner 3'  className='w-full h-[250px] object-conytain' />
         </div>

          <div>
             <img src={img4} alt='Banner 4'  className='w-full h-[250px] object-conytain'/>
         </div>

         <div>
             <img src={img5} alt='Banner 5'  className='w-full h-[250px] object-conytain'/>
         </div>

    </Carousel>

    
  )
}



