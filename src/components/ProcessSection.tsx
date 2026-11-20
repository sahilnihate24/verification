export function ProcessSection() {
  const steps = [
    {
      index: '01.',
      title: 'Locate Certificate Code',
      description:
        'Find the unique alphanumeric verification code printed in the credential footer or official completion letter issued by Qythera.',
    },
    {
      index: '02.',
      title: 'Submit for Lookup',
      description:
        'Enter the verification code into the portal above and select Verify Record. Matching is case-insensitive and instant.',
    },
    {
      index: '03.',
      title: 'Confirm Student Identity',
      description:
        'Review the returned official record displaying the intern name, issuing organization, and credential authenticity status.',
    },
  ];

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-[#FAFBFD] border-b border-slate-200/80 py-20 px-4 sm:px-6 lg:px-8 no-print"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 mb-3">
            Process
          </p>
          <h2
            id="process-heading"
            className="font-serif font-bold text-3xl sm:text-4xl text-[#0B1221] tracking-tight"
          >
            How Verification Works
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Employers, academic institutions, and background reviewers can confirm
            internship records directly through three steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.index}
              className="bg-white rounded-xl border border-slate-200/80 p-7 flex flex-col justify-between"
            >
              <div>
                <p className="font-serif text-lg font-semibold text-slate-900 mb-3">
                  {step.index} {step.title}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
