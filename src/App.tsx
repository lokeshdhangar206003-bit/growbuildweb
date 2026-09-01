import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
