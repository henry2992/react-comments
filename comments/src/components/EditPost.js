import React, { Component } from 'react';
import './../App.css';
import NewPostForm from './NewPostForm'
import { withRouter } from 'react-router-dom'

class EditPost extends Component {
  render() {
    return (
      <div>
        <NewPostForm history={this.props.history}/>
      </div>
    )
  }
}

export default withRouter(EditPost)
