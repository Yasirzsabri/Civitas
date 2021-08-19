// import { useEffect, useState } from 'react';
import './Home.css';
import LogInOrOut from '../LogInOrOut';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/vendor/swiper/swiper-bundle.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';

import parker from './assets/img/speakers/1.jpg';
import yasir from './assets/img/speakers/2.jpg';
import a from './assets/img/gallery/1.jpg';
import calendar from '../screens/Calendar';

// import { MDBIcon, MDBContainer, MDBBtn } from 'mdbreact';



const Home = () => {
    return (
        <main id="main">
            <head>
            <meta charset="utf-8"></meta>
            <meta content="width=device-width, initial-scale=1.0" name="viewport"></meta>
            <title>Civitas</title>

            {/* Google Fonts */}
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Raleway:300,400,500,700,800" rel="stylesheet"></link>
            {/* css */}
            <link href="assets/vendor/aos/aos.css" rel="stylesheet"></link>
            <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"></link>
            <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet"></link>
            <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet"></link>
            <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" ></link>
            <link href="assets/css/style.css" rel="stylesheet" ></link>
                
            </head>

            <header id="header" className="d-flex align-items-center ">
            <div className="container-fluid container-xxl d-flex align-items-center">
                <div id="logo" className="me-auto" >
                    <a href="index.html" className="scrollto"></a>
                </div>
                
                <div className="nava" >
                    <nav id="navbar" className="navbar order-last order-lg-0">
                        <ul>
                        <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
                        {/* <li><a className="nav-link scrollto" href="#about">About</a></li> */}
                        {/* <li><a className="nav-link scrollto" href="http://localhost:4444/calendar">Events Schedule</a></li>
                        <li><a className="nav-link scrollto" href="http://localhost:4444/Pay">Become A Membership</a></li> */}
                        <li><a className="nav-link scrollto" href="/calendar">Events Schedule</a></li>
                        <li><a className="nav-link scrollto" href="/Pay">Pay for Membership</a></li>
                        <li><a className="nav-link scrollto" href="#gallery">Gallery</a></li>
                        {/* <li><a className="nav-link scrollto" href="#contact">Contact</a></li> */}
                        </ul>
                    </nav>
                    {/* <a className="buy-tickets scrollto" href="#buy-tickets">Buy Tickets</a> */}
                </div>
            </div>
            </header >
           
            <section id="hero" >
                <div className="hero-container" data-aos="zoom-in" data-aos-delay="100">
                     <h1 className="mb-4 pb-0">Welcome<br></br><span>To</span> Civitas </h1>
                     <p className="mb-4 pb-0">Community Page</p>
                     {/* <a href="#about" class="about-btn scrollto">Learn More</a> */}
                     <div className="container" >
                     <LogInOrOut />
                     </div>
                </div>
            </section>

            <section id="speakers">
                <div className="container" data-aos="fade-up">
                    <div className="section-header">
                        <h2> Developers </h2>
                        <p>Here are Our Developers Team </p>
                    </div>
                    <div className="row">
                       <div className="col-lg-6 col-md-4">
                           <div className="speaker" data-aos="fade-up" data-aos-delay="100"> 
                                <img src = {parker} alt="Speaker 1" className="img-fluid"></img>
                                <div className="details">
                                        <h3><a >Parker Sjogren</a></h3>
                                        <p></p>
                                        <div className="social">
                                            <a href="https://www.linkedin.com/in/parkersjogren/">
                                                <i className="fab fa-linkedin-in">  </i>
                                                </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                           <div className="speaker" data-aos="fade-up" data-aos-delay="100"> 
                                <img src = {yasir} alt="Speaker 1" className="img-fluid"></img>
                                <div className="details">
                                        <h3><a>Yasir Sabri</a></h3>
                                        <p></p>
                                        <div className="social">
                                            <a href="https://www.linkedin.com/in/yasir-sabri-5877079301/">
                                                <i className="fab fa-linkedin-in">  </i>
                                                </a> 
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </section>

            <section id="gallery">
            <div className="container" data-aos="fade-up">
                <div className="section-header">
                 <h2>Gallery</h2>
                 <p>Check our gallery from the recent events</p>
                </div>
             </div>

             <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target= "#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img className="d-block w-100" src={a} alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100" src={parker} alt="Second slide"/>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100" src={yasir} alt="Third slide"/>
                    </div>
                </div>
                <a className="carousel-control-prev" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next"  role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
                </div>

             {/* <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                      <li data-target="#carouselExampleIndicators" data-slide="0" className="active"></li>
                      <li data-target="#carouselExampleIndicators" data-slide="1"></li>
                      <li data-target="#carouselExampleIndicators" data-slide="2"></li>
                     </ol>
                     <div className="carousel-inner">
                        <div className="carousel-item active">
                        <img src={a} className="d-block w-100" data-slide="0" ></img>
                        </div>
                        <div className="carousel-item">
                        <img src={parker} className="d-block w-100" data-slide="1" ></img>
                        </div>
                        <div className="carousel-item">
                        <img src={yasir} className="d-block w-100"  data-slide="2"></img>
                        </div>
                         */}
                        
                    
                        
                    {/* </div>
                
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                    
                </div> */}

                {/* <div className="gallery-slider swiper-container">
                    <div className="swiper-wrapper align-items-center">
                        <div className="swiper-slide">
                            <a  className="gallery-lightbox">
                                <img src={a} className="img-fluid" /> </a>
                        </div>

                    </div>
                    <div className="swiper-wrapper align-items-center">
                        <div className="swiper-slide">
                            <a  className="gallery-lightbox">
                                <img src={a} className="img-fluid"/></a>
                        </div>

                    </div>
                    <div className="swiper-pagination"></div>
                </div> */}
            
            </section>



            

            <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
            <script src="assets/vendor/aos/aos.js"></script>
            <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
            <script src="assets/vendor/php-email-form/validate.js"></script>
            <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
            <script src="assets/js/main.js"></script> 


        </main>
        
    );
}
 
export default Home;