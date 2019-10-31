import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export class MenuSection extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted widths={6}>
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item
          as="div"
          name="compare"
          active={activeItem === 'compare'}
          onClick={this.handleItemClick}
        >
          <NavLink to="/compare">Compare</NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}
