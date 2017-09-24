import React, { Component } from 'react';
import './../App.css';
import { getCategoryPost } from './../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CategoryPost from './CategoryPost'


class CategoryPosts extends Component {

  componentWillReceiveProps(props) {
    if (this.props.category !== props.category){
      this.props.getCategoryPost(props.category);
    }
  }

  componentDidMount() {
    this.props.getCategoryPost(this.props.category);
  }

  render() {
    const category_posts = this.props.category_posts
    return (
      <div>
        <CategoryPost posts={category_posts} />
      </div>
    )
  }
}

const mapDispatchToProps = {
  getCategoryPost: getCategoryPost,
}

const mapStateToProps = (state, props) => {
  return {
    category_posts: state.posts_reducer.category_posts,
    category: props.match.params.category,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryPosts));
