import React, {Component} from 'react';
import update from 'immutability-helper';

import Deck from './deck';



import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

const deck = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19] ;

export default class DeckTabs extends Component {
    constructor(){
        super();

        this.state = {
            numberOfTabs: 1,
            currentTab: 0,
            decks: [
                {                
                    id : 0,
                    shuffledDeck : this.shuffle(deck),
                    rotate: 1,
                    battle: false             
                }
            ]
        }
    }

    render()
    {
        let currentDeck = this.state.decks[this.state.currentTab];

        let tabs = [];

        for(let i = 0; i < this.state.numberOfTabs;i++)
            tabs.push(<Tab label={"Automa " + (i+1)}/>);

        tabs.push(<Tab label="+"/>);    

        return ( 
            <div >
            <AppBar position="static">
                <Tabs value={this.state.currentTab} onChange={(event,value) => this.handleChange(event,value)}>
                    {tabs}
                </Tabs>
            </AppBar>
            <Deck id={currentDeck.id} rotate={currentDeck.rotate} battle={currentDeck.battle} 
                onCardClick={() => this.onCardClick()}/>
            <div>   
                <Button variant="contatined" color="primary" onClick={() => this.onRotateClick()}>Rotate</Button>
                <Button variant="contatined" color="primary" onClick={() => this.onBattleClick()}>Battle</Button>                
                <Button variant="contatined" color="primary" onClick={() => this.onCardsClick()}>Cards</Button>                
            </div>         
        </div>
        );
    }

    handleChange(event, value)
    {   
        if(value == this.state.numberOfTabs)
        {
            let newDeck = [
                {                
                    id : 0,
                    shuffledDeck : this.shuffle(deck),
                    rotate: 1,
                    battle: false             
                }
            ];

            this.setState(
                update(this.state, {
                    numberOfTabs: {$set : this.state.numberOfTabs + 1},
                    decks: {$push : newDeck }                    
                })                
            )
        }   
        else
        { 
            this.setState({ 
                currentTab: value 
            });
        }                  
    }

    onRotateClick()
    {
        console.log('onRotateClick');
     
        let currentDeck = this.state.decks[this.state.currentTab];

        currentDeck.rotate = currentDeck.rotate * -1;
        
        this.setState(
            {
                decks: update(this.state.decks, {
                    [this.state.currentTab]: {$set : currentDeck }                    
                })
            }
        )
    }

    onBattleClick()
    {
        console.log('onBattleClick');
     
        let currentDeck = this.state.decks[this.state.currentTab];

        let shuffledDeck = currentDeck.shuffledDeck;
        let card = 0;

        if(shuffledDeck.length > 0)
            card = shuffledDeck.pop();
        
        
        currentDeck.shuffledDeck = shuffledDeck;
        currentDeck.lastCard = currentDeck.id;
        currentDeck.id = card;
        currentDeck.battle = true;
                
        this.setState(
            {
                decks: update(this.state.decks, {
                    [this.state.currentTab]: {$set : currentDeck }                    
                })
            }
        )        
    }

    onCardsClick()
    {

    }

    onCardClick()
    {
        console.log('oncardclick');

        let currentDeck = this.state.decks[this.state.currentTab];

        if(currentDeck.battle)
        {
            currentDeck.id = currentDeck.lastCard;            
            currentDeck.lastCard = null;
            currentDeck.battle = false;            
        }
        else {            
            let shuffledDeck = currentDeck.shuffledDeck;
            let card = 0;

            if(shuffledDeck.length > 0)
                card = shuffledDeck.pop();

            currentDeck.id = card;
            currentDeck.shuffledDeck = shuffledDeck;        
        }

        this.setState(
            {
                decks: update(this.state.decks, {
                    [this.state.currentTab]: {$set : currentDeck }                    
                })
            }
        )        
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