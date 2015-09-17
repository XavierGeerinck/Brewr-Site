import React, { PropTypes } from 'react';
import Footer from '../../elements/Footer';
import Logo from '../../elements/Logo';
import './Home.css';
import { Link } from 'react-router';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="HomePage">

            	<header>
            		<nav>
            			<div className="container">
                            <Link to="/">
                                <Logo align="left" />
                            </Link>

            				<ul>
            					<li><Link to="/">Home</Link></li>
            					<li><a href="tour.html">Tour</a></li>
            					<li><a href="pricing.html">Pricing</a></li>
            					<li><Link to="/login">Sign in</Link></li>
            					<li><Link className="button white" to="/register">Sign up</Link></li>
            				</ul>
            			</div>
            		</nav>

            		<div class="container">
            			<h1>Simple development environments.</h1>
            			<p className="subtitle">
            				Easily create and share environments with your team. <a href="#">Learn more</a>.
            			</p>

            			<form action="">
            				<input type="email" placeholder="Email address" />
            				<input type="password" placeholder="Password" />
            				<input type="submit" value="Get started for free" className="button accent" />

            				<p className="details">Free 10 day "Organization" plan trial. No credit card required.</p>
            			</form>
            		</div>
            	</header>

                <section className="padding-double centered">
            		<div className="container">
            			<div className="row">
            				<div className="col-md-4 icon-block">
            					<div className="circle accent">
            						<i className="fa fa-heart"></i>
            					</div>
            					<h3>Built for teams</h3>
            					<p className="subtitle">Here’s a truly convincing argument that appeals to organizations.</p>
            				</div>

            				<div className="col-md-4 icon-block">
            					<div className="circle success">
            						<i className="fa fa-play"></i>
            					</div>
            					<h3>Easy to use</h3>
            					<p className="subtitle">Here’s a truly convincing argument that appeals to organizations.</p>
            				</div>

            				<div className="col-md-4 icon-block">
            					<div className="circle info">
            						<i className="fa fa-refresh"></i>
            					</div>
            					<h3>Built for teams</h3>
            					<p className="subtitle">Here’s a truly convincing argument that appeals to organizations.</p>
            				</div>
            			</div>
            		</div>
            	</section>

            	<section id="screenshot" className="centered">
            		<div className="container">
            			<h2>Manage all your projects.</h2>
            			<p className="subtitle">Here’s a truly convincing argument that appeals to organizations. It should be two lines long so here’s another cool one.</p>

            			<div id="screenshot-image"></div>
            		</div>
            	</section>

            	<section className="padding centered accent">
            		<div className="container">
            			<a href="" className="button white-alt medium">
            				<i className="fa fa-download"></i> Download for Mac OS X
            			</a>

            			<div className="spacer-half"></div>

            			<p className="bold small">Also available for <i className="fa fa-windows"></i> <a href="#">Windows</a> and <i className="fa fa-linux"></i> <a href="#">Linux</a></p>

            			<p className="bold small">Coming soon for <i className="fa fa-windows"></i> Windows and <i className="fa fa-linux"></i> Linux - <a href="#">Get notified</a>.</p>
            		</div>
            	</section>

            	<section className="padding-double centered">
            		<div className="container">
            			<h2>Don't waste time on installation</h2>
            			<p className="subtitle">Your time is valuable. With Takeoff, setting up the development environment for a team member is just one click away one click away.</p>

            			<div className="row" id="comparison">
            				<div className="col-md-5">
            					<img src={require('./before.png')} height="56" />
            					<h4><strong>Before:</strong> manual install</h4>
            					<p>Expensive engineer time wasted on babysitting the installation.</p>
            				</div>

            				<div className="col-md-2">
            					<div className="line"></div>
            					<div className="vs">VS</div>
            					<div className="line"></div>
            				</div>

            				<div className="col-md-5">
            					<img src={require('./after.png')} height="56" />
            					<h4><strong className="success">After:</strong> Takeoff install</h4>
            					<p>One click and a coffee break.<br />Let Takeoff do the hard work.</p>
            				</div>
            			</div>
            		</div>
            	</section>

            	<section className="padding-double dark centered">
            		<div className="container">
            			<h2>Pick your plan</h2>
            			<p className="subtitle">Hard to choose? Try our risk free 10 day trial.</p>

            			<div className="spacer"></div>

            			<div className="row">
            				<div className="col-md-6 align-right">
            					<div className="plan">
            						<p className="title">Personal</p>
            						<p className="subtitle">One developer</p>
            						<div className="price">Free</div>

            						<div className="padding-half">
            							<ul>
            								<li>
            									<i className="fa fa-check text-success"></i> Unlimited projects
            								</li>

            								<li>
            									<i className="fa fa-check text-success"></i> 1-click project install
            								</li>

            								<li>
            									<i className="fa fa-check text-success"></i> Easy project wizard
            								</li>

            								<li className="disabled">
            									<i className="fa fa-times text-accent"></i> Shared projects
            								</li>

            								<li className="disabled">
            									<i className="fa fa-times text-accent"></i> Support
            								</li>
            							</ul>

            							<div className="spacer-half"></div>

            							<a href="" className="button block primary-highlight">Sign up</a>
            							<p className="text-disabled">You can upgrade at any time.</p>
            						</div>
            					</div>
            				</div>

            				<div className="col-md-6 align-left">
            					<div className="plan">
            						<p className="title">Organization</p>
            						<p className="subtitle">Multiple developers</p>
            						<div className="price success">$ 3.99 <small>per user/month</small></div>

            						<div className="padding-half">
            							<ul>
            								<li>
            									<i className="fa fa-check text-success"></i> Unlimited projects
            								</li>

            								<li>
            									<i className="fa fa-check text-success"></i> 1-click project install
            								</li>

            								<li>
            									<i className="fa fa-check text-success"></i> Easy project wizard
            								</li>

            								<li>
            									<i className="fa fa-check text-success"></i> Shared projects
            								</li>

            								<li>
            									<i className="fa fa-check text-success"></i> Support
            								</li>
            							</ul>

            							<div className="spacer-half"></div>

            							<a href="" className="button accent block">Free 10 day trial</a>
            							<p className="text-disabled">No credit card required.</p>
            						</div>
            					</div>
            				</div>
            			</div>
            		</div>
            	</section>

            	<section className="padding centered">
            		<h2 className="smaller">Still not convinced?</h2>
            		<a className="button info medium">Learn more <i className="fa fa-chevron-right icon-right"></i></a>
            	</section>

            	<section id="license">
            		The header picture, <a href="https://www.flickr.com/photos/mshipp/15656596092" target="_blank">"Milkyway"</a> by Mathew is used under a <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank">Attribution 2.0 Generic</a> license.
            	</section>

                <Footer />
            </div>
        )
    }
}

export default Home;
