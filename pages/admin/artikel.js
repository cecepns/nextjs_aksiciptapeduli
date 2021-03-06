import {useState, useEffect, useCallback} from 'react'
import ChildInput from '../../component/backend/child_artikelinpun'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import Router from 'next/router'

export default function Artikel() {

    const [prefetch,
        usePrefetch] = useState(false)

    const [artikel,
        setArtikel] = useState(null)

    const [createArtikel,
        useCreateArtikel] = useState(false)

    const [updateState,
        setUpdateState] = useState({id: '', image: '', title: '', deskripsi: ''})

    const handleShowCreateArtikel = () => {
        usePrefetch(!prefetch)
        setUpdateState({id: '', image: '', title: '', deskripsi: ''})
        useCreateArtikel(!createArtikel)
    }

    const showArticle = useCallback(handleShowCreateArtikel, [createArtikel])

    // ====================== FUNCTION GET DATA ===========================//
    async function getArtikel(params) {
        const get = await fetch('../api/artikel/')
        const result = await get.json()
        setArtikel(result.data)
    }

    console.log(artikel)

    useEffect(() => {
        getArtikel()
    }, [prefetch])

    const handleUpdate = e => {
        useCreateArtikel(!createArtikel)
        setUpdateState({id: e.id, image: e.image, title: e.judul, deskripsi: e.deskripsi})
    }

    const handleDelete = (e) => {
        Swal
            .fire({
            title: 'Apakah anda yakin?',
            text: "data akan dihapus permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Batal',
            confirmButtonText: 'Hapus'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch('../api/artikel/delete/' + e, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': 'Bearer ' + Cookies.get('token')
                        }
                    }).then(response => response.json().then(result => Swal.fire({title: result.type, icon: result.type, text: result.message})))

                    usePrefetch(!prefetch)

                }
            })
    }

    let content = null
    if (artikel === null) {
        content = <div className="h-screen flex justify-center items-center content-center">
            konten loading
        </div>
    } else {
        content =         <div className="container mx-auto px-4 pt-20 sm:pt-36">

            {createArtikel
                ? <ChildInput
                        show={showArticle}
                        token={Cookies.get('token')}
                        update={updateState}/>
                : ""}

            <button
                className="my-4 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={handleShowCreateArtikel}>
                Buat Artikel
            </button>
            <table className="border-collapse w-full">

                <thead>
                    <tr>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Id</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Image</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Judul</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">deskripsi</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {artikel.map((i, index) => {
                        return <tr
                            key={index}
                            className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                            <td
                                className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                <span
                                    className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">ID</span>
                                {index + 1}
                            </td>
                            <td
                                className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                <span
                                    className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">image</span>
                                <button
                                    onClick={() => Router.push('../img/artikel/' + i.image)}
                                    className="rounded bg-blue-600 py-1 px-3 text-xs font-bold text-white">lihat gambar</button>
                            </td>
                            <td
                                className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                <span
                                    className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Judul</span>
                                {i.judul}
                            </td>
                            <td
                                className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                <span
                                    className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Deskripsi</span>
                                <div
                                    dangerouslySetInnerHTML={{
                                    __html: i.deskripsi
                                }}/>
                            </td>
                            <td
                                className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                <span
                                    className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Aksi</span>
                                <button
                                    onClick={e => handleDelete(i.id)}
                                    className="rounded bg-red-600 py-1 px-3 text-xs font-bold text-white">delete</button>&nbsp;|&nbsp;
                                <button
                                    onClick={e => handleUpdate(i)}
                                    className="rounded bg-green-400 py-1 px-3 text-xs font-bold text-white">update</button>
                            </td>
                        </tr>

                    })}

                </tbody>
            </table>
        </div>
    }

    return (
        <div>
            {content}
        </div>
    )
}