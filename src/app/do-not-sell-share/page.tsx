'use client'

import LegalLayout from '@/components/LegalLayout'

export default function DNS() {
  const updated = 'September 3, 2025'
  return (
    <LegalLayout 
      title="Do Not Sell or Share My Personal Information" 
      updated={updated}
      toc={[]}
    >
      <p>
        Under the California Privacy Rights Act (CPRA), you may opt out of "sharing" for cross-context behavioral advertising.
        Use your browser's global privacy control (GPC) and/or email <a href="mailto:privacy@mmeg.com">privacy@mmeg.com</a> with the subject "Do Not Sell/Share".
      </p>
      <p>
        If you are logged in, your preference will be saved to your account. If you are not logged in, we will set an opt-out cookie on this browser.
      </p>
      <button 
        className="mt-6 rounded-xl bg-white/10 px-6 py-3 font-medium text-white ring-1 ring-white/20 hover:bg-white/15 transition"
        onClick={() => alert('Stub: Implement consent manager integration here.')}>
        Set Opt-Out Preference (This Browser)
      </button>
    </LegalLayout>
  )
}