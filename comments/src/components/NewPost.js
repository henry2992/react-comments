import React, { Component } from 'react';
import './../App.css';
import NewPostForm from './NewPostForm'

class NewPost extends Component {

  render() {

    return (
      <div>
        <NewPostForm history={this.props.history}/>
      </div>
    )
  }
}

export default (NewPost)
