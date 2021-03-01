import '../styles/globals.css'
import '../styles/tailwindcss.css'
import {useRouter} from 'next/router'
import Sidebar from '../component/backend/sidebar'
import Navbar from '../component/frontend/navbar'
import NavbarBe from '../component/backend/navbar'
import Footer from '../component/frontend/footer'

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

    return content
}

export default MyApp
