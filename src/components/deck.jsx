import React, {Component} from 'react';
import Card from './card';

export default class Deck extends Component {
    render()
    {
        return (
            <Card id={this.props.id} rotate={this.props.rotate} battle={this.props.battle} onClick={() => this.props.onCardClick()}/>                        
        );
    }

   
}