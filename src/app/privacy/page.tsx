'use client'

import LegalLayout from '@/components/LegalLayout'

export default function Privacy() {
  const updated = 'September 3, 2025'
  const toc = [
    { id: 'scope', label: 'Scope' },
    { id: 'information-we-collect', label: 'Information We Collect' },
    { id: 'how-we-use', label: 'How We Use Information' },
    { id: 'sharing', label: 'How We Share Information' },
    { id: 'cookies', label: 'Cookies & Similar Technologies' },
    { id: 'choices', label: 'Your Privacy Choices (CPRA/GDPR)' },
    { id: 'retention', label: 'Data Retention' },
    { id: 'security', label: 'Security' },
    { id: 'children', label: "Children's Privacy" },
    { id: 'transfers', label: 'International Transfers' },
    { id: 'changes', label: 'Changes' },
    { id: 'contact', label: 'Contact Us' },
  ]

  return (
    <LegalLayout title="Privacy Policy" updated={updated} toc={toc}>
      <p>
        This Privacy Policy describes how <strong>Maryott Media and Entertainment Group, Inc.</strong> ("<strong>MMEG</strong>," "we," "us," or "our")
        collects, uses, discloses, and protects personal information when you use our websites, create an account, sign up
        for communications, or otherwise interact with our services (the "<strong>Services</strong>").
      </p>

      <h2 id="scope">
        Scope <a className="anchor-link" href="#scope">#</a>
      </h2>
      <p>Applies to public sites, sign-up/sign-in flows, artist pages, news, and contact forms. Separate notices may apply to specific promotions or events.</p>

      <h2 id="information-we-collect">
        Information We Collect <a className="anchor-link" href="#information-we-collect">#</a>
      </h2>
      <p>We collect information from you, automatically, and from third parties:</p>
      <ul>
        <li><strong>Information you provide</strong>: name, email, password, profile data, newsletter sign-ups, uploads, messages; limited billing metadata via payment processors.</li>
        <li><strong>Automatically collected</strong>: IP address, device IDs, browser/OS, language, pages viewed, clicks, referrers, session IDs, approximate location from IP, performance metrics.</li>
        <li><strong>From third parties</strong>: social sign-in, analytics/marketing partners, publicly available sources.</li>
      </ul>

      <h3>California Categories (CPRA)</h3>
      <ul>
        <li><strong>Identifiers</strong> (name, email, IP, device IDs)</li>
        <li><strong>Customer records</strong> (billing metadata; not full card numbers)</li>
        <li><strong>Commercial info</strong> (interactions, purchases)</li>
        <li><strong>Internet activity</strong> (browsing/click data, cookies)</li>
        <li><strong>Geolocation</strong> (coarse, from IP)</li>
        <li><strong>Inferences</strong> (preferences)</li>
        <li><strong>Sensitive PI</strong> (account login/password). No government IDs, precise GPS, or biometrics.</li>
      </ul>

      <h2 id="how-we-use">
        How We Use Information <a className="anchor-link" href="#how-we-use">#</a>
      </h2>
      <ul>
        <li>Provide, secure, and improve the Services; authenticate accounts</li>
        <li>Respond to requests/support; send updates and marketing (where permitted)</li>
        <li>Personalize content; recommend artists/releases/tours</li>
        <li>Analytics, research, debugging, and fraud prevention</li>
        <li>Advertising/measurement (cross-device where permitted)</li>
        <li>Comply with law and enforce our Terms</li>
      </ul>

      <h2 id="sharing">
        How We Share Information <a className="anchor-link" href="#sharing">#</a>
      </h2>
      <ul>
        <li><strong>Service providers</strong> (hosting, analytics, email, auth, payments, security, support) under contract</li>
        <li><strong>Advertising/analytics partners</strong> (see Cookies)</li>
        <li><strong>Affiliates & transactions</strong> (merger, financing, acquisition)</li>
        <li><strong>Legal/safety/rights</strong> compliance</li>
      </ul>
      <p>We do not sell personal information for money. We may "<strong>share</strong>" (CPRA) certain identifiers/internet activity for cross-context behavioral advertising. See your choices below.</p>

      <h2 id="cookies">
        Cookies & Similar Technologies <a className="anchor-link" href="#cookies">#</a>
      </h2>
      <p>We use cookies, pixels, SDKs, and local storage for functionality, analytics, and advertising.</p>
      <ul>
        <li><strong>Strictly necessary</strong> (auth, security, core features)</li>
        <li><strong>Functional</strong> (preferences)</li>
        <li><strong>Analytics</strong> (traffic/performance)</li>
        <li><strong>Advertising</strong> (interest-based ads, frequency capping)</li>
      </ul>
      <p>Manage via browser controls and our <a href="/cookie-settings" className="text-blue-600 dark:text-blue-400 hover:underline">Cookie Settings</a> tool. Blocking certain cookies may impact functionality.</p>

      <h2 id="choices">
        Your Privacy Choices (CPRA/GDPR) <a className="anchor-link" href="#choices">#</a>
      </h2>
      <ul>
        <li><strong>California (CPRA)</strong>: access/know, correct, delete; opt out of "sharing"; limit sensitive PI (we only use it to provide the Services). No discrimination for exercising rights.</li>
        <li><strong>EEA/UK (GDPR)</strong>: access, rectification, erasure, restriction, portability, and objection; withdraw consent anytime.</li>
      </ul>
      <p>Submit requests at <a href="mailto:privacy@mmeg.com">privacy@mmeg.com</a>. Opt-out of targeted ads via our <a href="/do-not-sell-share">Do Not Sell/Share</a> page (where available) and device settings.</p>

      <h2 id="retention">
        Data Retention <a className="anchor-link" href="#retention">#</a>
      </h2>
      <p>We retain information as needed for the Services and legal purposes: e.g., analytics logs ≈ 24 months; core account data for the life of the account unless deletion is requested and permitted.</p>

      <h2 id="security">
        Security <a className="anchor-link" href="#security">#</a>
      </h2>
      <p>We use appropriate organizational and technical safeguards (encryption in transit, hashed passwords, access controls). No system is 100% secure.</p>

      <h2 id="children">
        Children's Privacy <a className="anchor-link" href="#children">#</a>
      </h2>
      <p>The Services are not directed to children under 13. If you believe a child provided data, contact us to delete it.</p>

      <h2 id="transfers">
        International Transfers <a className="anchor-link" href="#transfers">#</a>
      </h2>
      <p>Data may be processed in the U.S. and other countries. Where required, we use appropriate transfer safeguards.</p>

      <h2 id="changes">
        Changes <a className="anchor-link" href="#changes">#</a>
      </h2>
      <p>We may update this Policy. Material changes will be notified (e.g., banner, email to registered users).</p>

      <h2 id="contact">
        Contact Us <a className="anchor-link" href="#contact">#</a>
      </h2>
      <p>
        <strong>MMEG — Maryott Media and Entertainment Group, Inc.</strong><br />
        Los Angeles, California, USA<br />
        Email: <a href="mailto:privacy@mmeg.com">privacy@mmeg.com</a>
      </p>

      <hr />
      <p id="cookie-settings"><em>Cookie Settings control will render here if enabled.</em></p>
    </LegalLayout>
  )
}