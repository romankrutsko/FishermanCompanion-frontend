import React from 'react'
import Form from '../inputs/Form'
import { setCredentials } from '../../lib/store/slices/auth';
import { useDispatch } from 'react-redux';
import UserService from '../../lib/services/user-service'
import AuthService from '../../lib/services/auth-service'
import { useNavigate } from 'react-router-dom';

function RegisterForm({ authSwitchHandler }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fields = [
        {
            name: 'username',
            label: 'Імʼя користувача',
            required: true,
            type: 'text',
            placeholder: 'Імʼя користувача неможливо буде змінити. Також, його бачать інші користувачі'
        },
        {
            name: 'password',
            label: 'Пароль',
            required: true,
            type: 'password',
            placeholder: 'Придумайте надійний пароль'
        },
        {
            name: 'bio',
            label: 'Про себе',
            required: false,
            type: 'textarea',
            placeholder: 'Наприклад, розповіси про свій досвід риболова, улюблені типи рибалки і так далі'
        },
        {
            name: 'contacts',
            label: 'Контакти',
            required: false,
            type: 'textarea',
            placeholder: 'Посилання на соціальні мережі, номер телефону і так далі'
        },
        {
            name: 'location',
            label: 'Населений пункт',
            required: true,
            type: 'location'
        }
    ];
    const goBack = () => {
        navigate(-1)
      }
    const submitHandler = (data) => {
        return UserService.create(data)
            .then(() => {
                AuthService.login({ username: data.username, password: data.password })
                    .then((response => {
                        dispatch(setCredentials(response.data))
                        goBack()
                    }))
            })
    }
    return (
        <>
            <Form fields={fields} submitButtonName={'Реєстрація'} submitFunction={submitHandler} onCancel={goBack} title='Зареєструватись'>
                <div className='flex justify-center'>
                    <button onClick={authSwitchHandler}
                        className="inline-block px-4 font-medium text-blue-500 rounded hover:text-blue-600">
                        Є аккаунт? Увійти
                    </button>
                </div>
            </Form>
        </>
    )
}

export default RegisterForm