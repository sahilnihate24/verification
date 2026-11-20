import { useState, type FormEvent } from 'react';
import { CheckCircle2, Mail } from 'lucide-react';

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [codeRef, setCodeRef] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please complete your name, email address, and inquiry details.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[#FAFBFD] py-20 px-4 sm:px-6 lg:px-8 no-print"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 mb-3">
            Contact &amp; Registrar Support
          </p>
          <h2
            id="contact-heading"
            className="font-serif font-bold text-3xl text-[#0B1221] tracking-tight"
          >
            Need Manual Verification?
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            If you are an employer or academic institution experiencing difficulty
            locating a credential code, submit an inquiry to the Qythera verification
            team.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-200/80 space-y-2 text-sm">
            <p className="text-slate-500 font-medium">Direct Verification Desk</p>
            <a
              href="mailto:verification@qythera.com"
              className="inline-flex items-center gap-2 font-medium text-slate-900 hover:underline underline-offset-4"
            >
              <Mail className="w-4 h-4 text-slate-600" aria-hidden="true" />
              <span>verification@qythera.com</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl border border-slate-200/80 p-6 sm:p-8">
            {submitted ? (
              <div className="py-6 text-left">
                <div className="flex items-center gap-2.5 text-emerald-800 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" aria-hidden="true" />
                  <h3 className="text-base font-semibold">Inquiry Recorded</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Thank you, {name}. Your verification inquiry has been logged for
                  review. Our registrar team responds to institutional requests within
                  one business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setCodeRef('');
                    setMessage('');
                  }}
                  className="mt-5 px-4 py-2 rounded-md border border-slate-200 text-xs font-medium text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="w-full h-11 px-3.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      Work or Academic Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@organization.com"
                      className="w-full h-11 px-3.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-code"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Certificate Code (Optional)
                  </label>
                  <input
                    id="contact-code"
                    type="text"
                    value={codeRef}
                    onChange={(e) => setCodeRef(e.target.value)}
                    placeholder="Verification code if available"
                    className="w-full h-11 px-3.5 rounded-lg border border-slate-200 font-mono text-sm text-slate-900 placeholder:font-sans placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Inquiry Details
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide student name or verification context..."
                    className="w-full p-3.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 resize-y"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-xs font-medium text-rose-700">
                    {error}
                  </p>
                )}

                <div className="pt-1">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-[#0B1221] text-white text-sm font-medium hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Submit Verification Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
