// import { useEffect, useState } from 'react';
import './Home.css'
import LogInOrOut from '../LogInOrOut'
import 'bootstrap/dist/css/bootstrap.css'



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
                
                <nav id="navbar" className="navbar order-last order-lg-0">
                    <ul>
                    <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
                    <li><a className="nav-link scrollto" href="#about">About</a></li>
                    <li><a className="nav-link scrollto" href="http://localhost:4444/calendar">Events Schedule</a></li>
                    <li><a className="nav-link scrollto" href="#venue">Become A Membership</a></li>
                    <li><a className="nav-link scrollto" href="#gallery">Gallery</a></li>
                    <li><a className="nav-link scrollto" href="#contact">Contact</a></li>
                    </ul>
                </nav>
                <a className="buy-tickets scrollto" href="#buy-tickets">Buy Tickets</a>
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

            

        </main>
        
    );
}
 
export default Home;