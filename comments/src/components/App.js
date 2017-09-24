import React, { Component } from 'react';
import logo from './../logo.svg';
import './../App.css';
import * as API from './../utils/Api'
import { getAllPosts, getCategories } from './../actions'
import { connect } from 'react-redux'
import NavbarReact from './NavbarReact'
import NewPost from './NewPost'
import Posts from './Posts'
import PostView from './PostView'
import CategoryPosts from './CategoryPosts'
import EditPost from './EditPost'
import { Route, Link, withRouter, Switch } from 'react-router-dom'

class App extends Component {

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const posts = this.props.posts;
    const categories = this.props.categories;

    return (
      <div>
        <NavbarReact categories={categories}/>

        <section className="app-content">
          <div className="container">
            <Switch>
              <Route exact path='/' render={() => (
                <Posts/>
              )} />

              <Route path='/post/new' component={NewPost} />
              <Route exact path='/post/:postId/edit' component={EditPost} />
              <Route path='/category/:category' component={CategoryPosts} />
              <Route exact path='/post/:postId' component={PostView} />

            </Switch>
          </div>
        </section>        
      </div>
    )
  }
}

const mapDispatchToProps = {
  getCategories: getCategories,
}

const mapStateToProps = state => {
  return {
    categories: state.categories_reducer.categories,
    post: state.posts_reducer.post,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
