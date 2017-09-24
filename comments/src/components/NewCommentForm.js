import React, { Component } from 'react';
import './../App.css';
import { getCategories, createComment, getComments, editComment} from './../actions'
import { connect } from 'react-redux'
import { Modal , Button } from 'react-bootstrap'


class NewCommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      body: '',
      author: '',
      parentId: '',
      showModal: false,
      editComment: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  close() {
    this.props.close();
  }

  componentDidMount() {
    const postId = this.props.postId
    const comment = this.props.comment
    this.setState({
      body: '',
      parentId: postId,
    })
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.showModal === true) {
      this.setState({ showModal: true });
    } else {
      this.setState({ showModal: false });
    }

    let comment = nextProps.comment;

    if ( comment !== undefined) {
      this.setState({ 
        id: comment.id,
        body: comment.body,
        author: comment.author,
        parentId: comment.parentId,
        editModal: true,
      });
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
    this.props.close();
    const { id, body, author, parentId } = this.state; 
    event.preventDefault();
    let timestamp = Date.now()
    let newId = this.makeid()
    if (this.state.editModal){
      this.props.editComment(id, { id, timestamp, body, author, parentId }) 
    } else {
      this.props.createComment({ newId, timestamp, body, author, parentId }) 
    }
    this.props.getComments(parentId)
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

    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Create a New Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label>
                    Author:
                    <input name="author" type="text" value={this.state.author} onChange={this.handleChange} />
                  </label>
                </div>
                <div>
                  <label>
                    Body:
                    <textarea name="body" type="text" value={this.state.body} onChange={this.handleChange} />
                  </label>
                </div>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)} >Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = {
  createComment: createComment,
  editComment: editComment,
  getComments: getComments,
}

const mapStateToProps = state => {
  return {
    state,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCommentForm)
