// app/terms/page.js
import PageHero from '@/components/PageHero';

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms & Conditions" />
      <div className="container mx-auto py-12 max-w-3xl">
        <div className="text-gray-700 space-y-4">
          <p>By using this website, you agree to these terms. All content is for informational purposes only. We are not liable for any actions you take based on the information provided here.</p>
          <p>All quotes and articles are the property of their respective owners. Do not reproduce content without permission.</p>
        </div>
      </div>
    </>
  );
}