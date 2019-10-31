import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export function MenuSection() {
  const handleItemClick = (e, { name }) => setActiveItem(name);

  const [activeItem, setActiveItem] = useState();

  return (
    <Menu inverted widths={6}>
      <Menu.Item
        as={Link}
        to="/"
        name="home"
        active={activeItem === 'home'}
        onClick={handleItemClick}
      >
        Home
      </Menu.Item>
      <Menu.Item
        as={Link}
        to="/compare"
        name="compare"
        active={activeItem === 'compare'}
        onClick={handleItemClick}
      >
        Compare
      </Menu.Item>
    </Menu>
  );
}
