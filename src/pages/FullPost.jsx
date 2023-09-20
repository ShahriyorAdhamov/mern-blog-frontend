import React, { useEffect, useState } from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from '../api/axios'
export const FullPost = () => {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const {id} = useParams();
  useEffect(() => {
    setIsLoading(true)
    axios.get(`posts/${id}`).then(({data}) => {
        setData(data)
      }).catch((err) => {
        console.log(err)
      })
      setIsLoading(false)
  }, [id])
  return (
    <>
      {isLoading?
      <Post isLoading={true} isFullPost/>
      :
      <Post
        id={id}
        title={data.title}
        imageUrl={`http://localhost:3002/${data.imageUrl}`}
        user={data.user}
        createdAt={data.createdAt}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
      </Post>}
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
