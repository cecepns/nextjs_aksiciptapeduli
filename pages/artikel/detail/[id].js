import Head from 'next/head'
import Router from 'next/router'
import {convertPersen} from '../../../myLibrary/convert_persen'
import {convertRupiah} from '../../../myLibrary/convert_rupiah'

export async function getServerSideProps(ctx) {

    const slug = ctx.query.id
    // const getartikel = await
    // fetch('https://test.aksiciptapeduli.org/api/artikel/search/' + slug) const
    // getartikel = await fetch('https://aksiciptapeduli.org/api/artikel/search/' +
    // slug)
    const getArtikel = await fetch('http://localhost:3000/api/artikel/search/' + slug)
    const result = await getArtikel.json()

    return {
        props: {
            artikel: result
        }
    }

}

export default function artikel({artikel}) {
    console.log(artikel)

    let content = null

    if (artikel.data.length > 0) {
        content = <div>
            {artikel
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
                            <img src={'/img/artikel/' + i.image} alt="afwan tidak ada thumbnail :)"/>
                        </div>
                        <p className="text-left text-3xl py-4 font-bold">
                            {i.judul}
                        </p>
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
            Mohon maaf, artikel tidak di temukan.
        </div>
    }

    return (

        <div className="container mx-auto  py-10 px-5">
            <div className="w-full h-20"></div>
            <div className="w-full md:w-3/5 mx-auto">
                {content}
            </div>
        </div>
    )
}