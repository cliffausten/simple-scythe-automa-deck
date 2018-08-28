import React, {Component} from 'react';
import CardBack from '../images/Back.png';
import Card1 from '../images/1.png';
import Card2 from '../images/2.png';
import Card3 from '../images/3.png';
import Card4 from '../images/4.png';
import Card5 from '../images/5.png';
import Card6 from '../images/6.png';
import Card7 from '../images/7.png';
import Card8 from '../images/8.png';
import Card9 from '../images/9.png';
import Card10 from '../images/10.png';
import Card11 from '../images/11.png';
import Card12 from '../images/12.png';
import Card13 from '../images/13.png';
import Card14 from '../images/14.png';
import Card15 from '../images/15.png';
import Card16 from '../images/16.png';
import Card17 from '../images/17.png';
import Card18 from '../images/18.png';
import Card19 from '../images/19.png';
import '../css/deck.css';

const deck = [
    CardBack,
    Card1,
    Card2,
    Card3,
    Card4,
    Card5,
    Card6,
    Card7,
    Card8,
    Card9,
    Card10,
    Card11,
    Card12,
    Card13,
    Card14,
    Card15,
    Card16,
    Card17,
    Card18,
    Card19
]

export default class Card extends Component {
    render()
    {
        let cssclass = 'card';
        
        if(this.props.battle) 
            cssclass += ' cardBattle';
        else if(this.props.rotate < 0) 
            cssclass+= ' cardRotate'; 

        return <div>
            <img src={deck[this.props.id]} onClick={this.props.onClick} className={cssclass}/>
        </div>;
    }
}