import style from '../component/frontend/campaign.module.scss'
import {useRouter} from 'next/router'
import {convertRupiah} from '../myLibrary/convert_rupiah'
import {convertPersen} from '../myLibrary/convert_persen'
import ReactPaginate from 'react-paginate';


export async function getServerSideProps({query}) {
    const page = query.page || 1
    // const getCampaign = await fetch('http://localhost:3000/api/campaign')
    // const getCampaign = await fetch('https://aksiciptapeduli.org/api/campaign?per_page=6')
    const getCampaign = await fetch(`http://localhost:3000/api/campaign?per_page=6&page=${page}`)
    const result = await getCampaign.json()

    return {
        props: {
            campaign: result,
            currentPage: page
        }
    }
}

export default function Campaign({campaign, currentPage}) {
    console.log(campaign.total)
    console.log(currentPage)


    const router = useRouter();

    const pagginationHandler = (page) => {
        const currentPath = router.pathname;
        const currentQuery = {
            ...router.query
        };
        currentQuery.page = page.selected + 1;

        router.push({pathname: currentPath, query: currentQuery});

    };

    return (
        <div className="bg-white lg:px-12 py-8">
            <div className="w-full h-20"></div>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 lg:text-center">

                <h3
                    className="text-3xl font-extrabold text-gray-700 sm:text-4xl sm:leading-normal">
                    Campaign
                </h3>
                <p
                    className="mt-2 my-6 max-w-2xl text-gray-500 lg:mx-auto">
                    Berikut merupakan campaign dari Aksi Cipta Peduli
                </p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-between lg:mb-4">
                {campaign
                    .data
                    .map((item, index) => {
                        
                        const widthPersen = {
                            width: convertPersen(item.terkumpul, item.target) + '%'
                          };

                        let judul = item.judul;
                        let deskripsi = item.deskripsi;

                        if (judul.length > 40) {
                            judul = judul.substr(0, 40) + '[...]'
                        }
                        if (deskripsi.length > 100) {
                            deskripsi = deskripsi.substr(0, 100) + '[...]'
                        }
                        
                        let datePart = item
                                .created_at
                                .match(/\d+/g),
                            monthInd = [
                                "",
                                "Januari",
                                "Februari",
                                "Maret",
                                "April",
                                "Mei",
                                "Juni",
                                "Juli",
                                "Agustus",
                                "September",
                                "Oktober",
                                "November",
                                "Desember"
                            ],
                            year = datePart[0],
                            month = parseInt(datePart[1]),
                            newMonth = monthInd[month],
                            day = datePart[2];

                        let ValueTgl = day + '/' + newMonth + '/' + year;

                        return <div
                            key={item.id}
                            className={style.wrapper}
                            onClick={() => router.push({pathname: `campaign/detail/${item.slug}`})}>
                            <div className={style.imgWrap}>
                                <img src={'/img/campaign/' + item.image} alt="afwan tidak ada thumbnail :)"></img>
                                <p className={style.date}>
                                    {ValueTgl}
                                </p>
                            </div>
                            <div className={style.body}>

                                {/*
                                <p
                                    className="text-md mb-1 leading-6 text-indigo-600 font-semibold tracking-wide uppercase">
                                    CAMPAIGN
                                </p> */}

                                <p className={style.title}>
                                    {judul}
                                </p>

                                <div
                                    className={style.desc}
                                    dangerouslySetInnerHTML={{
                                    __html: deskripsi
                                }}/>
                                <hr className="my-2"/> {/* <button
                                    className={style.btnDetails}
                                    onClick={() => router.push({pathname: `campaign/detail/${item.slug}`})}>
                                    Lihat selengkapnya
                                </button> */}
                                <div className="space-y-4 my-2">
                                    <div
                                        className="text-gray-500 dark:text-gray-400 flex justify-between text-sm font-medium tabular-nums">
                                        <div>Terkumpul : <span className="text-lg">{convertRupiah(item.terkumpul)}</span>
                                             
                                        </div>
                                        {/* <div > Target <span className="text-lg"> Rp. {item.target} </span> </div> */}
                                    </div>

                                    <div className="bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            style={widthPersen}
                                            className="bg-lime h-1.5"
                                            role="progressbar"
                                            aria-valuenow="1456"
                                            aria-valuemin="0"
                                            aria-valuemax="4550"></div>
                                    </div>
                                    <div
                                        className="text-gray-500 dark:text-gray-400 flex justify-end text-sm font-medium tabular-nums">
                                        <div>{convertPersen(item.terkumpul, item.target)}% dari :
                                            <span className="text-lg"> {convertRupiah(item.target)} </span>
                                        </div>

                                    </div>
                                    <button
                                        onClick={() => router.push({pathname: `campaign/detail/${item.slug}`})}
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border tracking-wider border-transparent shadow-sm px-4 py-2 bg-pinkacp hover:bg-pinkacp-500 focus:outline-none text-base font-medium text-white sm:text-sm">
                                        Donasi Sekarang
                                    </button>
                                </div>

                            </div>

                        </div>

                    })
}
            </div>
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                activeClassName={'active'}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                initialPage={currentPage - 1}
                pageCount={Math.ceil(campaign.total / 6)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                disableInitialCallback={true}
                onPageChange={pagginationHandler}/>
        </div>
    )
}