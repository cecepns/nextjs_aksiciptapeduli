import {useState, useMemo} from 'react'
import {onchangeRupiah} from '../../../myLibrary/onchange_rupiah'
import Swal from 'sweetalert2'
import ChildPayment from '../../../component/frontend/child_payment'
import childPayment from '../../../component/frontend/child_payment'

export async function getServerSideProps(ctx) {
    const slug = ctx.query.id || null
    const id = ctx.query.idCampaign || null
    
    return {
        props: {
            slug,
            id
        }
    }
    
}



export default function Pembayaran({slug, id}) {
    

    const [idCampaign,
        useIdCampaign] = useState(id)

    const [showPay,
        useShowPay] = useState(false)

    const [showListPay,
        useShowListPay] = useState(false);

    const [nominal,
        useNominal] = useState('Rp. ');
    const [payMethod,
        usePayMethod] = useState('Bank Syariah Mandiri');
    const [nama,
        useNama] = useState('');
    const [nohp,
        useNohp] = useState('');
    const [email,
        useEmail] = useState('');
    const [deskripsi,
        useDeskripsi] = useState('');

    const handleNominalDonation = (e) => {
        useNominal(onchangeRupiah(e))
    }

    const handlePay = (e) => {
        usePayMethod(e)
        useShowListPay(false)
    }

    const handleConfirmDonasi = ()=> {
        window.open('https://wa.me/6282320617770')
    }

    // const midtrans = async() => {     const post = await
    // fetch('../../api/payment')     const result = await post.json();
    // Swal.fire({title: result.type, icon: result.type, text: result.message})
    // window.open(result.url) }

    const handleSubmitDonasi = async() => {

        if (nominal.length < 4 || deskripsi.length < 1 || nama.length < 1 || nohp.length < 1 || deskripsi.length < 1 || email.length < 1) {
            return Swal.fire({title: 'error', icon: 'error', text: 'kolom wajib diisi'})

        }

        const data = {
            idCampaign,
            slug,
            nama,
            email,
            nohp,
            jumlahdonasi: parseInt(nominal.replace(/,.*|[^0-9]/g, ''), 10),
            jenispembayaran: payMethod,
            deskripsi
        }

        const updateCampaign = await fetch('../../api/muwakif/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const restUpdateCampaign = await updateCampaign.json();
        if (restUpdateCampaign.type === 'success') {
            useIdCampaign('')
            useNama('')
            // useNominal('Rp. ')
            // usePayMethod('Bank Syariah Mandiri')
            useNohp('')
            useEmail('')
            useDeskripsi('')
            useShowPay(true)
        }
        Swal.fire({title: restUpdateCampaign.type, icon: restUpdateCampaign.type, text: restUpdateCampaign.message})

    }

    // console.log(payMethod)

    // const Memorize = useMemo(()=>{ <childPayment donasi={nominal} type={payMethod}/>},[]) 

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div
                className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-200"></div>
                </div>

                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true">&#8203;</span>

                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline">
                    {showPay
                        ? 

                        <ChildPayment donasi={nominal} type={payMethod}/>
                        // <Memorize donasi={nominal} type={payMethod}/>

                        : <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                            <div className="sm:flex sm:items-start">

                                <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                        {"AYO BANTU #" + slug}
                                    </h3>
                                    <div className="mt-4">

                                        <input
                                            value={nominal}
                                            onChange={e => handleNominalDonation(e.target.value)}
                                            type="text"
                                            placeholder="Rp"
                                            className="w-full text-2xl font-bold text-black mt-2 mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-indigo-300"/>
                                    </div>

                                    <div>

                                        <div className="mt-1 relative">
                                            <button
                                                onClick={() => useShowListPay(!showListPay)}
                                                type="button"
                                                aria-haspopup="listbox"
                                                aria-expanded="true"
                                                aria-labelledby="listbox-label"
                                                className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-300  sm:text-sm">
                                                <span className="flex items-center">
                                                    {payMethod === 'Bank Syariah Mandiri'
                                                        ? <img src="/img/assets/bsm.png" alt="" className="flex-shrink-0 h-6 w-10"/>
                                                        : <img src="/img/assets/gopey.png" alt="" className="flex-shrink-0 h-6 w-10"/>
}
                                                    <span className="ml-3 block truncate">
                                                        {payMethod
}
                                                    </span>
                                                </span>
                                                <span
                                                    className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                    <svg
                                                        className="h-5 w-5 text-gray-400"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        aria-hidden="true">
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                                            clip-rule="evenodd"/>
                                                    </svg>
                                                </span>
                                            </button>

                                            {showListPay
                                                ? <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
                                                        <ul
                                                            role="listbox"
                                                            aria-labelledby="listbox-label"
                                                            aria-activedescendant="listbox-item-3"
                                                            className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">

                                                            <li
                                                                onClick={e => handlePay('Bank Syariah Mandiri')}
                                                                id="listbox-item-0"
                                                                role="option"
                                                                className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                                                                <div className="flex items-center">
                                                                    <img src="/img/assets/bsm.png" alt="" className="flex-shrink-0 h-6 w-10"/>
                                                                    <span className="ml-3 block font-normal truncate">
                                                                        Bank Syariah Mandiri
                                                                    </span>
                                                                </div>

                                                                {payMethod === 'Bank Syariah Mandiri'
                                                                    ? <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                                            <svg
                                                                                className="h-5 w-5"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                viewBox="0 0 20 20"
                                                                                fill="currentColor"
                                                                                aria-hidden="true">
                                                                                <path
                                                                                    fill-rule="evenodd"
                                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                    clip-rule="evenodd"/>
                                                                            </svg>
                                                                        </span>
                                                                    : ''}

                                                            </li>
                                                            <li
                                                                onClick={e => handlePay('QRIS')}
                                                                id="listbox-item-0"
                                                                role="option"
                                                                className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                                                                <div className="flex items-center">
                                                                    <img src="/img/assets/gopey.png" alt="" className="flex-shrink-0 h-6 w-10"/>
                                                                    <span className="ml-3 block font-normal truncate">
                                                                        QRIS (Gopay, Ovo, Dana, ShopeePay)
                                                                    </span>
                                                                </div>

                                                                {payMethod === 'QRIS'
                                                                    ? <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                                            <svg
                                                                                className="h-5 w-5"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                viewBox="0 0 20 20"
                                                                                fill="currentColor"
                                                                                aria-hidden="true">
                                                                                <path
                                                                                    fill-rule="evenodd"
                                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                                    clip-rule="evenodd"/>
                                                                            </svg>
                                                                        </span>
                                                                    : ''}
                                                            </li>

                                                        </ul>
                                                    </div>
                                                : ""
}
                                        </div>
                                    </div>

                                    <div className="mt-4 flex">
                                        <input
                                            value={nama}
                                            onChange={e => useNama(e.target.value)}
                                            type="text"
                                            placeholder="Nama Lengkap"
                                            className="w-full mt-2 mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-indigo-300"/>
                                    </div>
                                    <div className="mt-4 flex">
                                        <input
                                            value={nohp}
                                            onChange={e => useNohp(e.target.value)}
                                            type="text"
                                            placeholder="Nomor Ponsel"
                                            className="mr-2 w-full mt-2 mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-indigo-300"/>
                                        <input
                                            value={email}
                                            onChange={e => useEmail(e.target.value)}
                                            type="text"
                                            placeholder="Email"
                                            className="w-full mt-2 mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-indigo-300"/>
                                    </div>

                                    <div className="mt-4">
                                        <textarea
                                            value={deskripsi}
                                            onChange={e => useDeskripsi(e.target.value)}
                                            type="text"
                                            placeholder="Berdoa di donasi ini"
                                            className="w-full mt-2 mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-indigo-300"/>
                                    </div>

                                </div>
                            </div>
                        </div>
}

                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        {showPay
                            ? <button
                                    onClick={handleConfirmDonasi}
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white sm:text-sm">
                                    Konfirmasi Donasi

                                </button>
                            : <button
                                onClick={handleSubmitDonasi}
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pinkacp hover:bg-pinkacp-500 text-base focus:outline-none font-medium text-white sm:text-sm">
                                Lanjutkan Pembayaran

                            </button>
}

                    </div>

                </div>
            </div>
        </div>
    )
}