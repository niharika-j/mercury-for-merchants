import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.scss';
import profileImg from '../assets/img/profile.png';
import logo from '../assets/img/logo.png';
import bizPerformance from '../assets/img/Business performance.png';
import promotions from '../assets/img/Promotions.png';
import messages from '../assets/img/Messages.png';

class Navbar extends React.Component {
    state = {
        activeTab: 'promotions'
    };

    render() {
        const setActiveTab = (tabName) =>  {
            this.setState({activeTab: tabName});
        }
        return (
            <nav>
                <div className="logo-container cursor-not-allowed">
                    <img src={logo} alt="Mercury logo" />
                </div>
                {/* <Link to='/profile'> */}
                    {/* <div id="profile" className={this.state.activeTab==='profile'?'active':''} onClick={() => setActiveTab("profile")}> */}
                    <div id="profile" className="cursor-not-allowed">
                        <img src={profileImg} alt="Umami logo" />
                        <div>Umami</div>
                    </div>
                {/* </Link> */}

                {/* <Link to='/performance'> */}
                    {/* <div className={this.state.activeTab==='performance'?'active link':'link'} onClick={() => setActiveTab("performance")}> */}
                    <div className="link cursor-not-allowed">
                        <div>
                            <img src={bizPerformance} alt="graph icon" />
                        </div>
                        <div className="link-text">Business Performance</div>
                    </div>
                {/* </Link> */}

                <Link to='/promotions'>
                    <div className={this.state.activeTab==='promotions'?'active link cursor-pointer':'link cursor-pointer'} onClick={() => setActiveTab("promotions")}>
                        <div>
                            <img src={promotions} alt="promo icon" />
                        </div>
                        <div className="link-text">Promotions</div>
                    </div>
                </Link>

                {/* <Link to='/messages'> */}
                    <div className="link cursor-not-allowed">
                    {/* <div className={this.state.activeTab==='messages'?'active link':'link'} onClick={() => setActiveTab("messages")}> */}
                        <img src={messages} alt="envelope icon" />
                        <div className="link-text">Messages</div>
                    </div>
                {/* </Link> */}
            </nav>
        )
    }
}

export default Navbar;