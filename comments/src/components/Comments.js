import React, { Component } from 'react';
import './../App.css';
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteComment } from './../actions'
import { getComments, getSingleComment, commentsSortBy, voteComment } from './../actions'
import NewCommentForm from './NewCommentForm'


class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      comment: '',
    };
  }

  componentDidMount() {
    this.props.getComments(this.props.postId)
  }

  deleteButton(id) {
    this.props.deleteComment(id)
    this.props.getComments(this.props.postId)
  }

  open(id) {
    this.props.getSingleComment(id)
    let comment = this.props.comment
    this.setState({ 
      showModal: true,
      comment: comment,
    });
  }

  close() {
    this.setState({ showModal: false });
  }

  voteUp(id) {
    const option = 'upVote'
    this.props.voteComment(id, { option })
    this.props.getComments(this.props.postId)
  }

  voteDown(id) {
    const option = 'downVote'
    this.props.voteComment(id, { option })
    this.props.getComments(this.props.postId)
  }

  render() {
    const comments = this.props.sortedComments;
    const post = this.props.postId
    var comments_component = '';

    if(comments !== undefined) {
      comments_component = 
        (comments).map((comment) => (
          <div className="row" key={comment.id}>
            <div className="col-md-12">
              <div className="post-holder">
                <h3>{comment.title}</h3>
                <p>{comment.body}</p>
                 <button
                    className='btn btn'
                    onClick={() => this.voteUp(comment.id)}
                  >
                    Vote Up
                  </button>
                  <button
                    className='btn btn'
                    onClick={() => this.voteDown(comment.id)}
                  >
                    Vote Down
                  </button>
                <div className="author-holder">
                  <p>Author: {comment.author}</p>
                  <p>Posted on: {new Date(comment.timestamp).toLocaleString()}</p>
                  <p>Votes: {comment.voteScore} </p>
                  <button
                    className='btn btn-info'
                    onClick={() => this.open(comment.id)}
                  >
                    Edit Comment
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.deleteButton(comment.id)}
                  >
                    Delete Comment
                  </button>
                </div>
              </div>
            </div>
            {this.props.comment && <NewCommentForm comment={this.state.comment} close={this.close.bind(this)} showModal={this.state.showModal} postId={post.id} />}
          </div>
        ))
    } else {
      comments_component = 'Loading'
    }

    return (
      <div>
        <div>
          {comments_component}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  deleteComment: deleteComment,
  getComments: getComments,
  getSingleComment: getSingleComment,
  commentsSortBy: commentsSortBy,
  voteComment: voteComment,
}

const mapStateToProps = state => {
  const { comments_reducer } = state;
  const { sortBy, order, post_comments = [] } = comments_reducer;
  const sortedComments = post_comments.sort((a, b) => { 
    return a[sortBy] < b[sortBy]; 
  }); 

  return {
    comments: state.comments_reducer.post_comments,
    comment: state.comments_reducer.comment,
    sortedComments: [...sortedComments]
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments));

