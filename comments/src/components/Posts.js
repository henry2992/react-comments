import React, { Component } from 'react';
import './../App.css';
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllPosts, getCategories, sortBy, votePost } from './../actions'


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

  voteUp(id) {
    const option = 'upVote'
    this.props.votePost(id, { option })
    this.props.getAllPosts();
  }

  voteDown(id) {
    const option = 'downVote'
    this.props.votePost(id, { option })
    this.props.getAllPosts();
  }

  render() {
    const posts = this.props.sortedPosts;
    let post_component = ''
    if(posts !== undefined) {
      post_component = 
        (posts).map((post) => (
          <div className="row" key={post.id}>
            <div className="col-md-12">
              <div className="post-holder">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <div className="author-holder">
                  <p>Author: {post.author}</p>
                  <p>Category: {post.category}</p>
                  <p>Posted on: {new Date(post.timestamp).toLocaleString()}</p>
                  <p>Votes: {post.voteScore} </p>
                  <button
                    className='btn btn'
                    onClick={() => this.voteUp(post.id)}
                  >
                    Vote Up
                  </button>
                  <button
                    className='btn btn'
                    onClick={() => this.voteDown(post.id)}
                  >
                    Vote Down
                  </button>
                </div>

                <Link 
                  to={`/post/${post.id}`}>
                  Details
                </Link>
              </div>
            </div>
          </div>
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
  votePost: votePost,
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
