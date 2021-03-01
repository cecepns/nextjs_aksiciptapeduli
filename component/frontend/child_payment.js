import Swal from 'sweetalert2'
export default function childPayment({donasi, type}) {

    console.log(type)
    const handleCopy = (e) => {

        let textField = document.createElement('textarea')
        textField.innerText = '2010000117'
        document
            .body
            .appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        Swal.fire({title: 'success', icon: 'success', text: 'nomor rekening berhasil di copy'})

    }

    return (
        <div>
            {type === "QRIS"
                ? <div>
                        <div className="m-auto pt-6 overflow-hidden w-1/2 h-1/2">
                            <img src="/img/assets/QRIS.jpg" className="w-full" alt="no image"/>
                        </div>
                        <div className="mx-4 text-center">
                            <p className="my-4">
                                <span className="text-3xl font-bold ">
                                    {donasi}
                                </span>
                            </p>
                            <p className="text-center text-gray-500 mb-2">
                                Scan Qr Code tersebut menggunakan Gopay/Ovo/ShopeePay dan kirim sesuai nominal
                                yang tertera
                            </p>
                        </div>
                    </div>
                : <div>
                    <div className="m-auto pt-2 overflow-hidden w-1/2 h-1/2">
                        <img src="/img/assets/bsm.png" className="w-full" alt="no image"/>
                    </div>
                    <div className="mx-4 text-center">
                        <p className="my-4 flex justify-center">
                            <span onClick={handleCopy} className="text-3xl text-pinkacp font-bold ">
                                2010000117
                            </span>

                            <svg
                                onClick={handleCopy}
                                className="cursor-pointer ml-3 mt-2 opacity-75"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"><path d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z"/></svg>

                        </p>
                        <p className="my-4">
                            <span className="text-3xl font-bold ">
                                {donasi}
                            </span>
                        </p>
                        <p className="text-center text-gray-500 mb-2">
                            silahkan transfer sesuai nominal ke nomor rekening yang tertera
                        </p>
                    </div>
                </div>
}
        </div>
    )
}