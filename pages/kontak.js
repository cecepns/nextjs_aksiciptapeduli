export default function Contact() {
    return (
        <div
            className="bg-gray-100 lg:px-12 w-full h-screen flex flex-col justify-center items-center">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 lg:text-center">
                <h3
                    className="mt-5 text-3xl font-extrabold text-gray-700 sm:text-4xl sm:leading-normal">
                    Kontak
                </h3>
                <p className="my-4 max-w-2xl text-gray-500 lg:mx-auto">
                    Kontak & Alamat Aksi Cipta Peduli
                </p>
            </div>

            <div className="py-12 bg-white w-full">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mt-2">
                        <ul className="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            <li>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div
                                            className="flex items-center justify-center h-12 w-12 rounded-md bg-lime text-white">

                                            <svg className="svg-icont fill-current text-white p-1" viewBox="0 0 20 20">
                                                <path
                                                    d="M13.372,1.781H6.628c-0.696,0-1.265,0.569-1.265,1.265v13.91c0,0.695,0.569,1.265,1.265,1.265h6.744c0.695,0,1.265-0.569,1.265-1.265V3.045C14.637,2.35,14.067,1.781,13.372,1.781 M13.794,16.955c0,0.228-0.194,0.421-0.422,0.421H6.628c-0.228,0-0.421-0.193-0.421-0.421v-0.843h7.587V16.955z M13.794,15.269H6.207V4.731h7.587V15.269z M13.794,3.888H6.207V3.045c0-0.228,0.194-0.421,0.421-0.421h6.744c0.228,0,0.422,0.194,0.422,0.421V3.888z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg leading-6 tracking-wide font-medium text-gray-900">
                                            Bapak Arief Luqmananto</h4>
                                        <p className="mt-2 text-lg leading-6 tracking-wide font-light text-gray-500">
                                            0856 3325 312
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="mt-10 md:mt-0">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div
                                            className="flex items-center justify-center h-12 w-12 rounded-md bg-lime text-white">
                                            {/* <FontAwesomeIcon icon={faPhoneAlt} size="lg"/> */}
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg leading-6 tracking-wide font-medium text-gray-900">Ibu Siti Durry</h4>
                                        <p className="mt-2 text-lg leading-6 tracking-wide font-light text-gray-500">
                                            0822 6222 0924
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="mt-10 md:mt-0">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div
                                            className="flex items-center justify-center h-12 w-12 rounded-md bg-lime text-white">

                                            <svg className="svg-icon fill-current text-white p-1" viewBox="0 0 20 20">
                                                <path
                                                    d="M10,1.375c-3.17,0-5.75,2.548-5.75,5.682c0,6.685,5.259,11.276,5.483,11.469c0.152,0.132,0.382,0.132,0.534,0c0.224-0.193,5.481-4.784,5.483-11.469C15.75,3.923,13.171,1.375,10,1.375 M10,17.653c-1.064-1.024-4.929-5.127-4.929-10.596c0-2.68,2.212-4.861,4.929-4.861s4.929,2.181,4.929,4.861C14.927,12.518,11.063,16.627,10,17.653 M10,3.839c-1.815,0-3.286,1.47-3.286,3.286s1.47,3.286,3.286,3.286s3.286-1.47,3.286-3.286S11.815,3.839,10,3.839 M10,9.589c-1.359,0-2.464-1.105-2.464-2.464S8.641,4.661,10,4.661s2.464,1.105,2.464,2.464S11.359,9.589,10,9.589"></path>
                                            </svg>

                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg leading-6 tracking-wide font-medium text-gray-900">Alamat Kantor</h4>
                                        <p className="mt-2 text-lg leading-6 tracking-wide font-light text-gray-500">
                                        Jl. Manyeti No.6 RT 05/01 Kp.Cikadu Desa Manyeti, <br/> Kec. Dawuan, Kab. Subang, Provinsi Jawa Barat.
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="mt-10 md:mt-0">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div
                                            className="flex items-center justify-center h-12 w-12 rounded-md bg-lime text-white">

                                            {/* <FontAwesomeIcon icon={faPhoneAlt} size="lg"/> */}

                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg leading-6 tracking-wide font-medium text-gray-900">Customer Service 2</h4>
                                        <p className="mt-2 text-lg leading-6 tracking-wide font-light text-gray-500">
                                            0811 1111 2249
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}
