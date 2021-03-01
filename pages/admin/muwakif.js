import {authPage} from '../../middlewares/authorizationPage'
import {useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import {convertRupiah} from '../../myLibrary/convert_rupiah'
import {convertTgl} from '../../myLibrary/convert_tgl'


export async function getServerSideProps(ctx) {
   
        const auth = await authPage(ctx);

        return {props : {}}

}


export default function muwakif() {

    const [muwakiftable,
        useMuwakifTable] = useState([]);
    const [prefetch,
        usePrefetch] = useState(false)

    const [dateFrom, useDateFrom] = useState(null);
    const [endDate, useEndDate] = useState(null);

    async function getDataAPi() {
        const donasi = {
            endDate
        }

        const search = await fetch('../api/muwakif/search/' + dateFrom, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(donasi)
        })

        const resultSearch = await search.json();
        useMuwakifTable(resultSearch.data)
    }



    const handleSearch = async() => {
        
        const donasi = {
            endDate
        }

        const search = await fetch('../api/muwakif/search/' + dateFrom, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(donasi)
        })

        const resultSearch = await search.json();
        Swal.fire({title: resultSearch.type, icon: resultSearch.type, text: resultSearch.message})
        useMuwakifTable(resultSearch.data)
        // usePrefetch(!prefetch)
    }


    const handleAcc = async(id, jumlahdonasi, muwakif) => {
        const donasi = {
            jumlahdonasi,
            idmuwakif: muwakif
        }

        const updateCampaign = await fetch('../api/muwakif/update/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(donasi)
        })

        const restUpdateCampaign = await updateCampaign.json();
        Swal.fire({title: restUpdateCampaign.type, icon: restUpdateCampaign.type, text: restUpdateCampaign.message})
        usePrefetch(!prefetch)

    }

    useEffect(() => {
        getDataAPi()       
    }, [prefetch])

    console.log(muwakiftable)

    let content = null
    if (muwakiftable === null) {
        content = <div className="h-screen flex justify-center items-center content-center">
            konten loading
        </div>
    } else {
        content = <div className="flex justify-center mt-28 flex-col">
            <div className="my-6 flex w-full lg:w-2/5 flex-col md:flex-row">
                <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="datetime-local"
                    onChange={e=> useDateFrom(e.target.value)}
                    ></input>

                <input
                    className="my-4 lg:my-0 lg:mx-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="datetime-local"
                    onChange={e=> useEndDate(e.target.value)}
                ></input>
                <button
                    onClick={handleSearch}
                    className="w-20 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button">
                    Cari
                </button>
            </div>
            <table className="border-collapse w-full">
                <thead>
                    <tr>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Id</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">campaign</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">tanggal</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Nama</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">NoHp</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Email</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Nominal</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Status</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {muwakiftable
                        .map((i, index) => {
                            // let id = 0
                            return <tr
                                key={i.id}
                                className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                                <td
                                    className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Id</span>
                                    {index + 1}
                                </td>
                                <td
                                    className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">campaign</span>
                                    {i.slug}
                                </td>
                                <td
                                    className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">tanggal</span>
                                    {convertTgl(i.created_at)}
                                </td>
                                <td
                                    className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Nama</span>
                                    {i.nama}
                                </td>
                                <td
                                    className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">NoHp</span>
                                    {i.nohp}
                                </td>
                                <td
                                    className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Email</span>
                                    {i.email}
                                </td>
                                <td
                                    className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Nominal</span>
                                    {convertRupiah(i.jumlahdonasi)}
                                </td>
                                <td
                                    className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Status</span>
                                    {i.status === 'success'
                                        ? <span className="rounded bg-green-400 py-1 px-3 text-xs font-bold text-white">{i.status}</span>
                                        : <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold text-white">{i.status}</span>
}
                                </td>
                                <td
                                    className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
                                    {i.status === 'success'
                                        ? <span className="rounded bg-green-400 py-1 px-3 text-xs font-bold text-white">success</span>
                                        : <button
                                            onClick={e => handleAcc(i.idcampaign, i.jumlahdonasi, i.id)}
                                            className="rounded bg-red-400 py-1 px-3 text-xs font-bold text-white">Accept</button>
}

                                </td>
                            </tr>
                        })}
                </tbody>

            </table>

        </div>
    }

    return (
        <div className="container mx-auto px-4">
            {content}
        </div>
    )
}