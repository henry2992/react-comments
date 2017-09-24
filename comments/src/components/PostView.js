import React, { Component } from 'react';
import './../App.css';
import { Route, Link, withRouter } from 'react-router-dom'
import { getSinglePost, getComments, deletePost } from './../actions'
import { connect } from 'react-redux'
import Comments from './Comments'
import NewCommentForm from './NewCommentForm'
import { Button } from 'react-bootstrap'

class PostView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    const postId = this.props.match.params.postId
    this.props.getSinglePost(postId);
    this.props.getComments(postId)
  }

  open() {
    this.setState({ 
      showModal: true 
    });
  }

  close() {
    this.setState({ showModal: false });
  }

  deleteButton(id) {
    this.props.deletePost(id)
    this.props.history.push('/');
  }

  render() {

    const post = this.props.post;
    const comments =  this.props.comments
    let post_component = '';

    if(post !== undefined) {
      post_component = 
        <div>
          <div className="row" key={post.id}>
            <div className="col-md-12">
              <div className="post-holder">
                <Link
                  to={`/post/${post.id}/edit`}
                >
                  Edit
                </Link>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <div className="author-holder">
                  <p>Author: {post.author}</p>
                  <p>Category: {post.category}</p>
                </div>
                <button
                  className='btn btn-success'
                  onClick={this.open.bind(this)}
                >
                  Create Comment
                </button>
                <button
                  className="btn btn-danger right"
                  onClick={() => this.deleteButton(post.id)}
                >
                  Delete Post
                </button>
              </div>
            </div>
            
          </div>
          <div>
            <h3>Comments</h3>
            <Comments postId={post.id}/>
          </div>
          <NewCommentForm comment={undefined} close={this.close.bind(this)} showModal={this.state.showModal} postId={post.id} />
        </div>
    } else {
      post_component = 'Loading'
    }

    return (
      <div>
        {post_component}
      </div>
    )
  }
}

const mapDispatchToProps = {
  getSinglePost: getSinglePost,
  getComments: getComments,
  deletePost: deletePost,
}


const mapStateToProps = state => {
  return {
    post: state.posts_reducer.post,
    comments: state.comments_reducer.post_comments,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostView));

