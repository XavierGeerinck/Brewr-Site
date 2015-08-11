import React, { PropTypes } from 'react';

export class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Footer">
        <div className="Footer-container">
          <div className="row">
            {/* Logo + Social */}
            <div className="col-md-4 Footer-Company">
              <a href="http://brewr.io" className="Footer-Logo">Brewr.io</a>
              <div className="Footer-SocialLinks">
                <a href="#">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="#">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fa fa-github"></i>
                </a>
              </div>
            </div>

            {/* Our Service */}
            <div className="col-md-2">
              <h2>Our Service</h2>
              <ul>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Features</a></li>
                <li><a href="#">Sign in</a></li>
                <li><a href="#">Register</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="col-md-2">
              <h2>Company</h2>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Team</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="col-md-2">
              <h2>Our Service</h2>
              <ul>
                <li><a href="#">Terms</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#"></a></li>
                <li><a href="#"></a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="Footer-copyright">
          Copyright © 2015 Brewr
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
}
