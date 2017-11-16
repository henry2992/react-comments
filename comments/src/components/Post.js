import React, { Component } from 'react';
import './../App.css';
import { Route, Link, withRouter } from 'react-router-dom'
import { getAllPosts, getCategories, sortBy, votePost, deletePost, getComments } from './../actions'
import { connect } from 'react-redux'
import Comments from './Comments'
import NewCommentForm from './NewCommentForm'
import { Button } from 'react-bootstrap'
import * as API from './../utils/Api'

class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comments: 0,
    };
  }

  componentDidMount() {
    const post = this.props.post_object;
    let comments = API.getComments(post.id).then( 
      comments => this.setState({ comments: comments.length })
    )
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

  deleteButton(id) {
    this.props.deletePost(id)
    this.props.getAllPosts(); 
  }

  render() {

    const post = this.props.post_object

    let comments = this.props.comments
    comments = comments === undefined ? 0 : comments.length


    return (
      <div>
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
                <p>Number of comments: {this.state.comments} </p>
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
                <button
                  className="btn btn-danger right"
                  onClick={() => this.deleteButton(post.id)}
                >
                  Delete Post
                </button>

                <Link
                  className="btn btn-success right"
                  to={`/post/${post.id}/edit`}
                >
                  Edit
                </Link>

                
              </div>

              <Link 
                to={`/post/${post.id}`}>
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getAllPosts: getAllPosts,
  getCategories: getCategories,
  votePost: votePost,
  deletePost: deletePost,
  getComments: getComments,
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));

