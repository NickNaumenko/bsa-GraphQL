import React from 'react';
import { Dropdown, Input } from "semantic-ui-react";
import './style.css';

const Header = props => {
  const { sortOptions, setOrder, setFilter } = props;

  const onSelect = (e, data) => {
    setOrder(data.value);
  }

  return (
    <div className="header container">
      <div>
        Sort by{' '}
        <Dropdown
          inline
          options={sortOptions}
          defaultValue={sortOptions[0].value}
          onChange={onSelect}
        />
      </div>
      <Input
        icon="search"
        aligned='right'
        onChange={e => setFilter(e.target.value)}
      />
    </div>
  )
}

export default Header;