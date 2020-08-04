import React from 'react';
// import { Link } from "react-router-dom";
import './Profile.scss';

class Profile extends React.Component {
    state = {
        showList: false
    };
    render() {
        const showList = () => {
            this.setState({showList: !this.state.showList});
        }
        return (
            <section id="profilePage">
                <div id="businessHeader" className="verticalMargin20">Headline1</div>
                <div id="subtitle" className="verticalMargin20">Subtitle</div>
                <div id="body" className="verticalMargin20">Body</div>
                <button id="buttonGreen" className="verticalMargin20 displayBlock">Button</button>
                <button id="buttonGreenOutline" className="verticalMargin20 displayBlock">Button</button>

                <div id="tagGreen" className="verticalMargin20">Tag</div>
                <div id="tagGreenOutline" className="verticalMargin20">Tag</div>

                <div id="label" className="verticalMargin20">Label</div>

                <div id="dropdown1" className="verticalMargin20">
                    <button onClick={() => showList()}>Button <i className="fas fa-caret-down"></i></button>
                    <ul className={this.state.showList?'show':''}>
                        <li>Option 1</li>
                        <li>Option 2</li>
                        <li>Option 3</li>
                    </ul>
                </div>
            </section>
        )
    }
}

export default Profile;