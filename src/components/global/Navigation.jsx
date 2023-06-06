import React from 'react'
import { Route, Routes, Link } from 'react-router-dom';
import Layout from './Layout'
import Auth from '../../views/Auth';
import RequireAuth from '../auth/RequireAuth'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentAuthState, selectCurrentUserID } from "../../lib/store/slices/auth"
import { logOut } from '../../lib/store/slices/auth';
import AuthService from '../../lib/services/auth-service';
import User from '../../views/User'
import UserRequests from '../../views/requests/User';
import PostRequests from '../../views/requests/Post';
import Posts from '../../views/posts/Index'
import UserPosts from '../../views/posts/User'
import { MdOutlineArrowDropDownCircle } from 'react-icons/md'
import Future from '../../views/trips/Future';
import Finished from '../../views/trips/Finished';
import FutureMembers from '../../views/trips/members/FutureMembers';
import FinishedMembers from '../../views/trips/members/FinishedMembers';

function Navigation() {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectCurrentAuthState)
    const userID = useSelector(selectCurrentUserID)

    const handleLogOut = () => {
        AuthService.logout()
            .then(() => {
                dispatch(logOut())
            })
    }
    return (
        <>
            <header className="flex justify-between items-center px-4 bg-blue-500 text-white">
                <div className="text-2xl font-bold">
                    <Link to='/'>
                        Fisherman Companion
                    </Link>
                </div>
                <div className='flex flex-col items-center text-lg gap-4 md:flex-row'>
                    {isAuth ? (
                        <>
                            <div className="cursor-pointer group relative dropdown tracking-wide md:py-4">
                                <div className="p-2 rounded-md text-white group-hover:bg-yellow-400">
                                    <Link to='/' className='flex flex-row justify-center items-center gap-1'>
                                        <span>Пости</span>
                                        <MdOutlineArrowDropDownCircle />
                                    </Link>
                                </div>
                                <div className='p-2 group-hover:block dropdown-menu absolute hidden mt-2 w-full rounded-md h-auto bg-white text-black text-justify z-10'>
                                    <Link to={`/users/${userID}/posts`} className="p-2 block rounded-md hover:bg-gray-200">Мої</Link>
                                    <Link to='/' className="p-2 block rounded-md hover:bg-gray-200">Всі</Link>
                                </div>
                            </div>

                            <div className="cursor-pointer group relative dropdown tracking-wide md:py-4">
                                <div className="p-2 rounded-md text-white group-hover:bg-yellow-400">
                                    <Link to={`/users/${userID}/trips/future`} className='flex flex-row justify-center items-center gap-1'>
                                        <span>Подорожі</span>
                                        <MdOutlineArrowDropDownCircle />
                                    </Link>
                                </div>
                                <div className='p-2 group-hover:block dropdown-menu absolute hidden mt-2 w-full rounded-md h-auto bg-white text-black text-justify'>
                                    <Link to={`/users/${userID}/trips/future`} className="p-2 block rounded-md hover:bg-gray-200">Майбутні</Link>
                                    <Link to={`/users/${userID}/trips/finished`} className="p-2 block rounded-md hover:bg-gray-200">Минулі</Link>
                                </div>
                            </div>

                            <div className="p-2 text-white rounded-md">
                                <Link to={`/users/${userID}/requests`}>Мої запити</Link>
                            </div>

                            <div className="p-2 text-white rounded-md">
                                <Link to={`/users/${userID}`}>
                                    Профіль
                                </Link>
                            </div>

                            <div onClick={handleLogOut} className="p-2 text-white rounded-md ">
                                <Link to='/'>
                                    Вихід
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="text-white rounded-md p-4">
                                <Link to='/authenticate'>Вхід</Link>
                            </div>
                        </>
                    )}
                </div>
            </header>
            <Routes>
                <Route path='/' element={<Layout />}>
                    {/* public routes */}
                    <Route index element={<Posts />} />
                    <Route path='authenticate' element={<Auth />} />
                    <Route path='users/:userID' element={<User />} />
                    {/* protected routes */}
                    <Route element={<RequireAuth />}>
                        <Route path='users/:userID/posts' element={<UserPosts />} />
                        <Route path='users/:userID/requests' element={<UserRequests />} />
                        <Route path='users/:userdID/posts/:postID/requests' element={<PostRequests />} />
                        <Route path='users/:userID/trips/future' element={<Future />} />
                        <Route path='users/:userID/trips/finished' element={<Finished />} />
                        <Route path='users/:userID/trips/future/:tripID/members' element={<FutureMembers />} />
                        <Route path='users/:userID/trips/finished/:tripID/members' element={<FinishedMembers />} />
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default Navigation