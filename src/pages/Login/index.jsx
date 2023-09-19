import React, {useEffect} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from 'react-redux'
import { fetchUserData } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const {isAuth} = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors},
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    dispatch(fetchUserData(data))
    reset();
  };

  useEffect(() => {
		if (isAuth) {
			navigate('/')
		}
	}, [isAuth, navigate])
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          type="email"
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", {
            required: "Поле обязательно для заполнения"
          })}
          fullWidth
        />
        <TextField 
        className={styles.field} 
        label="Пароль"
        {...register("password", {
          required: "Поле обязательно для заполнения",
          minLength: {
            value: 5,
            message: "должно быть не менее пяти символов",
          },
        })}
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        fullWidth />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
