import React from 'react';
// import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { Redirect } from 'react-router-dom';
import './CreatePromotion.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import fire from '../config';



class CreatePromotion extends React.Component {
    state = {
        promotion: null,
        id: null,
        redirect: false,
        currentPromotions: null
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getPromotionData(id);
    }

    getPromotionData(id) {
        if(!id||id==="new"){
            fire.database().ref('current').on('value', (snapshot) => {
                console.log("snap", snapshot.val());
                let currentPromotions = snapshot.val();
                this.setState({currentPromotions: currentPromotions});
            });
            return;
        }
        fire.database().ref('current').on('value', (snapshot) => {
            console.log("snap", snapshot.val());
            let currentPromotions = snapshot.val();
            let filteredPromotions = currentPromotions.filter(p => p.id===id);
            if(filteredPromotions.length>0) {
                this.setState({promotion: filteredPromotions[0], id: id, currentPromotions: currentPromotions});
            }
        });
    }

    formatDate(dateObj) {
        if(!dateObj) {
            return "";
        }
        if(typeof(dateObj)==='string'||typeof(dateObj)==='number') {
            dateObj = new Date(dateObj);
        }
        var options_year = { year: 'numeric'};
        var options_month = { month: '2-digit'};
        var options_day = { day: '2-digit'};
        let year = dateObj.toLocaleDateString("en-US", options_year);
        let month = dateObj.toLocaleDateString("en-US", options_month);
        let day = dateObj.toLocaleDateString("en-US", options_day);

        return year + '-' + month  +  '-' + day;
    }

    handleChange(event, field) {
        let emptyPromotionObj = {
            name: "",
            expires: "",
            deal_type: "",
            deal_value: "",
            top_list_user_friends: false,
            first_timers: false,
            followers: false,
            top_customers: false,
            top_list_users: false,
            radius: "",
            preferred_interests: ""
        }
        let promotionCopy = this.state.promotion?JSON.parse(JSON.stringify(this.state.promotion)):emptyPromotionObj;
        if(event.target.id==="formPromotionName"){
            promotionCopy[field] = event.target.value;
        }
        else if (event.target.id==="formExpiry") {
            promotionCopy[field] = new Date(event.target.value).getTime();
        }
        else if(event.target.id==="formPromotionType") {
            promotionCopy[field] = event.target.value;
        }
        else if(event.target.id==="formPromotionValue") {
            promotionCopy[field] = event.target.value;
        }
        else if(event.target.id==="formToplistFriends") {
            promotionCopy[field] = !promotionCopy[field];
        }
        else if(event.target.id==="formFirstTimeCustomers") {
            promotionCopy[field] = !promotionCopy[field];
        }
        else if(event.target.id==="formFollowers") {
            promotionCopy[field] = !promotionCopy[field];
        }
        else if(event.target.id==="formTopCustomers") {
            promotionCopy[field] = !promotionCopy[field];
        }
        else if(event.target.id==="formTopListUsers") {
            promotionCopy[field] = !promotionCopy[field];
        }
        else if(event.target.id==="formPromotionRadius") {
            promotionCopy[field] = event.target.value;
        }
        else if(event.target.id==="formPromotionPreferredInterests") {
            promotionCopy[field] = event.target.value;
        }
        this.setState({promotion: promotionCopy, id: this.state.id});
    }

    saveDeal() {
        debugger;
        let promotions = JSON.parse(JSON.stringify(this.state.currentPromotions));
        let editedPromotion = JSON.parse(JSON.stringify(this.state.promotion));
        if(!this.state.id){
            editedPromotion.id = `c${promotions.length}`;
            editedPromotion.views = 80;
            editedPromotion.clicks = 71;
            editedPromotion.new_customers = 25;
            editedPromotion.total_spend = 1255;
            editedPromotion.start_date = new Date().getTime();
            editedPromotion.targeted = 100;
            if(editedPromotion.deal_type==="%") {
                editedPromotion.deal_details = editedPromotion.deal_value + '% Off';
            }
            else {
                editedPromotion.deal_details = "$" + editedPromotion.deal_value + ' Off';
            }
            promotions.push(editedPromotion);
        }
        else {
            editedPromotion.start_date = new Date().getTime();
            if(editedPromotion.deal_type==="%") {
                editedPromotion.deal_details = editedPromotion.deal_value + '% Off';
            }
            else {
                editedPromotion.deal_details = "$" + editedPromotion.deal_value + ' Off';
            }
            let editedCurrentPromotions = promotions.map(promotion => promotion.id===editedPromotion.id?editedPromotion:promotion);
            promotions = JSON.parse(JSON.stringify(editedCurrentPromotions));
        }
        fire.database().ref('current').set(promotions);
        this.setState({redirect: true});
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/promotions' />
        }
    }
    
    render() {
        return (
            <section id="create-promotion-page">
                {this.renderRedirect()}
                <div className="create-promotions-header">
                    Merchant Promotion
                </div>

                <div id="create-promotion-form">
                    <div id="create-promotion-header">Promotion Information</div>
                    <Container fluid>
                        <Form>
                            <Row>
                                <Col xs={4}>
                                    <Form.Group controlId="formPromotionName">
                                        <Form.Label>Promotion Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter name of promotion" value={this.state.promotion?this.state.promotion.name:''} onChange={(e) => this.handleChange(e, "name")} />
                                    </Form.Group>
                                </Col>
                                <Col xs={{span: 4, offset:1}}>
                                    <Form.Group controlId="formExpiry">
                                        <Form.Label>Expiration Date</Form.Label>
                                        <Form.Control type="date" value={this.state.promotion?this.formatDate(this.state.promotion.expires):''} onChange={(e) => this.handleChange(e, "expires")} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4}>
                                    <Form.Group controlId="formPromotionType">
                                        <Form.Label>Promotion Type</Form.Label>
                                        <Form.Control as="select" custom value={this.state.promotion?this.state.promotion.deal_type:''} onChange={(e) => this.handleChange(e, "deal_type")}>
                                            <option value="%">% Off</option>
                                            <option value="$">$ Off</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={{span: 4, offset:1}}>
                                    <Form.Label>Promotion Value</Form.Label>
                                    <InputGroup>
                                            <Form.Control
                                            id="formPromotionValue" 
                                            type="number"
                                            placeholder="Enter value"
                                            aria-label="promotionValue"
                                            aria-describedby="promotion-value" 
                                            value={this.state.promotion?this.state.promotion.deal_value:''} 
                                            onChange={(e) => this.handleChange(e, "deal_value")}
                                            />
                                            {this.state.promotion&&this.state.promotion.deal_type?(<InputGroup.Append>
                                                <InputGroup.Text id="promotion-value">{this.state.promotion.deal_type}</InputGroup.Text>
                                            </InputGroup.Append>):''}
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row className="create-promotion-section-header">
                                <Col><Form.Label>Target Audience</Form.Label></Col>
                            </Row>
                            <Row>
                                <Col xs={4}>
                                    <div key="default-checkbox" >
                                        <Form.Check 
                                            type="checkbox"
                                            id="formToplistFriends"
                                            label="Friends of users whose top lists you appear in" 
                                            checked={this.state.promotion?this.state.promotion.top_list_user_friends:false} 
                                            onChange={(e) => this.handleChange(e, "top_list_user_friends")}
                                        />
                                    </div>
                                </Col>
                                <Col xs={{span: 4, offset:1}}>
                                    <div key="default-checkbox" >
                                        <Form.Check 
                                            type="checkbox"
                                            id="formFirstTimeCustomers"
                                            label="First-time customers"  
                                            checked={this.state.promotion?this.state.promotion.first_timers:false} 
                                            onChange={(e) => this.handleChange(e, "first_timers")}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4}>
                                    <div key="default-checkbox" >
                                        <Form.Check 
                                            type="checkbox"
                                            id="formFollowers"
                                            label="Users who follow your business" 
                                            checked={this.state.promotion?this.state.promotion.followers:false} 
                                            onChange={(e) => this.handleChange(e, "followers")}
                                        />
                                    </div>
                                </Col>
                                <Col xs={{span: 4, offset:1}}>
                                    <div key="default-checkbox" >
                                        <Form.Check 
                                            type="checkbox"
                                            id="formTopCustomers"
                                            label="Top customers*" 
                                            checked={this.state.promotion?this.state.promotion.top_customers:false} 
                                            onChange={(e) => this.handleChange(e, "top_customers")}
                                        />
                                        <Form.Text className="text-muted">
                                            *Top 20% of customers based on average spend and nnumber of visits. You can adjust this in your settings.
                                        </Form.Text>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4}>
                                    <div key="default-checkbox" >
                                        <Form.Check 
                                            type="checkbox"
                                            id="formTopListUsers"
                                            label="Users whose top lists you appear in" 
                                            checked={this.state.promotion?this.state.promotion.top_list_users:false} 
                                            onChange={(e) => this.handleChange(e, "top_list_users")}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="create-promotion-section-header">
                                <Col xs={4}>
                                    <Form.Label>Within Radius</Form.Label>
                                    <InputGroup>
                                            <Form.Control
                                            id="formPromotionRadius" 
                                            type="number"
                                            placeholder="Enter radius"
                                            aria-label="Radius"
                                            aria-describedby="promotion-radius"
                                            value={this.state.promotion?this.state.promotion.radius:''} 
                                            onChange={(e) => this.handleChange(e, "radius")}
                                            />
                                            <InputGroup.Append>
                                                <InputGroup.Text id="promotion-radius">miles</InputGroup.Text>
                                            </InputGroup.Append>
                                    </InputGroup>
                                </Col>
                                <Col xs={{span: 4, offset:1}}>
                                    <Form.Group controlId="formPromotionPreferredInterests">
                                        <Form.Label>Preferred Interests</Form.Label>
                                        <Form.Control type="text" placeholder="Enter interests separated by comma" value={this.state.promotion?this.state.promotion.preferred_interests:''} onChange={(e) => this.handleChange(e, "preferred_interests")} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="align-text-center">
                                    <button className="green-button" onClick={() => this.saveDeal()}>{this.state.promotion?'Save':'Create'}</button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </div>
            </section>
        )
    }
}

export default withRouter(CreatePromotion);