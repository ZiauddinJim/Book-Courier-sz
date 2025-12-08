import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Container from "../../components/Container";

const slides = [
    {
        image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=2070&q=80",
        title: "Welcome to BookCourier",
        description: "Borrow and receive books from your local library easily.",
        buttonText: "View All Books",
        buttonLink: "/books",
    },
    {
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=2228&q=80",
        title: "Discover New Worlds",
        description: "Explore books across all categories — fiction, science & more.",
        buttonText: "Browse Books",
        buttonLink: "/books",
    },
    {
        image: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?auto=format&fit=crop&w=2615&q=80",
        title: "Fast & Reliable Delivery",
        description: "We deliver books quickly and safely right to your door.",
        buttonText: "Order Now",
        buttonLink: "/books",
    },
];

const Banner = () => {
    return (
        <Container>
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                navigation
                pagination={{ clickable: true }}
                loop
                className="w-full rounded-2xl"
            >
                {slides.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="relative w-full h-[400px] md:h-[550px]">
                            <img src={slide.image} alt={slide.title}
                                className="w-full h-full object-cover" loading="lazy" />
                            {/* overlay and content */}
                            <div className="absolute inset-0 bg-black/50" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="max-w-xl text-center text-white px-4">
                                    <h2 className="text-2xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                                    <p className="mb-6 text-sm md:text-base">{slide.description}</p>
                                    <Link to={slide.buttonLink} className="btn btn-primary">
                                        {slide.buttonText}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    );
};

export default Banner;
