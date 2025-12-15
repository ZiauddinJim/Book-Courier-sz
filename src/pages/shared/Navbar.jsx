import Container from '../../components/Container';
import { assets } from '../../assets/assets';
import MyLink from '../../components/MyLink';
import { Link } from 'react-router';
import { BiMenu } from 'react-icons/bi';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import ThemeControl from '../../components/ThemeControl';
import { User, LogOut, LayoutDashboard } from 'lucide-react';



const Navbar = () => {
    const { user, signOutFun } = useAuth()
    // console.log(user);
    const links =
        <>
            <li><MyLink to={'/'}>Home</MyLink></li>
            <li><MyLink to={'/books'}>Books</MyLink></li>
            <li><MyLink to={'/dashboard'}>Dashboard</MyLink></li>
        </>

    const handleLogOut = () => {
        signOutFun()
            .then(() => {
                toast.success("Logout successful!")
            }).catch((error) => {
                // An error happened.
                toast.error("Logout failed: " + error.message);
            });
    }
    return (
        <div className="bg-base-100/30 shadow-lg fixed top-0 left-0 right-0 z-999 drop-shadow-xl backdrop-blur-lg">
            <Container className={'navbar my-0 py-0'}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <BiMenu />
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg> */}
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to={'/'} className="btn btn-ghost text-xl"><img src={assets.logo} className='w-10 h-10' alt="logo" />
                        <span className='text-primary dark:text-secondary'>Book</span> Courier</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-2">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <ThemeControl />
                    {

                        !user
                            ? <Link to={'/login'} className='btn btn-xs btn-outline hover:btn-primary'>Login</Link>
                            : <div className="dropdown dropdown-end mr-2">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Profile picture"
                                            src={user.photoURL || assets.user_placeholder}
                                            referrerPolicy='no-referrer'
                                            onError={(e) => { e.target.onerror = null; e.target.src = "https://i.ibb.co/HDtwq8C/user.png" }}
                                        />
                                    </div>
                                </div>
                                <ul
                                    tabIndex="-1"
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-64 p-2 shadow-lg border border-base-200">
                                    <li className="menu-title px-4 py-2 bg-base-200/50 rounded-t-lg mb-2">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-base-content">{user.displayName}</span>
                                            <span className="text-xs text-base-content/70 font-normal truncate">{user.email}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <Link to={'/dashboard/profile'} className="py-3 font-medium">
                                            <User size={18} /> Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/dashboard'} className="py-3 font-medium">
                                            <LayoutDashboard size={18} /> Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogOut} className="py-3 font-medium text-error hover:bg-error/10">
                                            <LogOut size={18} /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                    }
                </div>
            </Container>
        </div>
    );
};

export default Navbar;