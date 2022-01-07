import React, {useCallback, useMemo, useState} from "react";
import {Grid} from "@mui/material";
import appClient from "../client/appClient";
import {AddPostTile, Posts, AddEditPostDialog} from "../components";
import {useProgressiveRequest} from "../hooks";

export const FeedDispatchContext = React.createContext({});
export const FeedStateContext = React.createContext({})

export const Feed = () => {
  const [activePost, setActivePost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5);


  const apiCall = useCallback(() => appClient.posts.getAllWithQueryParams({
    _page: page,
    _limit: limit
  }), [page, limit])

  const {
    data: posts,
    setData: setPosts,
    isLoading,
    error,
    setLoader
  } = useProgressiveRequest(
    apiCall,
    page,
    limit,
    () => setPage(prevPageNumber => prevPageNumber + 1)
  )

  const actionHandler = (data) => {
    if (activePost) {
      return updatePostHandler(data)
    } else {
      return addPostHandler(data)
    }
  }

  const addPostHandler = async (data) => {
    try {
      const response = await appClient.posts.create({
        ...data
      })

      const newPost = response.data;

      setPosts([newPost, ...posts])
    } catch (err) {
      console.error("Handle me - Could not add Post")
    }
  }

  const triggerEdit = (postId) => {
    setActivePost(postId);
    setIsModalOpen(true)
  }

  const updatePostHandler = async (postData) => {
    console.log("postData: ", postData);
    console.log("postId: ", activePost);
    try {
      if (!activePost) {
        console.error("Handle me - Could not delete Post")
        return
      }

      const response = await appClient.posts.update(+activePost, {
        ...postData
      })

      console.log("update response: ", response);
      if (response.data[0] === 0) {
        console.error("Handle me - Could not delete Post")
        return
      }

      const {data: newPost} = response

      const newPosts = posts.map(post => {
        if (post.id === activePost) {
          return newPost
        } else {
          return post
        }
      })

      setPosts(newPosts)
    } catch(err) {
      console.error("Handle me - Could not update Comment")
    }
  }

  const deletePostHandler = async (postId) => {
    try {
      const response = await appClient.comments.deleteById(postId)

      if (response[0] === 0) {
        console.error("Handle me - Could not delete Post")
        return
      }

      const newComments = posts.filter(({id}) => id !== postId)

      setPosts(newComments)
    } catch (err) {
      console.error("Handle me - Could not delete Post")
    }
  }

  const activePostData = useMemo(() => posts.find(({id}) => id === activePost ), [posts, activePost])

  console.log("activePostData: ", activePostData);

  return (
    <Grid
      container={true}
      alignItems="center"
      justifyContent="center"
    >
      <FeedDispatchContext.Provider
        value={{
          triggerEdit,
          deletePostHandler
        }}
      >
        <AddPostTile
          clickHandler={() => setIsModalOpen(true)}
        />
        <Posts
          posts={posts}
          isLoading={isLoading}
          setLoader={setLoader}
        />
          <AddEditPostDialog
            isOpen={isModalOpen}
            handleClose={() => {
              setActivePost(null)
              setIsModalOpen(false)
            }}
            defaultValues={activePostData}
            actionHandler={actionHandler}
          />
      </FeedDispatchContext.Provider>
    </Grid>
  )
}