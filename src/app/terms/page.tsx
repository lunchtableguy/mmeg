'use client'

import LegalLayout from '@/components/LegalLayout'

export default function Terms() {
  const updated = 'September 3, 2025'
  const toc = [
    { id: 'acceptance', label: 'Acceptance' },
    { id: 'eligibility-accounts', label: 'Eligibility & Accounts' },
    { id: 'license-ownership', label: 'License & Ownership' },
    { id: 'your-content', label: 'Your Content' },
    { id: 'acceptable-use', label: 'Acceptable Use' },
    { id: 'third-party', label: 'Third-Party Services' },
    { id: 'purchases', label: 'Purchases & Paid Features' },
    { id: 'dmca', label: 'DMCA / Copyright' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'changes', label: 'Changes to the Services' },
    { id: 'termination', label: 'Termination' },
    { id: 'disclaimers', label: 'Disclaimers' },
    { id: 'liability', label: 'Limitation of Liability' },
    { id: 'indemnification', label: 'Indemnification' },
    { id: 'governing-law', label: 'Governing Law; Arbitration' },
    { id: 'misc', label: 'Miscellaneous' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <LegalLayout title="Terms of Use" updated={updated} toc={toc}>
      <h2 id="acceptance">
        Acceptance <a className="anchor-link" href="#acceptance">#</a>
      </h2>
      <p>By accessing or using the Services of <strong>Maryott Media and Entertainment Group, Inc.</strong> ("MMEG," "we," "us"), you agree to these Terms. If you do not agree, do not use the Services.</p>

      <h2 id="eligibility-accounts">
        Eligibility & Accounts <a className="anchor-link" href="#eligibility-accounts">#</a>
      </h2>
      <ul>
        <li>You must be at least 13 years old (or the age of digital consent in your region).</li>
        <li>You are responsible for safeguarding your credentials and for all activity under your account.</li>
        <li>Provide accurate information and keep it current.</li>
      </ul>

      <h2 id="license-ownership">
        License & Ownership <a className="anchor-link" href="#license-ownership">#</a>
      </h2>
      <p>We grant a limited, non-exclusive, non-transferable, revocable license to use the Services per these Terms. All site content is owned by MMEG or licensors and protected by IP laws.</p>

      <h2 id="your-content">
        Your Content <a className="anchor-link" href="#your-content">#</a>
      </h2>
      <p>By submitting content, you represent you have rights to it and it does not violate law or third-party rights. You grant MMEG a worldwide, non-exclusive, royalty-free license to host, store, reproduce, modify (for formatting), display, and distribute such content solely to operate the Services. You retain ownership.</p>

      <h2 id="acceptable-use">
        Acceptable Use <a className="anchor-link" href="#acceptable-use">#</a>
      </h2>
      <ul>
        <li>No unlawful, infringing, harassing, defamatory, hateful, or fraudulent activity.</li>
        <li>No attempts to bypass security, reverse engineer, or disrupt the Services.</li>
        <li>No malicious code, automated scraping, or bulk data extraction without consent.</li>
      </ul>

      <h2 id="third-party">
        Third-Party Services <a className="anchor-link" href="#third-party">#</a>
      </h2>
      <p>Links to DSPs, ticketing, processors, or social platforms are governed by those providers' terms/policies. We are not responsible for third-party services.</p>

      <h2 id="purchases">
        Purchases & Paid Features <a className="anchor-link" href="#purchases">#</a>
      </h2>
      <p>Fees, taxes, and charges disclosed at purchase apply. Payments are handled by processors under their terms. Except where required by law, fees are non-refundable.</p>

      <h2 id="dmca">
        DMCA / Copyright <a className="anchor-link" href="#dmca">#</a>
      </h2>
      <p>Send notices to <a href="mailto:legal@mmeg.com">legal@mmeg.com</a> with: (i) your contact info; (ii) description/location of the work; (iii) good-faith statement; (iv) statement under penalty of perjury of authorization; (v) signature. We may remove content and terminate repeat infringers.</p>

      <h2 id="privacy">
        Privacy <a className="anchor-link" href="#privacy">#</a>
      </h2>
      <p>Your use of the Services is also subject to our <a href="/privacy">Privacy Policy</a>.</p>

      <h2 id="changes">
        Changes to the Services <a className="anchor-link" href="#changes">#</a>
      </h2>
      <p>We may modify or discontinue features at any time. We will strive to notify users of material changes.</p>

      <h2 id="termination">
        Termination <a className="anchor-link" href="#termination">#</a>
      </h2>
      <p>We may suspend or terminate access for violations or risks to users/Services. You may stop using the Services at any time. Certain sections survive termination.</p>

      <h2 id="disclaimers">
        Disclaimers <a className="anchor-link" href="#disclaimers">#</a>
      </h2>
      <p>THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." TO THE MAXIMUM EXTENT PERMITTED BY LAW, MMEG DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>

      <h2 id="liability">
        Limitation of Liability <a className="anchor-link" href="#liability">#</a>
      </h2>
      <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, MMEG AND ITS AFFILIATES/OFFICERS/EMPLOYEES/AGENTS/LICENSORS SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR LOSS OF PROFITS/REVENUE/DATA/GOODWILL. OUR AGGREGATE LIABILITY IS LIMITED TO THE GREATER OF (A) AMOUNTS YOU PAID IN THE 12 MONTHS BEFORE THE CLAIM OR (B) $100.</p>

      <h2 id="indemnification">
        Indemnification <a className="anchor-link" href="#indemnification">#</a>
      </h2>
      <p>You agree to indemnify and hold MMEG harmless from claims arising out of your content, your use of the Services, or your violation of these Terms or law.</p>

      <h2 id="governing-law">
        Governing Law; Arbitration <a className="anchor-link" href="#governing-law">#</a>
      </h2>
      <p>These Terms are governed by California law. Disputes will be resolved by binding arbitration (JAMS/AAA) in Los Angeles County, CA, on an individual basis, unless you opt out within 30 days by emailing <a href="mailto:legal@mmeg.com">legal@mmeg.com</a>. <strong>Class actions and jury trials are waived.</strong> Either party may seek injunctive relief in court for IP misuse or confidentiality breaches.</p>

      <h2 id="misc">
        Miscellaneous <a className="anchor-link" href="#misc">#</a>
      </h2>
      <ul>
        <li>If any provision is unenforceable, the remainder remains in effect.</li>
        <li>No waiver is a continuing waiver.</li>
        <li>You may not assign these Terms without consent; we may assign to an affiliate or in connection with a transaction.</li>
        <li>These Terms are the entire agreement regarding the Services.</li>
      </ul>

      <h2 id="contact">
        Contact <a className="anchor-link" href="#contact">#</a>
      </h2>
      <p>
        <strong>MMEG — Maryott Media and Entertainment Group, Inc.</strong><br />
        Los Angeles, California, USA<br />
        Email: <a href="mailto:legal@mmeg.com">legal@mmeg.com</a>
      </p>
    </LegalLayout>
  )
}