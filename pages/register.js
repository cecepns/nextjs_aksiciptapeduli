import {useState} from 'react';
import Swal from 'sweetalert2'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Register() {
    const router = useRouter()

    // Register State
    const [formEmail,
        useEmail] = useState('')
    const [formPassword,
        usePassword] = useState('')

    const submitRegist = async() => {
        if (formEmail.length < 1 || formPassword.length < 1) {
            return Swal.fire({title: 'error', icon: 'error', text: 'kolom tidak boleh kosong'})
        }

        if (!formEmail.includes("@")) {
            return Swal.fire({title: 'error', icon: 'error', text: 'alamat email tidak valid'})
        }

        if (formPassword.length < 5) {
            return Swal.fire({title: 'error', icon: 'error', text: 'Password minimal 5 karakter'})
        }

        const postRegist = {
            email: formEmail,
            password: formPassword
        }

        const register = await fetch('api/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postRegist)
        })

        const resRegister = await register.json();
        Swal.fire({title: resRegister.type, icon: resRegister.type, text: resRegister.message})
        console.log(resRegister)
        useEmail('')
        usePassword('');

    }

    console.log(formEmail)
    return (

        <div className="h-screen flex justify-center align-center">
            <Head>
                <title>Register Aksi Cipta Peduli</title>
                <meta
                    property="og:title"
                    content="Register Aksi Cipta Peduli"
                    key="Register Aksi Cipta Peduli"/>
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
                        onChange={e => usePassword(e.target.value)}></input>
                </div>
                <div>
                    <button
                        className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
                        type="submit"
                        onClick={submitRegist}>
                        Daftar
                    </button>
                </div>
                <footer>
                    <div className="pb-4">
                        <button className="text-indigo-700 hover:text-pink-700 text-sm float-right" onClick={() => router.push('login')}>Login</button>
                    </div>
                </footer>
            </div>
        </div>
    )
}
