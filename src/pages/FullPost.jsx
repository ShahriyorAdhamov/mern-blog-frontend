import React, { useEffect, useState } from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from '../api/axios'
export const FullPost = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const {id} = useParams();

  useEffect(() => {
    axios.get(`products/${id}`)
      .then((res) => {
        setData(res.data)
        isLoading(false)
      }).catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      {isLoading?
      <Post isLoading={true} isFullPost/>
      :
      <Post
        id={1}
        title="Roast the code #1 | Rock Paper Scissors"
        imageUrl={data.imageUrl? `http://localhost:3002${data.imageUrl}`: ''}
        user={data.user}
        createdAt={"12 июня 2022 г."}
        viewsCount={150}
        commentsCount={3}
        tags={["react", "fun", "typescript"]}
        isFullPost
      >
        <p>
          Hey there! 👋 I'm starting a new series called "Roast the Code", where
          I will share some code, and let YOU roast and improve it. There's not
          much more to it, just be polite and constructive, this is an exercise
          so we can all learn together. Now then, head over to the repo and
          roast as hard as you can!!
        </p>
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
