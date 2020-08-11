import React, {useCallback, useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import axios from 'axios';
import Spinner from "react-bootstrap/Spinner";

function CurrencyRatesBlock() {
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const currToGet = ['USD', 'EUR', 'INR'];
    const [initialized, setInitialized] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const [date, setDate] = useState('');

    const getRates = useCallback(() => {
        axios.get("https://www.cbr-xml-daily.ru/daily_json.js").then((response) => {
            let tmpDate = new Date(response.data.Date);
            //console.log(tmpDate.getMonth());
            setDate(tmpDate.getDate() + " " + months[tmpDate.getMonth()]);
            //console.log(currDate);

            setCurrencies(Object.values(response.data.Valute).filter(valute => currToGet.includes(valute.CharCode)));
        });
    }, [currToGet, months]);

    useEffect(() => {
        if (!initialized) {
            getRates();

            setInitialized(true);
        }
    }, [initialized, getRates]);

    return (
        <Card className="currency-rates-block">
            <Card.Title>Котировки</Card.Title>
            {!currencies.length && <div className="loading-container"><Spinner animation="border" variant="warning"></Spinner></div>}
            {!!currencies.length && <Card.Body>
                <ul className="rates-list">
                    { currencies.map((currency, index) => {
                        let diff = currency.Value - currency.Previous;
                        diff = (Math.round((diff + Number.EPSILON) * 100) / 100).toFixed(2);
                        let val = currency.Value;
                        val = (Math.round((val + Number.EPSILON) * 100) / 100).toFixed(2);

                        // console.log("DATE HERE", date);

                        return (<li key={index}>
                            <div className="currency-descr">
                                <h5>{currency.CharCode} ЦБ</h5>
                                <p>{date}</p>
                            </div>
                            <div className="currency-value">
                                <h5>{val} ₽</h5>
                                <p className={diff > 0 ? "green" : "red"}>{diff > 0 ? `+${diff}` : diff}</p>
                            </div>
                        </li>);
                    }) }
                </ul>
            </Card.Body>}
        </Card>
    );
}

export default CurrencyRatesBlock;