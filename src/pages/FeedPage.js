import React from 'react';
import { observer } from 'mobx-react';
import NewsBlock from "../components/NewsBlock";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CurrencyRatesBlock from "../components/CurrencyRatesBlock";

function FeedPage() {


    return (
        <Container>
            <Row>
                <Col>
                    <div className="logo-container">
                        <div className="yandex-logo"></div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <NewsBlock/>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <CurrencyRatesBlock/>
                </Col>
            </Row>
        </Container>
    );
}

export default observer(FeedPage);