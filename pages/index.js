import Campaign from '../component/frontend/campaign'

export async function getServerSideProps(ctx) {

    // const getCampaign = await fetch('https://aksiciptapeduli.org/api/campaign')
    const getCampaign = await fetch('http://localhost:3000/api/campaign')
    const result = await getCampaign.json()

    return {
        props: {
            campaign: result
        }
    }

}

export default function home({campaign}) {
    return (
        <div>
            <div className="w-full h-20"></div>
            <div className="h-banner flex justify-center items-center bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="text-center md:text-left" >

                            <p
                                className="leading-snug sm:leading-snug text-3xl font-extrabold text-gray-700 sm:text-5xl">
                                Sudahkah
                                <br/>
                                Anda <span className="text-lime"> berdonasi</span>
                                <br/>
                                untuk hari ini?
                            </p>
                            <p className="py-4 text-gray-500 tracking-wide leading-relaxed md:leading-relaxed"> Aksi Cipta Peduli adalah lembaga Filantropi <br/>  pengelola donasi kemanusiaan, zakat, infak, sedekah, dan wakaf. </p>
                            <button
                                className="my-2 inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-pinkacp text-base font-medium text-white hover:bg-pinkacp-500 focus:outline-none  sm:w-auto sm:text-sm">
                                Donasi Sekarang!
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Campaign campaign={campaign}/>
        </div>
    )
}