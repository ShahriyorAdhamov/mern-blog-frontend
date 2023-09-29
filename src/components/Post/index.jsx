import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';

import styles from './Post.module.scss';

import { addFriend } from '../../redux/slices/user';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { fetchDeletePost } from '../../redux/slices/post';
export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  author,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  const {userAuth: user} = useSelector(state => state.auth)

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    dispatch(fetchDeletePost(id))
  };

  const addFriendHandler = () => {
    const friendId = author._id
    const userId = user._id
    dispatch(addFriend({ userId, friendId}))
  }

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable? (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      ) : 
      ( 
        <div className={styles.editButtons}>
          <IconButton onClick={addFriendHandler}>
            <PersonAddRoundedIcon color="primary"/>
          </IconButton>
        </div>
      )

      }
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={isFullPost? imageUrl: 'http://localhost:3002/' + imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...author} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags?.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>{name? `#${name}`: ''}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
