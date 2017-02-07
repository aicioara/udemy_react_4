import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { fetchPost, deletePost } from '../actions/index'

class PostsShow extends Component {

  static contextTypes = {
    router: PropTypes.object,
  }

  render() {
    if (!this.props.post) {
      return <div>Loading...</div>
    }

    const {post} = this.props;

    return (
      <div>
        <Link to="/">Back to index</Link>
        <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>Delete Post</button>
        <h3>{post.title}</h3>
        <h6>{post.categories}</h6>
        <p>{post.content}</p>
      </div>
    )
  }

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onDeleteClick() {
    this.props.deletePost(this.props.params.id).then(() => {
      this.context.router.push('/');
    })
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    post: state.posts.post
  }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
