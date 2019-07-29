import React, { useState } from 'react';
import './App.css';
import MessageList from './components/MessagesList';
import Header from './components/Header';
import AddMessage from './components/AddMessage';

function App() {
  const [orderBy, setOrder] = useState('createdAt_DESC');
  const [filter, setFilter] = useState('');

  const sortOptions = [
    {
      key: 'createdAt_DESC',
      text: 'newest',
      value: 'createdAt_DESC',
    },
    {
      key: 'createdAt_ASC',
      text: 'oldest',
      value: 'createdAt_ASC',
    },
    {
      key: 'likes_DESC',
      text: 'likes',
      value: 'likes_DESC',
    },
    {
      key: 'dislikes_DESC',
      text: 'dislikes',
      value: 'dislikes_DESC',
    }
  ];

  return (    
    <div className="App">
      <header className="App-header">
        <Header
          sortOptions={sortOptions}
          setOrder={setOrder}
          setFilter={setFilter}
        />
      </header>
      <div className="container">
        <MessageList
          orderBy={orderBy}
          filter={filter}
        />
      </div> 
      <AddMessage />           
    </div>
  );
}

export default App;
