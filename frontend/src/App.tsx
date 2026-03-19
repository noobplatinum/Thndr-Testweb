import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { TrustedBy } from './sections/TrustedBy';
import { PainPoints } from './sections/PainPoints';
import { IntroVideo } from './sections/IntroVideo';
import { Foundation } from './sections/Foundation';
import { LiveStats } from './sections/LiveStats';
import { GovernLayers } from './sections/GovernLayers';
import { ComparisonTable } from './sections/ComparisonTable';
import { CustomerStories } from './sections/CustomerStories';
import { Services } from './sections/Services';
import { CTABanner } from './sections/CTABanner';

function App() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustedBy />
        <PainPoints />
        <IntroVideo />
        <Foundation />
        <LiveStats />
        <GovernLayers />
        <ComparisonTable />
        <CustomerStories />
        <Services />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}

export default App;
