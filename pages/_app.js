import '../styles/globals.css'
import '../styles/tailwindcss.css'
import {useRouter} from 'next/router'
import Navbar from '../component/frontend/navbar'
import NavbarBe from '../component/backend/navbar'
import Footer from '../component/frontend/footer'
import NextNprogress from 'nextjs-progressbar'
import Head from 'next/head'

function MyApp({Component, pageProps}) {

    const router = useRouter();
    const pathName = router.pathname
    let content = null
    if (pathName.includes('admin')) {
       content = <div> 
            <NavbarBe/>
             <Component {...pageProps}/>
         </div>
    } else {
        content = <div>
            <Navbar/>
            <Component {...pageProps}/>
            <Footer/>
        </div>
    }

    return <> 
      <Head>
                <title>Aksi Cipta Peduli
                </title>
                <link rel="icon" href="/acp.png"/>
                <meta
                    name="description"
                    content="Aksi Cipta Peduli"></meta>

                <meta property="og:locale" content="en_US"/>
                <meta property="og:type" content="website"/>
                <meta
                    property="og:title"
                    content="Crowdfunding"/>
                <meta
                    property="og:description"
                    content="Crowdfunding"/>
                <meta property="og:url" content="https://aksiciptapeduli.org/"/>
                {/* <meta name="google-site-verification" content="yvqhaODts2WU2swOmyIziLY-q7A_6PI05PJjSOhIku0"/> */}
                <meta
                    property="og:site_name"
                    content="Crowdfunding"/>
                    {/* <meta name="google-site-verification" content="sxH3_hMu1xl9cWYaoq72sO2Uk23gLUB3gl4lo7Xw8mU" /> */}
            </Head>

    <NextNprogress color="#84cc16" startPosition={0.1} stopDelayMs={400} height="2"/>
    {content} 
    
    </>
}

export default MyApp
