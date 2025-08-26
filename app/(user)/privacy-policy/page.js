import PageHero from '@/components/PageHero';

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" />
      <div className="container mx-auto py-12 max-w-3xl">
        <div className="text-gray-700 space-y-4">
          <p>Your privacy is important to us. This policy outlines how we collect, use, and protect your information.</p>
          <p>We do not collect any personal information from you on this site. The contact form is a static front-end form, and any information submitted is not stored on our servers.</p>
        </div>
      </div>
    </>
  );
}