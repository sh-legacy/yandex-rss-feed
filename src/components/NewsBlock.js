import React, {useCallback, useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import axios from 'axios';
import Spinner from "react-bootstrap/Spinner";
import {CSSTransition, SwitchTransition} from "react-transition-group";

function NewsBlock() {

    const [initialized, setInitialized] = useState(false);
    const [feeds, setFeeds] = useState({});
    const [selected, setSelected] = useState(0);


    const topics = [
        { label: "Главное", url: "https://news.yandex.ru/index.rss"},
        { label: "Республика Крым", url: "https://news.yandex.ru/Republic_of_Crimea/index.rss"},
        { label: "Политика", url: "https://news.yandex.ru/politics.rss"},
        { label: "Общество", url: "https://news.yandex.ru/society.rss"},
        { label: "Экономика", url: "https://news.yandex.ru/business.rss"},
        { label: "В мире", url: "https://news.yandex.ru/world.rss"},
        //{ label: "Спорт", url: "https://news.yandex.ru/sport.rss"},
        { label: "Происшествия", url: "https://news.yandex.ru/incident.rss"},
        { label: "Культура", url: "https://news.yandex.ru/culture.rss"},
        { label: "Технологии", url: "https://news.yandex.ru/computers.rss"},
        { label: "Наука", url: "https://news.yandex.ru/science.rss"},
        { label: "Авто", url: "https://news.yandex.ru/auto.rss"},
    ];

    // function loadTopic(topicIndex) {
    //     axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${topics[topicIndex].url}`).then(response => {
    //         setFeeds({...feeds, [topicIndex]: response.data});
    //
    //         //feedsStore.setFeeds(feedsStore.feeds);
    //         //console.log(feedsStore.feeds[feedsStore.selected]);
    //     });
    //     return true;
    // }


    const getFeeds = useCallback(() => {
        let obj = {};
        let promises = [];
        topics.forEach((topic, index) => {
            //setFeeds(JSON.parse(mockFeeds));
            promises.push(axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${topic.url}&api_key=ntxujxctwiheixh7khx9fdg754kughlrjebs2aa9`).then((response) => {
                obj[index] = response.data;
            }));
        });

        return Promise.all(promises).then(() => {
            setFeeds(obj);
            //console.log(JSON.stringify(obj));
        });
    }, [topics]);

    useEffect(() => {
        if (!initialized) {
            getFeeds();

            setInitialized(true);
        }
        }, [initialized, getFeeds]);

    const [rerender, setRerender] = useState(1);

    const storage = window.localStorage;

    //console.log("FEEEE: ", feeds[selected], feeds);

    return (
        <Card className="news-block">
            <Card.Title>Сейчас в СМИ</Card.Title>
            { !feeds[selected] && <div className="loading-container"><Spinner animation="border" variant="warning"></Spinner></div>}
            { feeds[selected] && <Card.Body>
                <ul className="topics-list">
                    { topics.map( (topic, index) => {
                        return <li key={index} onClick={(e) => {
                            setSelected(index);
                            let el = document.querySelector('.news-block .topics-list .topic-selector');
                            el.style.marginLeft = e.target.offsetLeft + "px";
                            el.style.width = e.target.offsetWidth + "px";
                            //console.log(e.target.offsetLeft, e.target.offsetWidth)
                        }} className={(selected === index && "selected") || ""}>{topic.label}</li>
                    })}
                    <span className="topic-selector"></span>
                </ul>
                <SwitchTransition>
                    <CSSTransition key={selected} addEndListener={(node, done) => node.addEventListener("transitionend", done, false)} classNames='fade'>
                        <ul className="news-list">
                            {feeds[selected].items.map((item, index) => {
                                return <li className={((rerender + 1) && !storage.getItem(item.guid) && "unread") || ""}
                                           key={index} onClick={() => {
                                    setRerender(Math.random);
                                    storage.setItem(item.guid, true)
                                }}><a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a></li>;
                            })}
                        </ul>
                    </CSSTransition>
                </SwitchTransition>
                <a className="all-news-link" href={feeds[selected].feed.link} target="_blank" rel="noopener noreferrer">Все новости</a>
            </Card.Body>}
        </Card>
    );
}

export default NewsBlock;