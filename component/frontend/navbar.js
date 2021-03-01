import style from './navbar.module.scss'
import Link from 'next/link'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'

export default function Navbar() {

    const menu = [
        {
            path: '/',
            menuName: 'Home'
        }, {
            path: '/campaign',
            menuName: 'Campaign'
        }, {
            path: '/artikel',
            menuName: 'Artikel'
        }, 
        // {
        //     path: '/galeri',
        //     menuName: 'Galeri'
        // },
        {
            path: '/kontak',
            menuName: 'Kontak'
        }
    ];

    const router = useRouter();
    const pathName = router.pathname

    const [toggle,
        setToggle] = useState(true);

    const [search,
        setSearch] = useState(true)

    const handleSearch = () => setSearch(!search);

    const handleToggle = () => {
        setToggle(!toggle);
        if (search === false) {
            setSearch(true)
        }
    }

    const handleCallback = (params) => {
        setSearch(params)
        if (toggle === false) {
            setToggle(true)
        }
    }

    return (

        <div className={style.wrapper}>
            <div className={style.logoWrapper}>
               
            </div>

            <div
                className={toggle
                ? style.menuWrapper
                : style.menuWrapper + " " + style.menuWrapperActive}>
                {menu.map((item, index) => (

                    <Link key={index} href={item.path}>
                        <a
                            className={pathName === item.path
                            ? style.menuItem + " " + style.menuItemActive
                            : style.menuItem}
                            onClick={handleToggle}>
                            {item.menuName}</a>

                    </Link>

                ))}

            

            </div>

            {toggle
                ? <div className={style.toggle} onClick={handleToggle}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                : <div className={style.toggle + " " + style.toggleActive} onClick={handleToggle}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>}

        </div>
    )
}
