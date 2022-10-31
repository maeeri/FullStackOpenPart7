import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const changedBlog = action.payload
      return state.map((blog) =>
        blog.id === changedBlog.id ? changedBlog : blog
      )
    },
  },
})

export const { setBlogs, appendBlog, updateBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content, token) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content, token)
      dispatch(appendBlog(newBlog))
    } catch (exception) {
      window.localStorage.setItem('error', exception)
    }
  }
}

export const deleteBlog = (id, token) => {
  return async (dispatch) => {
    await blogService.remove(id, token)
    dispatch(initializeBlogs())
  }
}

export const likeBlog = (id, token) => {
  return async (dispatch) => {
    const blog = await blogService.getOne(id)
    blog.likes += 1
    await blogService.update(blog, token)
    dispatch(updateBlog(blog))
  }
}

export const addComment = (id, comment, token) => {
  return async (dispatch) => {
    const blog = await blogService.getOne(id)
    const commentToAdd = {
      comment: comment,
    }
    blog.comments.push(commentToAdd)
    const returnedBlog = await blogService.update(blog, token)
    dispatch(updateBlog(returnedBlog))
  }
}

export const removeComments = (id, token) => {
  return async (dispatch) => {
    const blog = await blogService.getOne(id)
    blog.comments = []
    await blogService.update(blog, token)
    dispatch(updateBlog(blog))
  }
}

export default blogSlice.reducer
