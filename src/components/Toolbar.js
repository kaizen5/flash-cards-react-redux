import React from 'react';
import {showAddDeck, filterCards} from '../actions';
import {connect} from 'react-redux';
import {Link} from 'react-router';

const mapDispatchToProps = (dispatch) => ({
  showAddDeck: () => dispatch(showAddDeck()),
  onFilter: query => dispatch(filterCards(query))
});

const Toolbar = ({deckId, showAddDeck, onFilter}) => {
  let deckTools = deckId ? (<div>
      <Link className='btn' to={`/deck/${deckId}/new`}>+ New Card</Link>
      <Link className='btn' to={`/deck/${deckId}/study`}>Study Deck</Link>

      <input
        onChange={e => onFilter(e.target.value)}
        className='search'
        type='search'
        placeholder='Search Deck...' />

    </div>) : null;

  return (<div className='toolbar'>
    <div>
      <button onClick={showAddDeck}>+ New Deck</button>
    </div>
    {deckTools}
  </div>);
};

export default connect(null, mapDispatchToProps)(Toolbar);
