 
import React from "react";
import { Link } from "react-router-dom";
import "./css/nickprofile.css"

const Homepage = () => {
    return (
        <div className="bigletters">
            <div id="intro-container">
                <div id="opening-message">
                    <p>Welcome to Threadline: a single page web application for buying and selling clothes.</p>
                    <br/>
                    <p>Designed by <a className="homepage-anchor" href="https://github.com/StroudEN" target="_blank">Preston J Howell</a>, <a className="homepage-anchor" href="https://github.com/nickbloo" target="_blank">Nick Hargrove</a> and <a className="homepage-anchor" href="https://github.com/emir350" target="_blank">Emir Taletovic</a> using React.js, PostgreSQL and Express Router.</p>
                </div>
                <img id="intro-img" src="https://cdn-icons-png.flaticon.com/512/2422/2422251.png" alt="marketplace-icon"/>
            </div>

            <br />
            
            <h1><Link className="homepage-link-tag" to="/products">Browse Products</Link></h1>
            <div id="browsing-preview-container">
                <img className="bottom-images" src="https://images.cubebik.com/2021/06/070621-034430-CubeBik-Image-934-768x768.jpg" alt="large-product-img1"
                onMouseOver={e => (e.currentTarget.src = "https://m.media-amazon.com/images/I/614zOxCmGLL._AC_UY1000_.jpg")}
                onMouseOut={e => (e.currentTarget.src = "https://images.cubebik.com/2021/06/070621-034430-CubeBik-Image-934-768x768.jpg")}/>

                <img className="bottom-images" src="https://www.darklandsberlin.com/wp-content/uploads/2020/12/2020-AW_0285-scaled.jpg" alt="large-product-img2"  
                onMouseOver={e => (e.currentTarget.src = "https://ih1.redbubble.net/image.3370738041.6479/drawstring_bag,x750-pad,750x1000,f8f8f8.jpg")}
                onMouseOut={e => (e.currentTarget.src = "https://www.darklandsberlin.com/wp-content/uploads/2020/12/2020-AW_0285-scaled.jpg")}/>

                <img className="bottom-images" src="https://media.gq.com/photos/587e7c7c57b572032fe7f482/1:1/w_744,h_744,c_limit/jnco-jean-comeback-tout.jpg" alt="large-product-img3" 
                onMouseOver={e => (e.currentTarget.src = "https://pa.namshicdn.com/product/48/0113/v1/1-zoom-desktop.jpg")}
                onMouseOut={e => (e.currentTarget.src = "https://media.gq.com/photos/587e7c7c57b572032fe7f482/1:1/w_744,h_744,c_limit/jnco-jean-comeback-tout.jpg")}/>
            </div>
        </div>
    )
};

export default Homepage;