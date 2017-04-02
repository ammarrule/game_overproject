import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GameList from './components/GameList';
import SearchResult from './components/SearchResult';
import About from './components/About';
import News from './components/News';
import Graphs from './components/Graphs';
import './index.css';
import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';

const games = [
   {
        name: 'For Honor',
        deck: 'A third-person melee-focused game featuring knights, samurai, and vikings going to war with each other.',
        image:'https://upload.wikimedia.org/wikipedia/en/d/d5/For_Honor_cover_art.jpg',
        metarating:'77',
        gsrating: '8.5',
        price: '$35.00',
        priceLink: 'https://www.amazon.com/Honor-PlayStation-4/dp/B00ZJBT2AO%3Fpsc%3D1%26SubscriptionId%3DAKIAIGDJ75UVPLJ6HYAA%26tag%3Dgamespot-vg-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00ZJBT2AO?th=1'
    },

    {
        name: 'Overwatch',
        deck: 'A stylish sci-fi team-based first-person shooter from Blizzard in which players can choose from over 20 "action figure"-esque Heroes, each with their own unique weapons and abilities.',
        image: 'http://imgc.allpostersimages.com/images/P-473-488-90/96/9683/3PTC500Z/posters/overwatch-game-cover.jpg',
        metarating: '91',
        gsrating: '9',
        price: '$34.30',
        priceLink: 'https://www.amazon.com/Overwatch-Origins-PC/dp/B017L187YG%3Fpsc%3D1%26SubscriptionId%3DAKIAIGDJ75UVPLJ6HYAA%26tag%3Dgamespot-vg-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB017L187YG?th=1'
    },

    {
        name: 'Fifa 17',
        deck:'EA\'s association football game for 2016 runs on the Frostbite engine.',
        image: 'https://sanjose-mp7static.mlsdigital.net/elfinderimages/wondo_fifa_17.png',
        metarating: '84',
        gsrating: '9',
        price: '$25.99',
        priceLink: 'https://www.amazon.com/FIFA-17-PlayStation-4/dp/B01GKH5Q9G%3Fpsc%3D1%26SubscriptionId%3DAKIAIGDJ75UVPLJ6HYAA%26tag%3Dgamespot-vg-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB01GKH5Q9G'
    },

    {
        name: 'Mafia III',
        deck: 'The third game in the open world crime series. Mafia III follows Vietnam veteran, mixed-race Lincoln Clay in 1960s New Bordeaux, when racism is blooming, as he aspires for revenge against those who have harmed his family.',
        image: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Mafia_III_cover_art.jpg',
        metarating: '62',
        gsrating: '6',
        price: '$20.49',
        priceLink: 'https://www.amazon.com/Mafia-III-PlayStation-4/dp/B013H0IRO0%3Fpsc%3D1%26SubscriptionId%3DAKIAIGDJ75UVPLJ6HYAA%26tag%3Dgamespot-vg-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB013H0IRO0'        
    },
    
    {
        name: 'Battlefield 1',
        deck: 'The long-running Battlefield series goes even further back in time in the 15th installment, this time to the first World War.',
        image: 'https://upload.wikimedia.org/wikipedia/en/f/fc/Battlefield_1_cover_art.jpg',
        metarating: '88',
        gsrating: '9',
        price: '$25.98',
        priceLink: 'https://www.amazon.com/Battlefield-1-PlayStation-4/dp/B01F9HMO2K%3Fpsc%3D1%26SubscriptionId%3DAKIAIGDJ75UVPLJ6HYAA%26tag%3Dgamespot-vg-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB01F9HMO2K'
    },

    {
        name: 'Need for Speed',
        deck: 'Need for Speed attempts to reboot the franchise with a focus on nighttime street races, multiplayer action, police chases, and new ways for players to configure and tune their cars.',
        image: "https://s-media-cache-ak0.pinimg.com/originals/4c/f2/d4/4cf2d4cb49b3b8125dc17433f5f89756.jpg",
        metarating: '68',
        gsrating: '7',
        price: '$10.97',
        priceLink: 'https://www.amazon.com/Need-Speed-PlayStation-4/dp/B00XWQZP9K%3Fpsc%3D1%26SubscriptionId%3DAKIAIGDJ75UVPLJ6HYAA%26tag%3Dgamespot-vg-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00XWQZP9K'
    },

    {
        name: 'Dishonored 2',
        deck: 'Set fifteen years after the end of the first game, Dishonored 2 allows players to continue the story as either original protagonist Corvo Attano or his daughter and apprentice, the now-deposed Empress Emily Kaldwin.',
        image:'https://upload.wikimedia.org/wikipedia/en/5/5f/Dishonored_2_cover_art.jpg',
        metarating: '86',
        gsrating: '8',
        price: '$18.00',
        priceLink: 'https://www.amazon.com/Dishonored-2-Limited-PlayStation-4/dp/B00ZM5OXD8%3Fpsc%3D1%26SubscriptionId%3DAKIAIGDJ75UVPLJ6HYAA%26tag%3Dgamespot-vg-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00ZM5OXD8?th=1'
    },

    {
        name: "Grand Theft Auto V",
        deck: 'Grand Theft Auto V is a modern crime epic featuring a crew of three protagonists rolling through the diverse landscape of the fictional state of San Andreas.',
        image: 'https://media.rockstargames.com/rockstargames/img/global/news/upload/actual_1364906194.jpg',
        metarating: '96',
        gsrating: '9',
        price: '$15.49',
        priceLink: 'https://www.amazon.com/Grand-Theft-Auto-V-PlayStation-3/dp/B0050SXKU4%3FSubscriptionId%3DAKIAIGDJ75UVPLJ6HYAA%26tag%3Dgamespot-vg-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB0050SXKU4'
    },

    {
        name: 'Elder Scrolls V: Skyrim',
        deck: 'The fifth installment in Bethesda\'s Elder Scrolls franchise is set in the eponymous province of Skyrim, where the ancient threat of dragons, ledby the sinister Alduin, is rising again to threaten all mortal races. Only the player, as the prophesied hero the Dovahkiin, can save the world from destruction.',
        image: 'https://upload.wikimedia.org/wikipedia/en/1/15/The_Elder_Scrolls_V_Skyrim_cover.png',
        metarating: '94',
        gsrating: '9',
        price: '$10.99',
        priceLink: 'https://www.amazon.com/Elder-Scrolls-Skyrim-Legendary-XBOX-360/dp/B00CJ7IUGS%3Fpsc%3D1%26SubscriptionId%3DAKIAIGDJ75UVPLJ6HYAA%26tag%3Dgamespot-vg-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00CJ7IUGS?th=1'
    },

    {
        name: 'Attack on Titan',
        deck: 'Described as a "reverse Warriors game" by developer Koei Tecmo, this game based on the 2013 anime of the same name features legions of fighters battling the eponymous gigantic invaders, or the other way around.',
        image: 'http://www.3djuegos.com/juegos/12316/attack_on_titan/fotos/ficha/attack_on_titan-3354139.jpg',
        metarating: '74',
        gsrating: '6',
        price: '$30.00',
        priceLink: 'https://www.amazon.com/Attack-Titan-PlayStation-4/dp/B01EORDE48%3FSubscriptionId%3DAKIAIGDJ75UVPLJ6HYAA%26tag%3Dgamespot-vg-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB01EORDE48'
    }
]


ReactDOM.render((
    <Router history={browserHistory}>
        <Route games={games} path='/' component={App}>
            <Route games={games} path="/gamelist" component={GameList}/>
            <IndexRoute component={About}/>
            <Route path="/searchresult" component={SearchResult}/>
            <Route path="/news" component={News}/>
            <Route path="/graphs" component={Graphs}/>
        </Route>
    </Router>        
), document.getElementById('root'));