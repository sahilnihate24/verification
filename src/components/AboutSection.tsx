export function AboutSection() {
  const pillars = [
    {
      label: 'Registry Authority',
      detail:
        'Every internship record displayed on this portal is maintained directly under Qythera credential standards and reflects verified completion.',
    },
    {
      label: 'Unique Code Binding',
      detail:
        'Each participant receives an individual verification identifier tied exclusively to their full legal name and internship cohort record.',
    },
    {
      label: 'Direct Academic & Employer Access',
      detail:
        'No account registration or fee is required for university registrars, recruiters, or verification agencies to validate a certificate.',
    },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-white border-b border-slate-200/80 py-20 px-4 sm:px-6 lg:px-8 no-print"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 mb-3">
            About Qythera Registry
          </p>
          <h2
            id="about-heading"
            className="font-serif font-bold text-3xl text-[#0B1221] tracking-tight leading-snug"
          >
            Trusted Credential Verification
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            The Qythera Verification Portal serves as the central public record for
            confirming internship participation and completion credentials issued by
            Qythera.
          </p>
        </div>

        <div className="lg:col-span-7 divide-y divide-slate-200/80 border-t border-b border-slate-200/80">
          {pillars.map((pillar) => (
            <div key={pillar.label} className="py-6 first:pt-5 last:pb-5">
              <h3 className="text-base font-semibold text-slate-900">
                {pillar.label}
              </h3>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                {pillar.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
