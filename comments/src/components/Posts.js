import React, { Component } from 'react';
import './../App.css';
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllPosts, getCategories, sortBy, votePost, deletePost, getComments } from './../actions'
import Post from './Post'

class Posts extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() { 
    this.props.getAllPosts(); 
    this.props.getCategories();
  }

    handleChange = event => {
    const target = event.target;
    const value = target.value;
    this.props.sortBy(value)
  }

  render() {
    const posts = this.props.sortedPosts;
    let post_component = ''
    if(posts !== undefined) {
      post_component = 
        (posts).map((post) => (
          <Post post_object={post} />
        ))
    } else {
      post_component = 'Loading'
    }

    return (
      <div>
        <div>
          <div>
            <p>Sort By:  
              <select name='category' onChange={this.handleChange}>
                <option value='voteScore' > Votes </option>
                <option value='timestamp' > Time </option>
              </select></p>
          </div>
          {post_component}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getAllPosts: getAllPosts,
  getCategories: getCategories,
  sortBy: sortBy,
}

const mapStateToProps = state => { 
  const { posts_reducer } = state; 
  const { sortBy, order, posts = [] } = posts_reducer; 
  const sortedPosts = posts.sort((a, b) => { 
    // later you can change the logic based on the order variable 
    return a[sortBy] < b[sortBy]; }); 
  return { 
    sortedPosts: [...sortedPosts], 
    categories: state.categories_reducer.categories,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));
