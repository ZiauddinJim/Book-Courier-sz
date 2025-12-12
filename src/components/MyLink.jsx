import React from 'react';
import { NavLink } from 'react-router';

const MyLink = ({ children, to, className }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive
                    ? 'btn text-white dark:text-black border-none btn-primary dark:btn-secondary hover:brightness-110 active:scale-95'
                    : `${className} btn btn-ghost hover:btn-primary dark:hover:btn-secondary`}
        >
            {children}
        </NavLink>
    );
};

export default MyLink;
