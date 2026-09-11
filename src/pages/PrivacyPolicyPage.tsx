import { Link } from 'react-router-dom';

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-16 md:py-24">
      <div className="container-x max-w-4xl">
        <div className="mb-8">
          <Link to="/" className="text-pine hover:text-pine-dark text-sm font-bold">
            ← Back to Home
          </Link>
        </div>

        <article className="prose prose-lg max-w-none">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-ink mb-6">
            Privacy Policy
          </h1>
          
          <p className="text-slate mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-8 text-ink">
            <section>
              <h2 className="font-display text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-slate leading-relaxed">
                Welcome to Esther Bukola's portfolio website. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you visit our website. Please read this privacy policy 
                carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">2. Information We Collect</h2>
              <p className="text-slate leading-relaxed mb-4">
                We may collect information about you in a variety of ways. The information we may collect on the site includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate">
                <li><strong>Personal Data:</strong> Name, email address, and other contact information you voluntarily give us when filling out the contact form or subscribing to the newsletter.</li>
                <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the site.</li>
                <li><strong>Financial Data:</strong> We do not collect financial information. All payments are processed through secure third-party payment processors.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">3. Use of Your Information</h2>
              <p className="text-slate leading-relaxed mb-4">
                Having accurate information about you permits us to provide you with a smooth, efficient, and custom experience. Specifically, we may use information collected about you via the site to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate">
                <li>Create and manage your account</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you a newsletter (only if you have subscribed)</li>
                <li>Improve website functionality and user experience</li>
                <li>Analyze usage patterns and improve our services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">4. Cookies and Tracking Technologies</h2>
              <p className="text-slate leading-relaxed">
                We may use cookies, web beacons, tracking pixels, and other tracking technologies on the site to 
                help customize the site and improve your experience. When you access the site, your personal 
                information is not collected through the site by third parties. All third-party products or services 
                on the site are provided by independent third parties. You can choose to disable cookies through 
                your individual browser options.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">5. Third-Party Services</h2>
              <p className="text-slate leading-relaxed">
                We may use third-party services for analytics (Google Analytics), which may collect information 
                about your use of the site. These third-party services have their own privacy policies, and we 
                encourage you to read them.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">6. Security of Your Information</h2>
              <p className="text-slate leading-relaxed">
                We use administrative, technical, and physical security measures to help protect your personal 
                information. While we have taken reasonable steps to secure the personal information you provide 
                to us, please be aware that no security measures are perfect or impenetrable, and no method of 
                data transmission can be guaranteed against any interception or other type of misuse.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">7. Your Rights</h2>
              <p className="text-slate leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate">
                <li>The right to access the personal information we hold about you</li>
                <li>The right to request correction of inaccurate personal information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to object to processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">8. Contact Us</h2>
              <p className="text-slate leading-relaxed">
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-mist rounded-lg">
                <p className="text-ink font-bold">Esther Bukola</p>
                <p className="text-slate">Email: esther.olowomakan@gmail.com</p>
                <p className="text-slate">Phone: +234 814 590 4088</p>
                <p className="text-slate">Location: Ikorodu, Lagos State, Nigeria</p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">9. Changes to This Privacy Policy</h2>
              <p className="text-slate leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review 
                this Privacy Policy periodically for any changes.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
