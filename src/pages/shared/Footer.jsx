import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { assets } from "../../assets/assets";
import { CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content mt-12">
            <div className="container mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

                {/* Logo / Brand */}
                <div>
                    <Link to={'/'} className="btn btn-ghost text-xl"><img src={assets.logo} className='w-10 h-10' alt="" />
                        <span className='text-primary dark:text-secondary'>Book</span> Courier</Link>
                    <p className="text-sm opacity-80">
                        “Smart book delivery for everyone. <br />
                        Order. Receive. Enjoy.”
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="footer-title text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:underline">Home</Link></li>
                        <li><Link to="/books" className="hover:underline">Books</Link></li>
                        <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
                    </ul>
                </div>

                {/* Contact Details */}
                <div>
                    <h3 className="footer-title text-lg font-semibold mb-4">Contact Us</h3>
                    <p className="text-sm opacity-90 flex items-center gap-2"><CiMail /> info@bookcourier.com</p>
                    <p className="text-sm opacity-90 flex items-center gap-2"><IoCallOutline /> +88 01234 567890</p>
                    <p className="text-sm opacity-90 flex items-center gap-2"><CiLocationOn /> Chattogram, Bangladesh</p>
                </div>

                {/* Social Icons */}
                <div>
                    <h3 className="footer-title text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                        <a href="https://www.facebook.com/" className="p-2 rounded-full bg-base-300 hover:bg-primary hover:text-white transition">
                            <FaFacebookF className="text-lg" />
                        </a>
                        <a href="https://www.instagram.com/" className="p-2 rounded-full bg-base-300 hover:bg-primary hover:text-white transition">
                            <FaInstagram className="text-lg" />
                        </a>
                        <a href="https://www.linkedin.com/" className="p-2 rounded-full bg-base-300 hover:bg-primary hover:text-white transition">
                            <FaLinkedinIn className="text-lg" />
                        </a>
                        <a href="https://x.com/" className="p-2 rounded-full bg-base-300 hover:bg-primary hover:text-white transition">
                            <FaXTwitter className="text-lg" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="bg-base-300 text-center py-3">
                <p className="text-sm">
                    © {new Date().getFullYear()} BookCourier — All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
