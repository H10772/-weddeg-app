import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import NewArrivals from '../components/home/NewArrivals';
import EssentialsSection from '../components/home/EssentialsSection';
import MeetWedSection from '../components/home/MeetWedSection';

/**
 * HomePage Component
 * Landing page with hero section and new arrivals
 */
const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <NewArrivals />
      <EssentialsSection />
      <MeetWedSection />
    </Layout>
  );
};

export default HomePage;
