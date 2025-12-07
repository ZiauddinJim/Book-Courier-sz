import React from 'react';
import { NavLink } from 'react-router';

const MyLink = ({ children, to, className }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive
                    ? 'btn text-white border-none btn-primary hover:brightness-110 active:scale-95'
                    : `${className} btn btn-ghost hover:btn-primary`}
        >
            {children}
        </NavLink>
    );
};

export default MyLink;
