import React, { useState } from 'react';
import { NavLink, Link } from 'react-router';
import {
    Book,
    ShoppingCart,
    FileText,
    Users,
    Settings,
    PlusCircle,
    Package,
    PanelLeftClose,
    PanelLeftOpen,
    LogOut
} from 'lucide-react';
import { assets } from '../../assets/assets';
import ThemeControl from '../ThemeControl';
import useRole from '../../hooks/useRole';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Sidebar = () => {
    const { role } = useRole();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const { signOutFun } = useAuth()

    const handleLogOut = () => {
        signOutFun()
            .then(() => {
                toast.success("Logout successful!")
            }).catch((error) => {
                // An error happened.
                toast.error("Logout failed: " + error.message);
            });
    }
    const links = [
        {
            role: 'user',
            items: [
                { to: '/dashboard/profile', label: 'My Profile', icon: <Users size={20} /> },
                { to: '/dashboard/orders', label: 'My Orders', icon: <ShoppingCart size={20} /> },
                { to: '/dashboard/invoices', label: 'Invoices', icon: <FileText size={20} /> },
            ]
        },
        {
            role: 'librarian',
            items: [
                { to: '/dashboard/profile', label: 'My Profile', icon: <Settings size={20} /> },
                { to: '/dashboard/add-book', label: 'Add Book', icon: <PlusCircle size={20} /> },
                { to: '/dashboard/my-books', label: 'My Books', icon: <Book size={20} /> },
                { to: '/dashboard/librarian-orders', label: 'Orders', icon: <Package size={20} /> },
            ]
        },
        {
            role: 'admin',
            items: [
                { to: '/dashboard/profile', label: 'My Profile', icon: <Settings size={20} /> },
                { to: '/dashboard/all-users', label: 'All Users', icon: <Users size={20} /> },
                { to: '/dashboard/manage-books', label: 'Manage Books', icon: <Book size={20} /> },
            ]
        }
    ];

    const currentLinks = links.find(l => l.role === role)?.items || [];

    return (
        <aside className={`bg-base-200 min-h-screen flex flex-col shadow-lg transition-all duration-300 
            ${isCollapsed ? 'w-20' : 'w-64'}`}>

            {/* Header */}
            <div className="p-4 border-b border-base-300 flex justify-between items-center">
                {!isCollapsed && (
                    <Link to="/" className="btn btn-ghost text-xl px-0 hover:bg-transparent">
                        <img src={assets.logo} className="w-10 h-10" alt="Logo" />
                        <span className="text-primary dark:text-secondary">Book</span> Courier
                    </Link>
                )}

                {/* Collapse Button */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="btn btn-sm btn-ghost btn-square"
                >
                    {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="menu w-full p-0 gap-2">
                    {currentLinks.map(link => (
                        <li key={link.to}>
                            <NavLink
                                to={link.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive
                                        ? 'bg-primary text-primary-content shadow-md'
                                        : 'hover:bg-base-300'
                                    } ${isCollapsed ? 'justify-center tooltip tooltip-right' : ''}`
                                } data-tip={link.label}
                            >
                                {link.icon}
                                {!isCollapsed && <span>{link.label}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <div className={`p-4 border-t border-base-300 flex flex-col gap-4 ${isCollapsed ? 'items-center' : ''}`}>
                <div className={isCollapsed ? 'tooltip tooltip-right' : ''} data-tip="Theme">
                    <ThemeControl />
                </div>

                <button onClick={handleLogOut}
                    className={`btn btn-error btn-outline flex items-center gap-2 ${isCollapsed ? 'btn-square px-0 tooltip tooltip-right' : 'w-full'
                        }`} data-tip="Logout"
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
