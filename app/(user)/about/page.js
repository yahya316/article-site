// app/about/page.js
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" />
      <div className="container mx-auto py-12">
        <div className="max-w-3xl mx-auto text-lg text-gray-700 space-y-4">
          <p>This website shares motivational quotes and articles to help people stay positive and focused on their goals. We believe in the power of daily inspiration to build lasting success and happiness.</p>
          <p>Our mission is to provide simple, actionable content that helps you live a more motivated life, one day at a time.</p>
        </div>
        <div className="mt-12">
          <ContactForm />
        </div>
      </div>
    </>
  );
}