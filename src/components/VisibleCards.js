import React from 'react';
import {connect} from 'react-redux';
import Card from './Card';
import fuzzysearch from 'fuzzysearch';

// Filtering
const matches = (filter, card) =>
  fuzzysearch(filter.toLowerCase(), card.front.toLowerCase()) ||
  fuzzysearch(filter.toLowerCase(), card.back.toLowerCase());

const mapStateToProps = ({cards, cardFilter}, {params: {deckId}}) => ({
  cards: cards.filter(card => card.deckId === deckId && matches(cardFilter, card))
});

const Cards = ({cards, children}) => {
  return (<div className="main">
    {cards.map(card => <Card card={card} key={card.id}/>)}
    {children}
  </div>);
};

export default connect(mapStateToProps)(Cards);
