import { Link } from 'react-router-dom';

export function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          
          <p className="text-slate mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-8 text-ink">
            <section>
              <h2 className="font-display text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="text-slate leading-relaxed">
                By accessing and using this website, you accept and agree to be bound by the terms and provision 
                of this agreement. In addition, when using these particular services, you shall be subject to any 
                posted guidelines or rules applicable to such services. Any participation in these services will 
                constitute acceptance of this agreement. If you do not agree to abide by the above, please do not 
                use this service.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">2. Description of Service</h2>
              <p className="text-slate leading-relaxed">
                This website is a portfolio website showcasing the work of Olowomakan Esther Bukola, a Creative 
                Graphics Designer & Digital Media Specialist. The site includes information about services offered, 
                portfolio of work, blog posts, and contact information.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">3. Intellectual Property Rights</h2>
              <p className="text-slate leading-relaxed mb-4">
                All content included on this site, such as text, graphics, logos, button icons, images, audio clips, 
                digital downloads, data compilations, and software, is the property of Esther Bukola or its content 
                suppliers and protected by international copyright laws. The compilation of all content on this site 
                is the exclusive property of Esther Bukola and protected by international copyright laws.
              </p>
              <p className="text-slate leading-relaxed">
                You may not reproduce, distribute, modify, display, perform, or use any of the content on this site 
                without the express written consent of Esther Bukola.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">4. User Representations</h2>
              <p className="text-slate leading-relaxed mb-4">
                By using the site, you represent and warrant that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate">
                <li>You have the legal capacity and you agree to comply with these Terms of Service</li>
                <li>You are not under the age of 13</li>
                <li>You will not access the site through automated or non-human means, whether through a bot, script, or otherwise</li>
                <li>You will not use the site for any illegal or unauthorized purpose</li>
                <li>Your use of the site will not violate any applicable law or regulation</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">5. Contact Form and Communications</h2>
              <p className="text-slate leading-relaxed">
                When you submit information through the contact form or newsletter signup, you consent to receive 
                communications from us. You agree that any such information is accurate and current. We reserve the 
                right to refuse service to anyone for any reason at any time.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">6. Prohibited Activities</h2>
              <p className="text-slate leading-relaxed mb-4">
                You may not access or use the site for any purpose other than that for which we make the site 
                available. The site may not be used in connection with any commercial endeavors except those that 
                are specifically endorsed or approved by us. Prohibited activities include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate">
                <li>Systematically retrieving data or other content from the site to create a collection, compilation, database, or directory</li>
                <li>Making any unauthorized use of the site, including collecting usernames and/or email addresses by electronic or other means for the purpose of sending unsolicited email</li>
                <li>Using the site to advertise or offer to sell goods and services</li>
                <li>Circumventing, disabling, or otherwise interfering with security-related features of the site</li>
                <li>Engaging in unauthorized framing of or linking to the site</li>
                <li>Tricking, defrauding, or misleading us or other users, especially in any attempt to learn sensitive account information</li>
                <li>Making improper use of our support services or submitting false reports of abuse or misconduct</li>
                <li>Uploading or transmitting malware or other malicious code</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">7. Limitation of Liability</h2>
              <p className="text-slate leading-relaxed">
                In no event will Esther Bukola or its directors, employees, or agents be liable to you or any 
                third person for any direct, indirect, consequential, exemplary, incidental, special, or punitive 
                damages, including lost profit, lost revenue, loss of data, or other damages arising out of use 
                of the site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">8. Indemnification</h2>
              <p className="text-slate leading-relaxed">
                You agree to defend, indemnify, and hold harmless Esther Bukola, its officers, directors, employees, 
                and agents, from and against any claims, liabilities, damages, losses, and expenses, including 
                without limitation reasonable legal and accounting fees, arising out of or in any way connected 
                with your access to or use of the site or your violation of these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">9. Modifications and Interruptions</h2>
              <p className="text-slate leading-relaxed">
                We reserve the right to change, modify, or remove the contents of the site at any time or for any 
                reason at our sole discretion without notice. However, we have no obligation to update any 
                information on our site. You agree that it is your sole responsibility to monitor changes to our site. 
                We will not be liable to you or any third party for any modification, price change, suspension, or 
                discontinuance of the site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">10. Governing Law</h2>
              <p className="text-slate leading-relaxed">
                These Terms of Service and your use of the site are governed by and construed in accordance with 
                the laws of Nigeria applicable to agreements made and to be entirely performed within Nigeria, 
                without regard to its conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">11. Dispute Resolution</h2>
              <p className="text-slate leading-relaxed">
                Any legal suit, action, or proceeding arising out of, or related to, these Terms of Service or 
                the site shall be instituted exclusively in the federal courts of Nigeria or the state courts of 
                Lagos State. You waive any and all objections to the exercise of jurisdiction over you by such 
                courts and to venue in such courts.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold mb-4">12. Contact Information</h2>
              <p className="text-slate leading-relaxed">
                In order to resolve a complaint regarding the site or to receive further information regarding 
                use of the site, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-mist rounded-lg">
                <p className="text-ink font-bold">Esther Bukola</p>
                <p className="text-slate">Email: esther.olowomakan@gmail.com</p>
                <p className="text-slate">Phone: +234 814 590 4088</p>
                <p className="text-slate">Location: Ikorodu, Lagos State, Nigeria</p>
              </div>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
