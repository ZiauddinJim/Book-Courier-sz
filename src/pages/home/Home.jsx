
import Banner from './Banner';
import CoverageMap from './CoverageMap';
import LatestBooks from './LatestBooks';
import Newsletter from './Newsletter';
import Testimonials from './Testimonials';
import WhyChooseUs from './WhyChooseUs';

const Home = () => {
    return (
        <div className="flex flex-col">
            <Banner />
            <LatestBooks />
            <CoverageMap />
            <WhyChooseUs />
            <Testimonials />
            <Newsletter />
        </div>
    );
};

export default Home;