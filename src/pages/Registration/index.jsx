import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.scss";

export const Registration = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: ""
    },
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    dispatch(fetchUserData(data));
    reset();
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField 
          className={styles.field}
          label="Имя пользователя"
          {...register("username", {
            required: "Поле обязательно для заполнения",
            minLength: {
              value: 2,
              message: "должно быть не менее двух символов",
            },
          })}
          error={Boolean(errors.username?.message)}
          helperText={errors.username?.message} 
          fullWidth />
        <TextField 
          className={styles.field} 
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", {
            required: "Поле обязательно для заполнения"
          })} 
          fullWidth />
        <TextField 
          className={styles.field} 
          {...register("password", {
            required: "Поле обязательно для заполнения",
            minLength: {
              value: 5,
              message: "должно быть не менее пяти символов",
            },
          })}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          label="Пароль" fullWidth />
        <Button size="large" type="submit" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
