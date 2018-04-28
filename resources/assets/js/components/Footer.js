import React, {Component} from "react";

const date = new Date()

const Footer = ()=>{
    return(
        <div class="footer">
            <span>&copy; ArtWark {date.getFullYear()}</span>
            <span>Designed By Marvinified </span>
            <div>
                <a href="https://twitter.com/Marvinified">
                    <img src="../images/tweet.png" alt=""/>
                </a>
                <a href="">
                    <img src="../images/github.png" alt=""/>
                </a>
                <a href="">
                    <img src="../images/linkedin.png" alt=""/>
                </a>
            </div>
        </div>
    )
};

export default Footer;