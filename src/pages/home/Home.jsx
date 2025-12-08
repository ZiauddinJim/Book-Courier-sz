
import Banner from './Banner';
import CoverageMap from './CoverageMap';
import Newsletter from './Newsletter';
import Testimonials from './Testimonials';
import WhyChooseUs from './WhyChooseUs';

const Home = () => {
    return (
        <div className="flex flex-col">
            <Banner />

            <CoverageMap />
            <WhyChooseUs />
            <Testimonials />
            <Newsletter />
        </div>
    );
};

export default Home;