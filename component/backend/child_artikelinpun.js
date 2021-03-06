import Swal from 'sweetalert2'
import {useState, useEffect, useCallback} from 'react'
import dynamic from 'next/dynamic'

const Editor = dynamic(() => import ('./child_artikelEditor'), {
    ssr: false,
    loading: () => <p>Loading Boy...</p>
})

export default function handler({show, token, update}) {

    useEffect(() => {
        useId(update.id)
        useImageBefore(update.image)
        useTitle(update.title)
        useDeskripsi(update.deskripsi)
    }, [])

    const [id,
        useId] = useState('')
    const [image,
        useImage] = useState('')
    const [imageBefore,
        useImageBefore] = useState('')
    const [title,
        useTitle] = useState('')
    const [deskripsi,
        useDeskripsi] = useState('')

    const handleDeskripsi = e => useDeskripsi(e)
    const getDeskripsi = useCallback(handleDeskripsi, [])

    const handleSubmit = async() => {
        if (title.length < 1 || deskripsi.length < 1) {
            return Swal.fire({title: 'error', icon: 'error', text: 'kolom harus di isi'})
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("judul", title);
        formData.append("slug", title.toLowerCase().replace(/ /g, '-'));
        formData.append("deskripsi", deskripsi);

        const postCampaign = await fetch('../api/artikel/create', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: formData
        })

        const respostCampaign = await postCampaign.json();
        if (respostCampaign.type === 'success') {
            useImage('')
            useTitle('')
            useDeskripsi('')
            show()
        }
        Swal.fire({title: respostCampaign.type, icon: respostCampaign.type, text: respostCampaign.message})

    }



    const handleUpdate = async ()=> {
        if (id.length < 1 || title.length < 1 || deskripsi.length < 1) {
            return Swal.fire({title: 'error', icon: 'error', text: 'kolom harus di isi'})
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("imageBefore", imageBefore);
        formData.append("judul", title);
        // formData.append("slug", title.toLowerCase().replace(/ /g, '-'));
        formData.append("deskripsi", deskripsi);

        const postCampaign = await fetch('../api/artikel/update/' + id, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: formData
        })

        const respostCampaign = await postCampaign.json();
        if (respostCampaign.type === 'success') {
            useId('')
            useImage('')
            useTitle('')
            useDeskripsi('')
            show()
        }
        Swal.fire({title: respostCampaign.type, icon: respostCampaign.type, text: respostCampaign.message})
    }

    return (
        <div className="fixed z-10 inset-0">
            <div
                className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true">&#8203;</span>

                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline">
                    <div
                        className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-96 overflow-y-auto">

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/4">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Image
                                </label>
                            </div>
                            <div className="md:w-full">
                                <input
                                    onChange={e => useImage(e.target.files[0])}
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    type="file"/>
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/4">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Judul
                                </label>
                            </div>
                            <div className="md:w-full">
                                <input
                                    value={title}
                                    onChange={e => useTitle(e.target.value)}
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    type="text"/>
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/4">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Deskripsi
                                </label>
                            </div>
                            <div className="md:w-full">
                                <Editor sendDeskripsi={getDeskripsi} updateDeskripsi={deskripsi}/>

                            </div>
                        </div>

                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        {id.length < 1
                            ? <button
                                    onClick={handleSubmit}
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-500 text-base font-medium text-white hover:bg-purple-400 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm">
                                    Create
                                </button>
                            : <button
                                onClick={handleUpdate}
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-400 text-base font-medium text-white hover:bg-green-500 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm">
                                update
                            </button>
}

                        <button
                            onClick={show}
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}