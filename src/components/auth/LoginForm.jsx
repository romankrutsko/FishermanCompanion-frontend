import React from 'react'
import Form from '../inputs/Form'
import { useNavigate } from "react-router-dom";
import { setCredentials } from '../../lib/store/slices/auth';
import { useDispatch } from 'react-redux';
import AuthService from '../../lib/services/auth-service'

function LoginForm({ authSwitchHandler }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fields = [
    {
      name: 'username',
      label: 'Імʼя користувача',
      required: true,
      type: 'text'
    },
    {
      name: 'password',
      label: 'Пароль',
      required: true,
      type: 'password'
    },
  ];
  const goBack = () => {
    navigate(-1)
  }
  const submitHandler = (data) => {
    return AuthService.login(data)
      .then(response => {
        dispatch(setCredentials(response.data))
        goBack()
      })
  }
  return (
    <>
      <Form fields={fields} submitButtonName={'Вхід'} submitFunction={submitHandler} onCancel={goBack} title='Увійти в акаунт'>
        <div className='flex justify-center'>
          <button onClick={authSwitchHandler}
            className="inline-block px-4 font-medium text-blue-500 rounded hover:text-blue-600">
            Не маєте аккаунту? Зареєструватись
          </button>
        </div>
      </Form>
    </>
  )
}

export default LoginForm