import React from 'react';
import { withRouter } from "react-router";
import { Redirect } from 'react-router-dom';
import './CreateGiftDeal.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import fire from '../config';

class CreateGiftDeal extends React.Component {
    state = {
        giftDeal: null,
        redirect: false
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getGiftDealData(id);
    }

    getGiftDealData(id) {
        if(id==="new"){
            return;
        }
        fire.database().ref('giftDeal').on('value', (snapshot) => {
            let giftDeal = snapshot.val();
            this.setState({giftDeal: giftDeal, redirect: false});
        });
    }

    handleChange(event, field) {
        let emptyGiftDealObj = {
            deal_type: '',
            deal_value: '',
            friends_limit: ''
        };
        let giftDealCopy = this.state.giftDeal?JSON.parse(JSON.stringify(this.state.giftDeal)):emptyGiftDealObj;
        if(event.target.id==="formGiftType"){
            giftDealCopy[field] = event.target.value;
        }
        else if(event.target.id==="formGiftValue"){
            giftDealCopy[field] = event.target.value;
        }
        else if(event.target.id==="formGiftLimit"){
            giftDealCopy[field] = event.target.value;
        }
        this.setState({giftDeal: giftDealCopy, redirect: false});
    }

    saveGiftDeal() {
        let promotions = JSON.parse(localStorage.getItem("promotions"));
        let editedGiftDeal = JSON.parse(JSON.stringify(this.state.giftDeal));
        editedGiftDeal.name = editedGiftDeal.deal_type==="$"?`$${editedGiftDeal.deal_value} off for ${editedGiftDeal.friends_limit} friends`:`${editedGiftDeal.deal_value}% off for ${editedGiftDeal.friends_limit} friends`;
        editedGiftDeal.start_date = new Date().getTime();
        editedGiftDeal.total_customers = 300;
        editedGiftDeal.total_friends = 180;
        editedGiftDeal.total_used = 110;
        editedGiftDeal.gift_deal_senders = 70;
        promotions.giftDeal = editedGiftDeal;
        fire.database().ref('giftDeal').set(editedGiftDeal);
        this.setState({redirect: true});
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/promotions' />
        }
    }

    render() {
        return (
            <section id="create-gift-deal-page">
                {this.renderRedirect()}
                <div className="create-promotions-header">
                    Gift Deals
                </div>

                <div id="create-promotion-form">
                    <div id="create-promotion-header">Promotion Information</div>
                    <Container fluid>
                        <Form>
                            <Row>
                                <Col xs={4}>
                                    <Form.Group controlId="formGiftType">
                                        <Form.Label>Promotion Type</Form.Label>
                                        <Form.Control as="select" custom value={this.state.giftDeal?this.state.giftDeal.deal_type:''} onChange={(e) => this.handleChange(e, "deal_type")}>
                                            <option value="%">% Off</option>
                                            <option value="$">$ Off</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={{span: 4, offset:1}}>
                                    <Form.Label>Promotion Value</Form.Label>
                                    <InputGroup>
                                            <Form.Control
                                            id="formGiftValue" 
                                            type="number"
                                            placeholder="Enter value"
                                            aria-label="formGiftValue"
                                            aria-describedby="form-gift-value" 
                                            value={this.state.giftDeal?this.state.giftDeal.deal_value:''} 
                                            onChange={(e) => this.handleChange(e, "deal_value")}
                                            />
                                            {this.state.giftDeal&&this.state.giftDeal.deal_type?(<InputGroup.Append>
                                                <InputGroup.Text id="promotion-value">{this.state.giftDeal.deal_type}</InputGroup.Text>
                                            </InputGroup.Append>):''}
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4}>
                                    <Form.Group controlId="formGiftLimit">
                                        <Form.Label>Number of Friends</Form.Label>
                                        <Form.Control type="number" value={this.state.giftDeal?this.state.giftDeal.friends_limit:''} onChange={(e) => this.handleChange(e, "friends_limit")} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="align-text-center">
                                    <button className="green-button" onClick={() => this.saveGiftDeal()}>Create</button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </div>
            </section>
        )
    }
}

export default withRouter(CreateGiftDeal);