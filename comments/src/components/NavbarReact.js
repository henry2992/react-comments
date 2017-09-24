import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

class NavbarReact extends Component {
  render() {
    var categories = this.props.categories;

    let list_item
    if (this.props.categories !== undefined) {
      list_item = (categories).map((category) => (
        <li role="presentation" key={category.name}>
          <Link 
            to= {`/category/${category.path}`}
            name = {category.name}
            className = "nav-link inside">
              {category.path} posts
          </Link>
        </li>
      ))
    } else {
      list_item = null
    }

    return (
      <section className="app-header">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link
                to='/'
                className='navbar-brand'>
                <h1>Posts App</h1>
              </Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            {list_item}
            <li>
              <Link
                to='/post/new'
                className='nav-link inside'>
                New Post
              </Link>
            </li>
          </Nav>
        </Navbar>

      </section>
    )
  }
}



export default (NavbarReact);