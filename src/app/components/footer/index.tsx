import React from "react";

// const Footers = styled.div`
//   width: 100%;
//   height: 590px;
//   display: flex;
//   background: #343434;
//   background-size: cover;
// `;

export default function Footer() {
  return (
    <div className="footer">
      <div className="heading">
        <h2>
          Faraz<sup>™</sup>
        </h2>
      </div>
      <div className="content">
        <div className="services">
          <h4>Services</h4>
          <p>
            <a href="#">App development</a>
          </p>
          <p>
            <a href="#">Web development</a>
          </p>
          <p>
            <a href="#">DevOps</a>
          </p>
          <p>
            <a href="#">Web designing</a>
          </p>
        </div>
        <div className="social-media">
          <h4>Social</h4>
          <p>
            <a href="#">
              <i className="fab fa-linkedin"></i> Linkedin
            </a>
          </p>
          <p>
            <a href="#">
              <i className="fab fa-twitter"></i> Twitter
            </a>
          </p>
          <p>
            <a href="https://github.com/farazc60">
              <i className="fab fa-github"></i> Github
            </a>
          </p>
          <p>
            <a href="https://www.facebook.com/codewithfaraz">
              <i className="fab fa-facebook"></i> Facebook
            </a>
          </p>
          <p>
            <a href="https://www.instagram.com/codewithfaraz">
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </p>
        </div>
        <div className="links">
          <h4>Quick links</h4>
          <p>
            <a href="#">Home</a>
          </p>
          <p>
            <a href="#">About</a>
          </p>
          <p>
            <a href="#">Blogs</a>
          </p>
          <p>
            <a href="#">Contact</a>
          </p>
        </div>
        <div className="details">
          <h4 className="address">Address</h4>
          <p>
            Korea<br />
            gwangju!
          </p>
          <h4 className="mobile">Mobile</h4>
          <p>
            <a href="#">010-5705****</a>
          </p>
          <h4 className="mail">Email</h4>
          <p>
            <a href="#">farazc60@gmail.com</a>
          </p>
        </div>
      </div>
      <footer>
        <hr />© 2022 codewithFaraz.
      </footer>
    </div>
  );
}
