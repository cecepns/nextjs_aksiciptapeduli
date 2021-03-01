import {authPage} from '../../middlewares/authorizationPage'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import {useState} from 'react'
import Child from '../../component/backend/child_campaigninput'

export async function getServerSideProps(ctx) {

    const auth = await authPage(ctx);

    // const getCampaign = await fetch('https://aksiciptapeduli.org/api/campaign')
    const getCampaign = await fetch('http://localhost:3000/api/campaign')
    const result = await getCampaign.json()

    return {
        props: {
            campaign: result
        }
    }

}

export default function Campaign({campaign}) {

    // console.log(campaign)

    const [updateState,
        setUpdate] = useState({
        id: '',
        fundraiser: '',
        judul: '',
        deskripsi: '',
        target: '',
        daritanggal: '',
        sampaitanggal: ''
    })

    const [create,
        useCreate] = useState(false)

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
                    fetch('../api/campaign/delete/' + e, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': 'Bearer ' + Cookies.get('token')
                        }
                    })
                      .then(response => response.json()
                      .then(result => Swal.fire({title: result.type, icon: result. type, text: result.message})))
                }
            })
    }
    const handleUpdate = (e) => {
        useCreate(true)
        let startDate = e
                .daritanggal
                .match(/\d+/g),
            year = startDate[0],
            month = startDate[1],
            day = startDate[2];

        let endDate = e
                .sampaitanggal
                .match(/\d+/g),
            eyear = endDate[0],
            emonth = endDate[1],
            eday = endDate[2];

        let ValueStartDate = year + '-' + month + '-' + day;
        let ValueEndDate = eyear + '-' + emonth + '-' + eday;

        setUpdate({
            id: e.id,
            fundraiser: e.fundraiser,
            judul: e.judul,
            deskripsi: e.deskripsi,
            target: e.target,
            daritanggal: ValueStartDate,
            sampaitanggal: ValueEndDate
        })

    }

    const handleCreate = e => {
        useCreate(e)
        setUpdate({
            id: '',
            fundraiser: '',
            judul: '',
            deskripsi: '',
            target: '',
            daritanggal: '',
            sampaitanggal: ''
        })
    }

    return (
        <div className="container mx-auto px-4 pt-20 sm:pt-36">

            {create
                ? <Child
                        callback={handleCreate}
                        token={Cookies.get('token')}
                        update={updateState}/>
                : ""}

            <button
                className="my-4 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={e => useCreate(true)}>
                Buat Campaign
            </button>
            {/* <Form token={Cookies.get('token')} update={updateState}/> */}
            <table className="border-collapse w-full">
                <thead>
                    <tr>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Id</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Fundraiser</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Judul</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Deskripsi</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Target</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Terkumpul</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Tgl Mulai</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Tgl Akhir</th>
                        <th
                            className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {campaign
                        .data
                        .map((i, index) => {
                            let datePart = i
                                    .daritanggal
                                    .match(/\d+/g),
                                year = datePart[0],
                                month = parseInt(datePart[1]),
                                day = datePart[2];

                            let endDate = i
                                    .sampaitanggal
                                    .match(/\d+/g),
                                eyear = endDate[0],
                                emonth = parseInt(datePart[1]),
                                eday = endDate[2];

                            let ValueStartDate = day + '-' + month + '-' + year;
                            let ValueEndDate = eday + '-' + emonth + '-' + eyear;

                            return <tr
                                key={index}
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
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Fundraiser</span>
                                    {i.fundraiser}
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
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Target</span>
                                    {i.target}
                                </td>
                                <td
                                    className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Terkumpul</span>
                                    {i.terkumpul >= i.target
                                        ? <span className="rounded bg-green-400 py-1 px-3 text-xs font-bold text-white">
                                                {i.terkumpul}
                                            </span>
                                        : <span className="rounded bg-yellow-200 py-1 px-3 text-xs font-bold text-white">
                                            {i.terkumpul}
                                        </span>
}
                                </td>
                                <td
                                    className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Tanggal Mulai</span>
                                    {ValueStartDate}
                                </td>
                                <td
                                    className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Tanggal Akhir</span>
                                    {ValueEndDate}
                                </td>
                                <td
                                    className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                                    <span
                                        className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Aksi</span>
                                    <div className="flex justify-center">
                                        <button
                                            onClick={e => handleDelete(i.image)}
                                            className="rounded bg-red-600 py-1 px-3 text-xs font-bold text-white">delete</button>&nbsp;|&nbsp;
                                        <button
                                            onClick={e => handleUpdate(i)}
                                            className="rounded bg-green-400 py-1 px-3 text-xs font-bold text-white">update</button>
                                    </div>
                                </td>
                            </tr>
                        })}
                </tbody>
            </table>
        </div>
    )
}