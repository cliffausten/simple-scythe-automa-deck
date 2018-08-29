import React, {Component} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import update from 'immutability-helper';

import '../css/cardselection.css';

export default class CardSelection extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            deck: props.deck.map( value => {return {id:value, checked:true} } )
        };
    }

    render()
    {   
        let renderDeck = this.state.deck.map((value)=> 
            <div key={value.id}>Card {value.id}
                <Checkbox                    
                    checked={value.checked}
                    onChange={(event) => this.handleChange(value.id, event)}
                    value={value.id.toString()}/>
            </div>
        );    

        console.log(renderDeck);

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton color="inherit" onClick={() => this.handleClose()} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                    </Toolbar>
                </AppBar>
                <div className="CardSelection">{renderDeck}</div>           
            </div>
        );
    }

    handleChange(name, event) {
        let selecteddeck = this.state.deck;

        this.setState({
            deck: update(selecteddeck,{[name-1]:{$set:{id:name,checked:event.target.checked}}})
        });
    }
    
    handleClose() {
        let selecteddeck = [];

        this.state.deck.forEach(element => {
            if(element.checked)
                selecteddeck.push(element.id);                
        });

        this.props.onClose(selecteddeck);
    }
}