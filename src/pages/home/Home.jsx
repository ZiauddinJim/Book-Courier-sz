
import Banner from './Banner';
import CoverageMap from './CoverageMap';

const Home = () => {
    return (
        <div className="flex flex-col gap-8">
            <Banner />

            <CoverageMap />
        </div>
    );
};

export default Home;