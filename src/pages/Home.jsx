import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { useSelector, useDispatch  } from "react-redux";
import { fetchPosts, fetchTags } from '../redux/slices/post';


export const Home = () => {
  const {isLoading, posts} = useSelector(state => state.posts)
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [dispatch])


  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isLoading?[...Array(5)] : posts).map((obj, index) => {
          return (
            isLoading?
            <Post isLoading={true} key={index}/>
            :
            <Post
              key={obj._id}
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl}
              author={obj.user}
              viewsCount={obj.viewsCount}
              createdAt={obj.createdAt.slice(0, 10)}
              commentsCount={obj.comments?.length || 0}
              tags={obj.tags}
              isEditable = {obj?.user._id === user?._id}
            />
          )})}
        </Grid>
      </Grid>
    </>
  );
};
