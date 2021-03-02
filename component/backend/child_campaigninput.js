import Swal from 'sweetalert2'
import {useState, useEffect} from 'react'
import dynamic from 'next/dynamic'

const Editor = dynamic(() => import ('./child_editor'), {
    ssr: false,
    loading: () => <p>Loading Boy...</p>
})

export default function handler({token, callback, update}) {

    useEffect(() => {
        useId(update.id)
        useCampaign(update.judul)
        useDeskripsi(update.deskripsi)
        useTargetDonation('Rp.' + update.target)
        useStartDate(update.daritanggal)
        useEndDate(update.sampaitanggal)
    }, []);
    

    const [idUpdate,
        useId] = useState('')

        const [File,
        useFile] = useState('')
        const [Campaign,
            useCampaign] = useState('')
    const [Deskripsi,
        useDeskripsi] = useState('')
        const [TargetDonation,
        useTargetDonation] = useState('')
    const [StartDate,
        useStartDate] = useState('')
    const [EndDate,
        useEndDate] = useState('')

    const handleDeskripsi = (e)=> {
        useDeskripsi(e)
        // console.log(e)
    }

    // console.log(Deskripsi)

    const convertToRupiah = (angka, prefix) => {
        var number_string = angka
                .replace(/[^,\d]/g, '')
                .toString(),
            split = number_string.split(','),
            sisa = split[0].length % 3,
            rupiah = split[0].substr(0, sisa),
            ribuan = split[0]
                .substr(sisa)
                .match(/\d{3}/gi);

        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if (ribuan) {
            const separator = sisa
                ? '.'
                : '';
            rupiah += separator + ribuan.join('.');
        }

        rupiah = split[1] != undefined
            ? rupiah + ',' + split[1]
            : rupiah;
        useTargetDonation(prefix == undefined
            ? rupiah
            : (rupiah
                ? 'Rp. ' + rupiah
                : ''))
    }

    const handleSubmit = async() => {

        if (Campaign.length < 1 || Deskripsi.length < 1 || TargetDonation.length < 1) {
            return Swal.fire({title: 'error', icon: 'error', text: 'kolom harus di isi'})
        }

        const formData = new FormData();
        formData.append("image", File);
        formData.append("judul", Campaign);
        formData.append("fundraiser", "Acp");
        formData.append("slug", Campaign.toLowerCase().replace(/ /g, '-'));
        formData.append("deskripsi", Deskripsi);
        formData.append("target", parseInt(TargetDonation.replace(/,.*|[^0-9]/g, ''), 10));
        formData.append("terkumpul", "0");
        formData.append("daritanggal", StartDate);
        formData.append("sampaitanggal", EndDate);

        const postCampaign = await fetch('../api/campaign/create', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: formData
        })

        const respostCampaign = await postCampaign.json();
        if (respostCampaign.type === 'success') {
            useFile('')
            useCampaign('')
            useDeskripsi('')
            useTargetDonation('')
            useStartDate('')
            useEndDate('')
            callback(false)
        }
        Swal.fire({title: respostCampaign.type, icon: respostCampaign.type, text: respostCampaign.message})

        console.log(respostCampaign.message)
    }

    const handleUpdate = async() => {
        // const formData = new FormData(); formData.append("judul", Campaign);
        // formData.append("deskripsi", Deskripsi); formData.append("target",
        // parseInt(TargetDonation.replace(/,.*|[^0-9]/g, ''), 10));
        // formData.append("daritanggal", StartDate); formData.append("sampaitanggal",
        // EndDate);

        const dataUpdate = {
            judul: Campaign,
            deskripsi: Deskripsi,
            target: parseInt(TargetDonation.replace(/,.*|[^0-9]/g, ''), 10),
            daritanggal: StartDate,
            sampaitanggal: EndDate
        }

        const updateCampaign = await fetch('../api/campaign/update/' + idUpdate, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUpdate)
        })

        const restUpdateCampaign = await updateCampaign.json();
        if (restUpdateCampaign.type === 'success') {
            useId('')
            useCampaign('')
            useDeskripsi('')
            useTargetDonation('')
            useStartDate('')
            useEndDate('')
            callback(false)
        }
        Swal.fire({title: restUpdateCampaign.type, icon: restUpdateCampaign.type, text: restUpdateCampaign.message})

    }

    const handleCancel = ()=> {
        callback(false)
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
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-96 overflow-y-auto">

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/4">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Image
                                </label>
                            </div>
                            <div className="md:w-full">
                                <input
                                    onChange={e => useFile(e.target.files[0])}
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    type="file"/>
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/4">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Campaign
                                </label>
                            </div>
                            <div className="md:w-full">
                                <input
                                    value={Campaign}
                                    onChange={e => useCampaign(e.target.value)}
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
                                <Editor text={handleDeskripsi} deskripsi={Deskripsi}/>
                                {/* <textarea
                                    value={Deskripsi}
                                    onChange={e => useDeskripsi(e.target.value)}
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="inline-full-name"
                                    type="text"/> */}
                            </div>
                        </div>

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/4">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Target
                                </label>
                            </div>
                            <div className="md:w-full">
                                <input
                                    value={TargetDonation}
                                    onChange={e => convertToRupiah(e.target.value, 'Rp. ')}
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="inline-full-name"
                                    type="text"/>
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/4">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Mulai
                                </label>
                            </div>
                            <div className="md:w-full">
                                <input
                                    value={StartDate}
                                    onChange={e => useStartDate(e.target.value)}
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="inline-full-name"
                                    type="date"/>
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/4">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Berakhir
                                </label>
                            </div>
                            <div className="md:w-full">
                                <input
                                    value={EndDate}
                                    onChange={e => useEndDate(e.target.value)}
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="inline-full-name"
                                    type="date"/>
                            </div>
                        </div>

                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        {idUpdate.length < 1

                            ? <button
                                    onClick={handleSubmit}
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-500 text-base font-medium text-white hover:bg-purple-400 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm">
                                    Create
                                </button>
                            : <button
                                onClick={handleUpdate}
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-400 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm">
                                Update
                            </button>}
                        <button
                            onClick={handleCancel}
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