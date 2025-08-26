import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" />
      <div className="container mx-auto py-12">
        <ContactForm />
      </div>
    </>
  );
}