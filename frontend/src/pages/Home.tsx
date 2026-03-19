import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { DemoRequestModal } from '../components/DemoRequestModal';
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
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <div id="home">
            <Hero onBookDemo={() => setDemoModalOpen(true)} />
            <TrustedBy />
        </div>
        <div id="product">
            <PainPoints />
            <IntroVideo />
            <Foundation onBookDemo={() => setDemoModalOpen(true)} />
        </div>
        <div id="solution">
            <LiveStats />
            <GovernLayers />
            <ComparisonTable />
        </div>
        <div id="resources">
            <CustomerStories />
            <Services />
            <CTABanner onBookDemo={() => setDemoModalOpen(true)} />
        </div>
      </main>
      <DemoRequestModal open={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
      <Footer />
    </>
  );
}
