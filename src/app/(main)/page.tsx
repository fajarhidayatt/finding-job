import HeroSection from './_homePartials/HeroSection';
import ClientsSection from './_homePartials/ClientsSection';
import CategorySection from './_homePartials/CategorySection';
import BannerSection from './_homePartials/BannerSection';
import FeaturedSection from './_homePartials/FeaturedSection';
import LatestJobSection from './_homePartials/LatestJobSection';

const Home = () => {
  return (
    <main className="min-h-[calc(100vh-452px)]">
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
