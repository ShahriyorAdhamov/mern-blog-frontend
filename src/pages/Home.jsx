import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useSelector, useDispatch  } from "react-redux";
import { fetchPosts } from '../redux/slices/post';
import { fetchAuthMe } from '../redux/slices/auth';
export const Home = () => {
  const {isLoading, posts} = useSelector(state => state.posts)
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe())
    dispatch(fetchPosts())
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
              user={obj.user}
              createdAt={obj.createdAt.slice(0, 10)}
              commentsCount={3}
              tags={obj.tags}
              isEditable = {obj?.user._id === user?._id}
            />
          )})}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={['react', 'typescript', 'заметки']} isLoading={false} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
