import React, {useContext} from 'react';
// import { Link } from "react-router-dom";
import './Promotions.scss';
import { Link } from "react-router-dom";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import {useAccordionToggle} from 'react-bootstrap/AccordionToggle';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import infoIcon from '../assets/img/info.png';
import ReactEcharts from 'echarts-for-react';
import fire from '../config';

class Promotions extends React.Component {
    state  = {
        currentPromotions: null,
        previousPromotions: null,
        selectedTab: "performance",
        giftDeal: null,
        loadedContent: false,
        activeKey: ""
    };

    componentDidMount() {
        let databaseRef = fire.database().ref('/');
        databaseRef.on('value', (snapshot) => {
            console.log("snap", snapshot.val());
            let currentPromotions = snapshot.val().current;
            let previousPromotions = snapshot.val().previous;
            let giftDeal = snapshot.val().giftDeal;
            this.setState({currentPromotions: currentPromotions, previousPromotions: previousPromotions, selectedTab: "performance", giftDeal: giftDeal, loadedContent: true});
        });
    }

    performanceOptionsNewVsRepeat = {
        title: {
            text: 'New vs Repeat Customers'
        },
        tooltip: {
            backgroundColor: "#ffffff",
            textStyle: {
                color: "#000000"
            },
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            },
            borderColor: "f6f4f4"
        },
        legend: {
            data: ['New Customers', 'Returning customers'],
            inactiveColor: "#c4c4c4",
            icon: "pin"
        },
        toolbox: {
            feature: {
                saveAsImage: {
                    title: 'Save as image'
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['Mon (7/6)', 'Tue (7/7)', 'Wed (7/8)', 'Thu (7/9)', 'Fri (7/10)', 'Sat (7/11)', 'Sun (7/12)']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'New Customers',
                type: 'line',
                stack: 'All Customers',
                areaStyle: {},
                data: [2, 1, 3, 2, 6, 4, 0]
            },
            {
                name: 'Returning customers',
                type: 'line',
                stack: 'All Customers',
                areaStyle: {},
                data: [39, 45, 23, 36, 30, 54, 60]
            }
        ],
        color: ['#287554', '#7aa893', '#8eb5a4', '#a3c2b5', '#f6f4f4', '#dedede', '#c4c4c4'],
        extraCssText: 'box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.8);'
    };

    performanceOptionsWithVsWithoutDeals = {
        title: {
            text: 'Customers with deals vs Without Deals'
        },
        tooltip: {
            backgroundColor: "#ffffff",
            textStyle: {
                color: "#000000"
            },
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            },
            borderColor: "f6f4f4"
        },
        legend: {
            data: ['With Deals', 'Without Deals'],
            inactiveColor: "#c4c4c4",
            icon: "pin"
        },
        toolbox: {
            feature: {
                saveAsImage: {
                    title: 'Save as image'
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['Mon (7/6)', 'Tue (7/7)', 'Wed (7/8)', 'Thu (7/9)', 'Fri (7/10)', 'Sat (7/11)', 'Sun (7/12)']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'With Deals',
                type: 'line',
                stack: 'All Customers',
                areaStyle: {},
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Without Deals',
                type: 'line',
                stack: 'All Customers',
                areaStyle: {},
                data: [220, 182, 191, 234, 290, 330, 310]
            }
        ],
        color: ['#287554', '#7aa893', '#8eb5a4', '#a3c2b5', '#f6f4f4', '#dedede', '#c4c4c4'],
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
    };

    projectionOptionsNewVsRepeat = {
        title: {
            text: 'New vs Repeat Customers'
        },
        tooltip: {
            backgroundColor: "#ffffff",
            textStyle: {
                color: "#000000"
            },
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            },
            borderColor: "f6f4f4"
        },
        legend: {
            data: ['New Customers', 'Returning customers'],
            inactiveColor: "#c4c4c4",
            icon: "pin"
        },
        toolbox: {
            feature: {
                saveAsImage: {
                    title: 'Save as image'
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['Mon (7/13)', 'Tue (7/14)', 'Wed (7/15)', 'Thu (7/16)', 'Fri (7/17)', 'Sat (7/18)', 'Sun (7/19)']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'New Customers',
                type: 'line',
                stack: 'All Customers',
                areaStyle: {},
                data: [3, 2, 1, 3, 2, 9, 5]
            },
            {
                name: 'Returning customers',
                type: 'line',
                stack: 'All Customers',
                areaStyle: {},
                data: [23, 34, 18, 25, 39, 55, 48]
            }
        ],
        color: ['#287554', '#7aa893', '#8eb5a4', '#a3c2b5', '#f6f4f4', '#dedede', '#c4c4c4'],
        extraCssText: 'box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.8);'
    };

    projectionOptionsWithVsWithoutDeals = {
        title: {
            text: 'Customers with deals vs Without Deals'
        },
        tooltip: {
            backgroundColor: "#ffffff",
            textStyle: {
                color: "#000000"
            },
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            },
            borderColor: "f6f4f4"
        },
        legend: {
            data: ['With Deals', 'Without Deals'],
            inactiveColor: "#c4c4c4",
            icon: "pin"
        },
        toolbox: {
            feature: {
                saveAsImage: {
                    title: 'Save as image'
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['Mon (7/6)', 'Tue (7/7)', 'Wed (7/8)', 'Thu (7/9)', 'Fri (7/10)', 'Sat (7/11)', 'Sun (7/12)']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'With Deals',
                type: 'line',
                stack: 'All Customers',
                areaStyle: {},
                data: [20, 35, 12, 25, 47, 55, 35]
            },
            {
                name: 'Without Deals',
                type: 'line',
                stack: 'All Customers',
                areaStyle: {},
                data: [15, 36, 23, 41, 12, 54, 33]
            }
        ],
        color: ['#287554', '#7aa893', '#8eb5a4', '#a3c2b5', '#f6f4f4', '#dedede', '#c4c4c4'],
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
    };

    giftDealFunnelChartInfo = {
        legend: {
            data: ['Total gift deals sent to customers','Total gift deals customers sent to friends','Total gift deals used','Number of users who sent a gift deal after using one'],
            show:  false
        },
        color: ['#515050', '#717171', '#999999', '#DCDCDC'],
        series: [
            {
                type:'funnel',
                left: '45%',
                top: 0,
                //x2: 80,
                bottom: 0,
                width: '50%',
                // height: {totalHeight} - y - y2,
                min: 0,
                max: 300,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                    show: true,
                    position: 'left',
                    color: "#000000",
                    align: 'left',
                    fontSize: '16',
                    formatter: "{c} ({d}%)"
                },
                labelLine: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid',
                        color: "#000000"
                    }
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                // emphasis: {
                //     label: {
                //         fontSize: 20
                //     }
                // },
                data: [
                    {value: 300, name: 'Total gift deals sent to customers'},
                    {value: 180, name: 'Total gift deals customers sent to friends'},
                    {value: 110, name: 'Total gift deals used'},
                    {value: 70, name: 'Number of users who sent a gift deal after using one'}
                ]
            }
        ]
    };

    endDeal(promotion) {
        promotion.id = `p${this.state.previousPromotions.length}`;
        promotion.end_date = new Date().getTime();
        let updatedCurrentPromotions = JSON.parse(JSON.stringify(this.state.currentPromotions)).filter(p => p.id!==promotion.id);
        let updatedPreviousPromotions = JSON.parse(JSON.stringify(this.state.previousPromotions));
        updatedPreviousPromotions.push(promotion);
        let updatedPromotions = {
            current: updatedCurrentPromotions,
            previous: updatedPreviousPromotions
        }
        fire.database().ref('current').set(updatedCurrentPromotions);
        fire.database().ref('previous').set(updatedPreviousPromotions);

        this.setState({currentPromotions: updatedPromotions.current, previousPromotions: updatedPromotions.previous, selectedTab: "performance", loadedContent: true, activeKey: ""});
    }

    changeTab(tabName) {
        this.setState({currentPromotions: this.state.currentPromotions, previousPromotions: this.state.previousPromotions, selectedTab: tabName, loadedContent: true});
    }

    handleAccordionSelect(activeKey) {
        this.setState({activeKey: activeKey});
    }

    render() {

        function generateSentToString(promotion) {
            let sentTo = ''
            if(promotion.followers) {
                sentTo += 'Followers';
            }
            if(promotion.top_list_users) {
                sentTo += sentTo?' | Users who included your business on their top list':'Users who included your business on their top list';
            }
            if(promotion.top_list_user_friends) {
                sentTo += sentTo?' | Friends of users who included your business on their top list':'Friends of users who included your business on their top list';
            }
            if(promotion.new_customers) {
                sentTo += sentTo?' | First-time customers':'First-time customers';
            }
            if(promotion.top_customers) {
                sentTo += sentTo?' | Top customers':'Top customers';
            }
            return sentTo?sentTo:'You did not choose any filters for this promotion';
        }

        function formatDate(dateObj) {
            if(!dateObj) {
                return "Ongoing";
            }
            if(typeof(dateObj)==='string'||typeof(dateObj)==='number') {
                dateObj = new Date(dateObj);
            }
            var options = { year: 'numeric', month: 'short', day: 'numeric' };
            return dateObj.toLocaleDateString("en-US", options);
        }

        function ContextAwareToggle({ promotion, eventKey, callback }) {
            const currentEventKey = useContext(AccordionContext);
            const decoratedOnClick = useAccordionToggle(
              eventKey,
              () => callback && callback(eventKey),
            );
          
            const isCurrentEventKey = currentEventKey === eventKey;
          
            return (
                <Container fluid onClick={decoratedOnClick} className="cursor-pointer">
                    <Row>
                        <Col>{promotion.name}</Col>
                        <Col xs={5}>{promotion.targeted} Targeted</Col>
                        <Col className="right-align"><span className="padding-right-1">{formatDate(promotion.start_date)} - {formatDate(promotion.end_date)}</span>
                            {isCurrentEventKey ?(<i className="fas fa-caret-up toggle-caret"></i>):(<i className="fas fa-caret-down toggle-caret"></i>)}
                        </Col>
                    </Row>
                </Container>
            );
        }

        function ContextAwareGiftToggle({ giftDeal, eventKey, callback }) {
            const currentEventKey = useContext(AccordionContext);
            const decoratedOnClick = useAccordionToggle(
              eventKey,
              () => callback && callback(eventKey),
            );
          
            const isCurrentEventKey = currentEventKey === eventKey;
          
            return (
                <Container fluid onClick={decoratedOnClick} className="cursor-pointer">
                    <Row>
                        <Col>{giftDeal.name}</Col>
                        <Col className="right-align"><span className="padding-right-1">{formatDate(giftDeal.start_date)} - Ongoing</span>
                            {isCurrentEventKey ?(<i className="fas fa-caret-up toggle-caret"></i>):(<i className="fas fa-caret-down toggle-caret"></i>)}
                        </Col>
                    </Row>
                </Container>
            );
        }
        
        return (
            <section id="promotions">
                <div className="promotions-header">
                    Gift Deals
                    <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={<Tooltip id="tooltip-right">Deals that customers send to friends</Tooltip>}>
                        <img src={infoIcon} alt="info icon" className="info-icon" />
                    </OverlayTrigger>
                </div>
                {!this.state.giftDeal&&this.state.loadedContent&&
                (<button className="green-button">
                    <Link to={"/promotions/gift-deal/new"}>+Create</Link>
                </button>)}
                {!this.state.loadedContent&&(
                    <div className="loading-create-button"></div>
                )}

                {this.state.loadedContent&&this.state.giftDeal?
                (<Accordion>
                    <Card>
                        <Card.Header>
                            <ContextAwareGiftToggle eventKey="0" giftDeal={this.state.giftDeal}></ContextAwareGiftToggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <Container fluid>
                                        <Row>
                                            <Col xs={9}>
                                            <ReactEcharts option={this.giftDealFunnelChartInfo} />
                                            </Col>
                                            <Col>
                                                <button className="green-outline-button">
                                                    <Link to={"/promotions/gift-deal/edit"}>Edit Deal</Link>
                                                </button>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>):
                (<div className="loading-row">
                </div>)
                }

                <div className="promotions-header margin-top-1">Merchant Promotions</div>
                {this.state.loadedContent?(<button className="green-button">
                    <Link to={"/promotions/new"}>+Create</Link>
                </button>)
                :
                (
                    <div className="loading-create-button"></div>
                )}

                {this.state.currentPromotions?(<Accordion activeKey={this.state.activeKey} onSelect={(e) => this.handleAccordionSelect(e)}>
                    {this.state.currentPromotions.map((promotion, index) => {
                        return (
                            <Card key={index}>
                                <Card.Header>
                                    <ContextAwareToggle eventKey={index+''} promotion={promotion}></ContextAwareToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={index+''}>
                                    <Container fluid>
                                        <Card.Body>
                                            <Row>
                                                <Col className="bg-grey1 margin-right-1" xs={3}>
                                                    <div>Deal Details</div>
                                                    <div className="deal-details-content">{promotion.deal_details}</div>
                                                </Col>
                                                <Col className="bg-grey1 margin-right-1" xs={6}>
                                                    <div>Sent To</div>
                                                    <div className="sent-to-content">{generateSentToString(promotion)}</div>
                                                </Col>
                                                <Col>
                                                    <button className="green-outline-button">
                                                        <Link to={`/promotions/${promotion.id}`}>Edit Deal</Link>
                                                    </button>
                                                </Col>
                                            </Row>
                                            <Row className="margin-top-1">
                                                <Col className="bg-grey1 padding-right-1" xs={1}>
                                                    <div>Statistics</div>
                                                </Col>
                                                <Col className="bg-grey1 padding-right-1" xs={2}>
                                                    <div>Views</div>
                                                    <div className="statistics-content">{promotion.views}</div>
                                                </Col>
                                                <Col className="bg-grey1 padding-right-1" xs={2}>
                                                    <div>Clicks</div>
                                                    <div className="statistics-content">{promotion.clicks}</div>
                                                </Col>
                                                <Col className="bg-grey1 padding-right-1" xs={2}>
                                                    <div>New Customers</div>
                                                    <div className="statistics-content">{promotion.new_customers}</div>
                                                </Col>
                                                <Col className="bg-grey1 last-statistic" xs={2}>
                                                    <div>Total Spend</div>
                                                    <div className="statistics-content">${promotion.total_spend}</div>
                                                </Col>
                                                <Col>
                                                    <button className="green-outline-button" onClick={() => this.endDeal(promotion)}>End Deal</button>
                                                </Col>
                                            </Row>
                                            <Row className="tabs-row">
                                                <Col className="color-grey3">
                                                    <span className={this.state.selectedTab==="performance"?"color-black":""} onClick={() => this.changeTab("performance")}>Performance</span> | <span className={this.state.selectedTab==="projection"?"color-black":""} onClick={() => this.changeTab("projection")}>Projection</span>
                                                </Col>
                                            </Row>
                                            <Row className="margin-top-1">
                                                <Col>
                                                <ReactEcharts
                                                option={this.state.selectedTab==="performance"?this.performanceOptionsNewVsRepeat:this.projectionOptionsNewVsRepeat} />
                                                </Col>
                                            </Row>
                                            <Row className="margin-top-1">
                                                <Col>
                                                <ReactEcharts
                                                option={this.state.selectedTab==="performance"?this.performanceOptionsWithVsWithoutDeals:this.projectionOptionsWithVsWithoutDeals} />
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Container>
                                </Accordion.Collapse>
                            </Card>
                        );
                    })}
                </Accordion>):
                (<div>
                    <div className="loading-row"></div>
                    <div className="loading-row"></div>
                    <div className="loading-row"></div>
                </div>)}

                <div className="promotions-header margin-top-1">Previous Promotions</div>

                {this.state.previousPromotions?(<Accordion>
                    {this.state.previousPromotions.map((promotion, index) => {
                        return (
                            <Card key={index}>
                                <Card.Header>
                                    <ContextAwareToggle eventKey={index+''} promotion={promotion}></ContextAwareToggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={index+''}>
                                    <Container fluid>
                                        <Card.Body>
                                            <Row>
                                                <Col className="bg-grey1 margin-right-1" xs={3}>
                                                    <div>Deal Details</div>
                                                    <div className="deal-details-content">{promotion.deal_details}</div>
                                                </Col>
                                                <Col className="bg-grey1 margin-right-1" xs={6}>
                                                    <div>Sent To</div>
                                                    <div className="sent-to-content">{generateSentToString(promotion)}</div>
                                                </Col>
                                            </Row>
                                            <Row className="margin-top-1">
                                                <Col className="bg-grey1 padding-right-1" xs={1}>
                                                    <div>Statistics</div>
                                                </Col>
                                                <Col className="bg-grey1 padding-right-1" xs={2}>
                                                    <div>Views</div>
                                                    <div className="statistics-content">{promotion.views}</div>
                                                </Col>
                                                <Col className="bg-grey1 padding-right-1" xs={2}>
                                                    <div>Clicks</div>
                                                    <div className="statistics-content">{promotion.clicks}</div>
                                                </Col>
                                                <Col className="bg-grey1 padding-right-1" xs={2}>
                                                    <div>New Customers</div>
                                                    <div className="statistics-content">{promotion.new_customers}</div>
                                                </Col>
                                                <Col className="bg-grey1 last-statistic" xs={2}>
                                                    <div>Total Spend</div>
                                                    <div className="statistics-content">${promotion.total_spend}</div>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Container>
                                </Accordion.Collapse>
                            </Card>
                        );
                    })}
                </Accordion>):
                (
                    <div>
                        <div className="loading-row"></div>
                        <div className="loading-row"></div>
                        <div className="loading-row"></div>
                    </div>
                )}
            </section>
        )
    }
}

export default Promotions;