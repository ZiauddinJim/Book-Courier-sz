import React, { useEffect, useState } from 'react';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';

const ThemeControl = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "corporate");
    useEffect(() => {
        const html = document.querySelector("html");
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);
    const handleTheme = (checked) => {
        setTheme(checked ? "black" : "corporate");
    };
    return (
        <div className='flex mr-3'>
            <label className="toggle toggle-xs text-base-content">
                <input onChange={(e) => handleTheme(e.target.checked)}
                    defaultChecked={localStorage.getItem('theme') === "black"}
                    type="checkbox" className="theme-controller " />
                <IoSunnyOutline size={15} aria-level="sun" />
                <IoMoonOutline size={15} aria-level="moon" />
            </label>
        </div>
    );
};

export default ThemeControl;