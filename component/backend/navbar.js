import style from './navbar.module.scss'
import Link from 'next/link'
import {useState} from 'react'
import {useRouter} from 'next/router'
import Cookie from 'js-cookie'

export default function Navbar() {

    const menu = [
        {
            path: '/admin',
            menuName: 'Dashboard'
        }, {
            path: '/admin/campaign',
            menuName: 'Campaign'
        }, {
            path: '/admin/muwakif',
            menuName: 'Muwakif'
        }, {
            path: '/admin/artikel',
            menuName: 'Artikel'
        }
    ];

    const handleLogout = () => {
        Cookie.remove('token');
    }

    const router = useRouter();
    const pathName = router.pathname

    const [toggle,
        setToggle] = useState(true);

    const [search,
        setSearch] = useState(true)


    const handleToggle = () => {
        setToggle(!toggle);
        if (search === false) {
            setSearch(true)
        }
    }



    return (

        <div className={style.wrapper}>
            <div className={style.logoWrapper}></div>

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
                <Link href="/login">
                    <a
                        className={style.menuItem}
                        onClick={handleLogout}>
                        Logout</a>
                </Link>

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
