import React, { Component } from 'react';
import './../App.css';
import { getCategories, createPost , editPost } from './../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getSinglePost } from './../actions'

class NewPostsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      author: '',
      category: 'redux',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const postId = this.props.match.params.postId;
    if (postId != undefined) {
      this.props.getSinglePost(postId);
      let post = this.props.post
      if (post != undefined){
        this.setState({ 
          title: post.title,
          body: post.body,
          author: post.author,
          category: post.category,
        });
      }
    }
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  handleSubmit(event) { 
    const { title, body, author, category } = this.state; 
    event.preventDefault(); 
    var scope = this;
    let id = this.makeid()
    let timestamp = Date.now()

    const postId = this.props.match.params.postId;
    if (postId != undefined) {
      this.props.editPost({ title, body, author, category }, postId)
    } else {
      this.props.createPost({ id, timestamp, title, body, author, category })
    }
    this.props.history.push('/');
  }

  render() {
    var categories = this.props.categories;

    let option_values
    if (categories !== undefined) {
      option_values = (categories).map((category) => (
        <option value={category.name} key={category.name}> { category.name } </option>
      ))
    } else {
      option_values = null
    }

    console.log(this.state)

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="post-holder">
            <form onSubmit={this.handleSubmit}>

              <div>
                <label>
                  Title:
                  <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
                </label>
              </div>

              <div>
                <label>
                  Body:
                  <textarea name="body" type="text" value={this.state.body} onChange={this.handleChange} />
                </label>
              </div>

              <div>
                <label>
                  Author:
                  <input name="author" type="text" value={this.state.author} onChange={this.handleChange} />
                </label>
              </div>

              <div>
                <label>
                  Pick your category:
                  <select name='category' value={this.state.category} onChange={this.handleChange}>
                    {option_values}
                  </select>
                </label>
              </div>

              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getCategories: getCategories,
  getSinglePost: getSinglePost,
  createPost,
  editPost,
}

const mapStateToProps = state => {
  return {
    categories: state.categories_reducer.categories,
    post: state.posts_reducer.post,
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPostsForm))