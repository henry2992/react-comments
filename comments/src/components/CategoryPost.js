import React, { Component } from 'react';
import './../App.css';
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


class CategoryPost extends Component {

  render() {

    const posts = this.props.posts
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
                </div>

                <Link 
                  to={`/${this.props.category}/${post.id}`}>
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
          {post_component}
        </div>
      </div>
    )
  }
}

export default withRouter(CategoryPost);
