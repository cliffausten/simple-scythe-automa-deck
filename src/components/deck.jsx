import React, {Component} from 'react';
import Card from './card';

const deck = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]  ;

export default class Deck extends Component {
    constructor()
    {
        super();
        this.state = {
            id : 0,
            shuffledDeck : this.shuffle(deck),
            rotate: 1
        }
    }

    render()
    {
        return (
            <div>
                <Card id={this.state.id} rotate={this.state.rotate} onClick={() => this.onCardClick()}/>
                <div>   
                    <button onClick={() => this.onRotateClick()}>Rotate</button>        
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