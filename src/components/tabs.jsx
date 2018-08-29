import React, {Component} from 'react';
import update from 'immutability-helper';
import Dialog from '@material-ui/core/Dialog';

import CardSelection from './cardselection';
import Deck from './deck';
import '../css/tabs.css'



import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

const coreDeck = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

export default class DeckTabs extends Component {
    constructor(){
        super();

        this.state = {
            numberOfTabs: 1,
            currentTab: 0,
            decks: [
                {                
                    id : 0,
                    deck: coreDeck.slice(0,coreDeck.length),
                    shuffledDeck : this.shuffle(coreDeck),
                    rotate: 1,
                    battle: false             
                }
            ],
            cardSelection: false
        }
    }

    render()
    {
        let currentDeck = this.state.decks[this.state.currentTab];

        let tabs = [];

        for(let i = 0; i < this.state.numberOfTabs;i++)
            tabs.push(<Tab key={i} label={"Automa " + (i+1)}/>);

        tabs.push(<Tab key={this.state.numberOfTabs} label="+"/>);    

        return ( 
            <div className="page">            
                <div className="template">
                    <AppBar position="static">
                        <Tabs value={this.state.currentTab} onChange={(event,value) => this.handleChange(event,value)}>
                            {tabs}
                        </Tabs>
                    </AppBar>
                    <Deck id={currentDeck.id} rotate={currentDeck.rotate} battle={currentDeck.battle} 
                        onCardClick={() => this.onCardClick()}/>
                    <footer className="buttons">   
                        <Button variant="contained" color="primary" disabled={currentDeck.battle} onClick={() => this.onRotateClick()}>Rotate</Button>
                        <Button variant="contained" color="primary" disabled={currentDeck.battle} onClick={() => this.onBattleClick()}>Battle</Button>                
                        <Button variant="contained" color="primary" disabled={currentDeck.battle} onClick={() => this.onCardsClick()}>Cards</Button>                
                    </footer>  
                </div>      
                <Dialog
                    fullScreen
                    open={this.state.cardSelection}            
                    TransitionComponent={Transition}
                >
                    <CardSelection deck={coreDeck} onClose={(deck)=>this.handleClose(deck)}/>
                </Dialog>
            </div>
        );
    }

    handleClose(newdeck)
    {

        let currentDeck = this.state.decks[this.state.currentTab];

        currentDeck.deck = newdeck;
        currentDeck.shuffledDeck = this.shuffle(currentDeck.deck);
        currentDeck.id = 0;

        this.setState({
            cardSelection: false,
            decks: update(this.state.decks, {
                [this.state.currentTab]: {$set : currentDeck }                    
            })
        })
    }

    handleChange(event, value)
    {   
        if(value === this.state.numberOfTabs)
        {
            let newDeck = [
                {                
                    id : 0,
                    deck: coreDeck.slice(0,coreDeck.length),
                    shuffledDeck : this.shuffle(coreDeck),
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
        currentDeck.id = 0;
        currentDeck.shuffledDeck = this.shuffle(currentDeck.deck);
        
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
        this.setState({
            cardSelection: true 
        })
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
            else {
                shuffledDeck = this.shuffle(currentDeck.deck);                                
            }

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

    shuffle(orginalarray) {
        let array = orginalarray.slice(0,orginalarray.length);

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