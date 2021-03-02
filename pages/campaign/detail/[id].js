import Head from 'next/head'
import Router from 'next/router'
import {convertPersen} from '../../../myLibrary/convert_persen'
import {convertRupiah} from '../../../myLibrary/convert_rupiah'

export async function getServerSideProps(ctx) {

    const slug = ctx.query.id
    const getCampaign = await fetch('https://test.aksiciptapeduli.org/api/campaign/search/' + slug)
    // const getCampaign = await fetch('https://aksiciptapeduli.org/api/campaign/search/' + slug)
    // const getCampaign = await fetch('http://localhost:3000/api/campaign/search/' + slug)
    const result = await getCampaign.json()

    return {
        props: {
            campaign: result
        }
    }

}

export default function campaign({campaign}) {
    console.log(campaign)

    let content = null

    if (campaign.data.length > 0) {
        content = <div>
            {campaign
                .data
                .map(i => {

                    const widthPersen = {
                        width: convertPersen(i.terkumpul, i.target) + '%'
                      };


                    return <div key={i.id} className="flex flex-col items-start">
                        <Head>
                            <title>{i.judul}</title>
                            <meta property="og:title" content={i.judul} key={i.judul}/>
                        </Head>
                        <div>
                            <img src={'/img/campaign/' + i.image} alt="afwan tidak ada thumbnail :)"/>
                        </div>
                        <p className="text-left text-3xl py-4 font-bold">
                            {i.judul}
                        </p>
                        <div className="space-y-2 my-2 w-full">
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
                                className="text-gray-500 dark:text-gray-400 flex justify-between text-sm font-medium tabular-nums">
                                <div>
                                    <span className="text-lg text-lime">
                                    {convertRupiah(i.terkumpul)} </span>
                                    terkumpul dari <span className="text-lg"> {convertRupiah(i.target)}</span>

                                </div>

                            </div>
                        </div>
                        <div className="w-full my-2 donation"> 
                        <button className="w-full text-white bg-pinkacp hover:bg-pinkacp-500 py-4 mx-auto rounded-md focus:outline-none"
                        onClick={() => Router.push({pathname: `../payment/${i.slug}`, query: {idCampaign : `${i.id}`}} )}>
                            Donasi Sekarang!
                        </button>
                        </div>
                        <div
                            className="mt-4"
                            dangerouslySetInnerHTML={{
                            __html: i.deskripsi
                        }}></div>

                    </div>

                })
}
        </div>
    } else {
        content = <div
            className="h-screen bg-white-300 mx-auto my-auto w-full flex justify-center items-center">
            Mohon maaf, berita tidak di temukan.
        </div>
    }

    return (

        <div className="container mx-auto mt-20 py-10 px-5">
            <div className="w-full md:w-3/5 mx-auto">
                {content}
            </div>
        </div>
    )
}