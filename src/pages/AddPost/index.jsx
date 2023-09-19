import React, { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useRef } from 'react';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import {useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'

export const AddPost = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('')
  const inputFileRef = useRef(null)

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const handleChangeFile = async (e) => {
    try{
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append('image', file)
      const {data} = await axios.post('/uploads', formData)
      setImageUrl(data.url)
    }catch(err) {
      console.log(err)
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

  const onChange = React.useCallback((value) => {
    setDescription(value);
  }, []);

  const onSubmit = async () => {
    try{
      setIsLoading(true)
      await axios.post('/posts', {title, description, tags, imageUrl})
      navigate('/')

    } catch (err) {
      console.log(err)
    }

  }

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  return (

    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large" onClick={() => inputFileRef.current.click()}>
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
      />
      <TextField classes={{ root: styles.tags }} 
              value={tags}
              onChange={e => setTags(e.target.value)}variant="standard"
              placeholder="Тэги"
              fullWidth />
      <SimpleMDE className={styles.editor} value={description} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={onSubmit}>
          Опубликовать
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
