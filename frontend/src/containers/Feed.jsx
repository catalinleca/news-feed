import React, {useCallback, useMemo, useState} from "react";
import {Grid} from "@mui/material";
import appClient from "../client/appClient";
import {AddPostTile, Posts, AddEditPostDialog, PostLoader} from "../components";
import {useProgressiveRequest} from "../hooks";

export const FeedContext = React.createContext({});

export const Feed = () => {
  const [activePost, setActivePost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePostLoading, setActivePostLoading] = useState(null);

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

      setPosts([...posts.slice(0, posts.length - 1), newPost])
    } catch (err) {
      console.error("Handle me - Could not add Post")
    }
  }

  const triggerEdit = (postId) => {
    setActivePost(postId);
    setIsModalOpen(true)
  }

  const updatePostHandler = async (postData) => {
    try {
      if (!activePost) {
        console.error("Handle me - Could not delete Post")
        return
      }

      setActivePostLoading(activePost)

      const response = await appClient.posts.update(+activePost, {
        ...postData
      })

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
      setActivePostLoading(null)
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

  const sortedPosts = useMemo(() => {
    return posts.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
  }, [posts])


  return (
    <Grid
      container={true}
      alignItems="center"
      justifyContent="center"
    >
      <FeedContext.Provider
        value={{
          activePostLoading,
          triggerEdit,
          deletePostHandler
        }}
      >
        <AddPostTile
          clickHandler={() => setIsModalOpen(true)}
        />
        <Posts
          posts={sortedPosts}
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
        {
          isLoading && [1,2,3].map(i => <PostLoader key={i}/>)
        }
      </FeedContext.Provider>
    </Grid>
  )
}