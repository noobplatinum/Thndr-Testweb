import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Hero } from '../sections/Hero';
import { TrustedBy } from '../sections/TrustedBy';
import { PainPoints } from '../sections/PainPoints';
import { IntroVideo } from '../sections/IntroVideo';
import { Foundation } from '../sections/Foundation';
import { LiveStats } from '../sections/LiveStats';
import { GovernLayers } from '../sections/GovernLayers';
import { ComparisonTable } from '../sections/ComparisonTable';
import { CustomerStories } from '../sections/CustomerStories';
import { Services } from '../sections/Services';
import { CTABanner } from '../sections/CTABanner';

export function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <div id="home">
            <Hero />
            <TrustedBy />
        </div>
        <div id="product">
            <PainPoints />
            <IntroVideo />
            <Foundation />
        </div>
        <div id="solution">
            <LiveStats />
            <GovernLayers />
            <ComparisonTable />
        </div>
        <div id="resources">
            <CustomerStories />
            <Services />
            <CTABanner />
        </div>
      </main>
      <Footer />
    </>
  );
}
