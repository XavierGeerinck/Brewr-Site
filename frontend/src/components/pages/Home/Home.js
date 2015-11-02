import React, { PropTypes } from 'react';
import Footer from '../../elements/Footer';
import Logo from '../../elements/Logo';
import AuthStore from '../../../stores/AuthStore';
import styles from './Home.scss';
import purecss from 'purecss/build/grids-responsive.css';
import fa from 'font-awesome/css/font-awesome.css';
import classNames from 'classnames';
import { Link } from 'react-router';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = this._getAuthState();
    }

    _getAuthState() {
        return {
            isLoggedIn: AuthStore.user != undefined,
            user: AuthStore.user
        }
    }

    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        AuthStore.addChangeListener(this.changeListener);
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.changeListener);
    }

    _onChange() {
        // Change state
        var newState = this._getAuthState();
        this.setState(newState);
    }

    renderLoggedInMenu() {
        return (
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><a href="tour.html">Tour</a></li>
                <li><a href="pricing.html">Pricing</a></li>
                <li><Link to="/logout">Logout</Link></li>
                <li><Link className={styles.button, style.white} to="/dashboard">Dashboard</Link></li>
            </ul>
        );
    }

    renderNogLoggedInMenu() {
        return (
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><a href="tour.html">Tour</a></li>
                <li><a href="pricing.html">Pricing</a></li>
                <li><Link to="/login">Sign in</Link></li>
                <li><Link className={styles.button, styles.white} to="/register">Sign up</Link></li>
            </ul>
        );
    }

    render() {
        const { isLoggedIn, user } = this.state;

        return (
            <div className={styles.HomePage}>

            	<header>
            		<nav className={styles.nav}>
            			<div className={styles.container}>
                            <Link to="/">
                                <Logo align="left" />
                            </Link>

                            { isLoggedIn ? this.renderLoggedInMenu() : this.renderNogLoggedInMenu() }
            			</div>
            		</nav>

            		<div className={styles.container}>
            			<h1>Simple development environments.</h1>
            			<p className={styles.subtitle}>
            				Easily create and share environments with your team. <a href="#">Learn more</a>.
            			</p>

            			<form action="">
            				<input type="email" placeholder="Email address" />
            				<input type="password" placeholder="Password" />
            				<input type="submit" value="Get started for free" className={classNames(styles.button, styles.accent)} />

            				<p className={styles.details}>Free 10 day "Organization" plan trial. No credit card required.</p>
            			</form>
            		</div>
            	</header>

                <section className={classNames(styles['padding-double'], styles.centered)}>
            		<div className={styles.container}>
            			<div className={purecss['pure-g']}>
            				<div className={classNames(purecss['pure-u-md-1-3'], styles['icon-block'])}>
            					<div className={classNames(styles.circle, styles.accent)}>
            						<i className={classNames(fa.fa, fa['fa-heart'])}></i>
            					</div>
            					<h3>Built for teams</h3>
            					<p className={styles.subtitle}>Here’s a truly convincing argument that appeals to organizations.</p>
            				</div>

            				<div className={classNames(purecss['pure-u-md-1-3'], styles['icon-block'])}>
            					<div className={classNames(styles.circle, styles.success)}>
            						<i className={classNames(fa.fa, fa['fa-play'])}></i>
            					</div>
            					<h3>Easy to use</h3>
            					<p className={styles.subtitle}>Here’s a truly convincing argument that appeals to organizations.</p>
            				</div>

            				<div className={classNames(purecss['pure-u-md-1-3'], styles['icon-block'])}>
            					<div className={classNames(styles.circle, styles.info)}>
            						<i className={classNames(fa.fa, fa['fa-refresh'])}></i>
            					</div>
            					<h3>Built for teams</h3>
            					<p className={styles.subtitle}>Here’s a truly convincing argument that appeals to organizations.</p>
            				</div>
            			</div>
            		</div>
            	</section>

            	<section id={styles.screenshot} className={styles.centered}>
            		<div className={styles.container}>
            			<h2>Manage all your projects.</h2>
            			<p className={styles.subtitle}>Here’s a truly convincing argument that appeals to organizations. It should be two lines long so here’s another cool one.</p>

            			<div id={styles['screenshot-image']}></div>
            		</div>
            	</section>

            	<section className={classNames(styles.padding, styles.centered, styles.accent)}>
            		<div className={styles.container}>
            			<a href="" className={classNames(styles.button, styles['white-alt'], styles.medium)}>
            				<i className={classNames(fa.fa, fa['fa-download'])}></i> Download for Mac OS X
            			</a>

            			<div className={styles['spacer-half']}></div>

            			<p className={classNames(styles.bold, styles.small)}>Also available for <i className={classNames(fa.fa, fa['fa-windows'])}></i> <a href="#">Windows</a> and <i className={classNames(fa.fa, fa['fa-linux'])}></i> <a href="#">Linux</a></p>

            			<p className={classNames(styles.bold, styles.small)}>Coming soon for <i className={classNames(fa.fa, fa['fa-windows'])}></i> Windows and <i className={classNames(fa.fa, fa['fa-linux'])}></i> Linux - <a href="#">Get notified</a>.</p>
            		</div>
            	</section>

            	<section className={classNames(styles['padding-double'], styles.centered)}>
            		<div className={styles.container}>
            			<h2>Don't waste time on installation</h2>
            			<p className={styles.subtitle}>Your time is valuable. With Takeoff, setting up the development environment for a team member is just one click away one click away.</p>

            			<div className={purecss['pure-g']} id={styles.comparison}>
            				<div className={purecss['pure-u-md-1-3']}>
            					<img src={require('./before.png')} height="56" />
            					<h4><strong>Before:</strong> manual install</h4>
            					<p>Expensive engineer time wasted on babysitting the installation.</p>
            				</div>

            				<div className={purecss['pure-u-md-1-3']}>
            					<div className={styles.line}></div>
            					<div className={styles.vs}>VS</div>
            					<div className={styles.line}></div>
            				</div>

            				<div className={purecss['pure-u-md-1-3']}>
            					<img src={require('./after.png')} height="56" />
            					<h4><strong className={styles.success}>After:</strong> Takeoff install</h4>
            					<p>One click and a coffee break.<br />Let Takeoff do the hard work.</p>
            				</div>
            			</div>
            		</div>
            	</section>

            	<section className={classNames(styles['padding-half'], styles.dark, styles.centered)}>
            		<div className={styles.container}>
            			<h2>Pick your plan</h2>
            			<p className={styles.subtitle}>Hard to choose? Try our risk free 10 day trial.</p>

            			<div className={styles.spacer}></div>

            			<div className={purecss['pure-g']}>
            				<div className={classNames(purecss['pure-u-md-1-2'], styles['align-right'])}>
            					<div className={styles.plan}>
            						<p className={styles.title}>Personal</p>
            						<p className={styles.subtitle}>One developer</p>
            						<div className={styles.price}>Free</div>

            						<div className={styles['padding-half']}>
            							<ul>
            								<li>
            									<i className={classNames(fa.fa, fa['fa-check'], styles['text-success'])}></i> Unlimited projects
            								</li>

            								<li>
            									<i className={classNames(fa.fa, fa['fa-check'], styles['text-success'])}></i> 1-click project install
            								</li>

            								<li>
            									<i className={classNames(fa.fa, fa['fa-check'], styles['text-success'])}></i> Easy project wizard
            								</li>

            								<li className={styles.disabled}>
            									<i className={classNames(fa.fa, fa['fa-times'], styles['text-accent'])}></i> Shared projects
            								</li>

            								<li className={styles.disabled}>
            									<i className={classNames(fa.fa, fa['fa-times'], styles['text-accent'])}></i> Support
            								</li>
            							</ul>

            							<div className={styles['spacer-half']}></div>

            							<a href="" className={classNames(styles.button, styles.block, styles['primary-highlight'])}>Sign up</a>
            							<p className={styles['text-disabled']}>You can upgrade at any time.</p>
            						</div>
            					</div>
            				</div>

            				<div className={classNames(purecss['pure-u-md-1-2'], styles['align-left'])}>
            					<div className={styles.plan}>
            						<p className={styles.title}>Organization</p>
            						<p className={styles.subtitle}>Multiple developers</p>
            						<div className={classNames(styles.price, styles.success)}>$ 3.99 <small>per user/month</small></div>

            						<div className={styles['padding-half']}>
            							<ul>
            								<li>
            									<i className={classNames(fa.fa, fa['fa-check'], styles['text-success'])}></i> Unlimited projects
            								</li>

            								<li>
            									<i className={classNames(fa.fa, fa['fa-check'], styles['text-success'])}></i> 1-click project install
            								</li>

            								<li>
            									<i className={classNames(fa.fa, fa['fa-check'], styles['text-success'])}></i> Easy project wizard
            								</li>

            								<li>
            									<i className={classNames(fa.fa, fa['fa-check'], styles['text-success'])}></i> Shared projects
            								</li>

            								<li>
            									<i className={classNames(fa.fa, fa['fa-check'], styles['text-success'])}></i> Support
            								</li>
            							</ul>

            							<div className={styles['spacer-half']}></div>

            							<a href="" className={classNames(styles.button, styles.accent, styles.block)}>Free 10 day trial</a>
            							<p className={styles['text-disabled']}>No credit card required.</p>
            						</div>
            					</div>
            				</div>
            			</div>
            		</div>
            	</section>

            	<section className={classNames(styles.padding, styles.centered)}>
            		<h2 className={styles.smaller}>Still not convinced?</h2>
            		<a className={classNames(styles.button, styles.info, styles.medium)}>Learn more <i className={classNames(fa.fa, fa['fa-chevron-right'], styles['icon-right'])}></i></a>
            	</section>

            	<section id={styles.license}>
            		The header picture, <a href="https://www.flickr.com/photos/mshipp/15656596092" target="_blank">"Milkyway"</a> by Mathew is used under a <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank">Attribution 2.0 Generic</a> license.
            	</section>

                <Footer />
            </div>
        )
    }
}

export default Home;
