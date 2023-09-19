import React, { useEffect } from 'react';
import Button from '@mui/material/Button';


import styles from './Header.module.scss';
import Container from '@mui/material/Container';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux"
import {logout} from '../../redux/slices/auth'
export const Header = () => {
  const {isAuth} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  

  const onClickLogout = () => {
    dispatch(logout())
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <a className={styles.logo} href="/">
            <div>BLOG</div>
          </a>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/create-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
