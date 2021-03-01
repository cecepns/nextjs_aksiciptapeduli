import {useState} from 'react'
import Swal from 'sweetalert2'
import Head from 'next/head'
import Router from 'next/router'
import Cookie from 'js-cookie'
import {unauthPage} from '../middlewares/authorizationPage'

export async function getServerSideProps(ctx) {

    await unauthPage(ctx)
    return {props: {}}

}

export default function Login() {

    // Register State
    const [formEmail,
        useEmail] = useState('')
    const [formPassword,
        usePassword] = useState('')
    const [loading,
        useLoading] = useState(false)

    const submitLogin = async() => {
        useLoading(true)
        if (formEmail.length < 1 || formPassword.length < 1) {
            Swal.fire({title: 'error', icon: 'error', text: 'kolom tidak boleh kosong'})
            useLoading(false)
        } else {

            const postLogin = {
                email: formEmail,
                password: formPassword
            }

            const login = await fetch('api/auth/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postLogin)
            })

            const resLogin = await login.json();
            Swal.fire({title: resLogin.type, icon: resLogin.type, text: resLogin.message})
            console.log(resLogin)
            if (resLogin.type === 'success') {
                Cookie.set('token', resLogin.token)
                Router.push('/admin')
                useEmail('')
                usePassword('');
            }
        }

        useLoading(false)

    }

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            submitLogin();
        }
    }

    return (

        <div className="h-screen flex justify-center align-center">
            <Head>
                <title>Login Aksi Cipta Peduli</title>
                <meta
                    property="og:title"
                    content="Login Aksi Cipta Peduli"
                    key="Login Aksi Cipta Peduli"/>
            </Head>
            <div className="max-w-xs w-full m-auto bg-indigo-100 rounded p-5">
                <header>
                    <img
                        className="w-20 mx-auto mb-5"
                        src="https://img.icons8.com/fluent/344/year-of-tiger.png"/>
                </header>

                <div>
                    <label className="block mb-2 text-indigo-500">Email</label>
                    <input
                        className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                        type="text"
                        value={formEmail}
                        name="email"
                        onChange={e => useEmail(e.target.value)}></input>
                </div>
                <div>
                    <label className="block mb-2 text-indigo-500">Password</label>
                    <input
                        className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                        type="password"
                        value={formPassword}
                        name="password"
                        onKeyUp={handleEnter}
                        onChange={e => usePassword(e.target.value)}></input>
                </div>
                <div>
                    <button
                        className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded disabled"
                        type="submit"
                        onClick={submitLogin}
                        disabled={loading
                        ? "true"
                        : ""}>
                        {loading
                            ? "Loading..."
                            : "Login"}
                    </button>
                </div>
                <footer>
                    <div className="pb-4">
                        <a className="text-indigo-700 hover:text-pink-700 text-sm float-left" href="#">Forgot Password?</a>
                        <button
                            className="text-indigo-700 hover:text-pink-700 text-sm float-right"
                            onClick={() => Router.push('register')}>Register</button>
                    </div>
                </footer>
            </div>
        </div>
    )
}
