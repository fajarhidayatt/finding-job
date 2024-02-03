import HeroSection from './_HomePartials/HeroSection';
import ClientsSection from './_HomePartials/ClientsSection';
import CategorySection from './_HomePartials/CategorySection';
import BannerSection from './_HomePartials/BannerSection';
import FeaturedSection from './_HomePartials/FeaturedSection';
import LatestJobSection from './_HomePartials/LatestJobSection';

const Home = () => {
  return (
    <main className="max-w-screen-xl w-full mx-auto">
      <HeroSection />
      <ClientsSection />
      <CategorySection />
      <BannerSection />
      <FeaturedSection />
      <LatestJobSection />
    </main>
  );
};

export default Home;
