import React, {Component} from 'react';
import Card from './card';
import Button from '@material-ui/core/Button';

const deck = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19] ;

export default class Deck extends Component {
    constructor()
    {
        super();
        this.state = {
            id : 0,
            shuffledDeck : this.shuffle(deck),
            rotate: 1,
            battle: false
        }
    }

    render()
    {
        return (
            <div>
                <Card id={this.state.id} rotate={this.state.rotate} battle={this.state.battle} onClick={() => this.onCardClick()}/>
                <div>   
                    <Button variant="contatined" color="primary" onClick={() => this.onRotateClick()}>Rotate</Button>
                    <Button variant="contatined" color="primary" onClick={() => this.onBattleClick()}>Battle</Button>                
                </div>
            </div>
        );
    }

    onRotateClick()
    {
        console.log('onRotateClick');
        this.setState(
            {
                rotate: this.state.rotate *-1
            }
        )
    }

    onCardClick()
    {
        console.log('oncardclick');

        let shuffledDeck = this.state.shuffledDeck;
        let card = 0;

        if(shuffledDeck.length > 0)
            card = shuffledDeck.pop();

        this.setState({
            id:card,
            shuffledDeck: shuffledDeck
        })
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
}