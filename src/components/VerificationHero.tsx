import { useState, useEffect, type FormEvent, type RefObject } from 'react';
import {
  ShieldCheck,
  AlertCircle,
  Copy,
  Check,
  Printer,
  X,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  findInternshipRecord,
  normalizeVerificationCode,
  type InternshipRecord,
} from '../data/internships';

interface VerificationHeroProps {
  inputRef: RefObject<HTMLInputElement | null>;
}

type SearchState =
  | { status: 'idle' }
  | { status: 'empty_error' }
  | { status: 'verified'; record: InternshipRecord; queriedCode: string }
  | { status: 'not_found'; queriedCode: string };

export function VerificationHero({ inputRef }: VerificationHeroProps) {
  const [codeInput, setCodeInput] = useState('');
  const [searchState, setSearchState] = useState<SearchState>({ status: 'idle' });
  const [copied, setCopied] = useState(false);

  // Support direct verification links via ?code=... query parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialCode = params.get('code');
    if (initialCode) {
      setCodeInput(initialCode);
      const match = findInternshipRecord(initialCode);
      if (match) {
        setSearchState({
          status: 'verified',
          record: match,
          queriedCode: normalizeVerificationCode(initialCode),
        });
      } else {
        setSearchState({
          status: 'not_found',
          queriedCode: normalizeVerificationCode(initialCode),
        });
      }
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const normalized = normalizeVerificationCode(codeInput);

    if (!normalized) {
      setSearchState({ status: 'empty_error' });
      inputRef.current?.focus();
      return;
    }

    const match = findInternshipRecord(normalized);
    if (match) {
      setSearchState({
        status: 'verified',
        record: match,
        queriedCode: normalized,
      });
    } else {
      setSearchState({
        status: 'not_found',
        queriedCode: normalized,
      });
    }

    const url = new URL(window.location.href);
    url.searchParams.set('code', normalized);
    window.history.replaceState({}, '', url.toString());
  };

  const handleReset = () => {
    setCodeInput('');
    setSearchState({ status: 'idle' });
    setCopied(false);
    const url = new URL(window.location.href);
    url.searchParams.delete('code');
    window.history.replaceState({}, '', url.toString());
    inputRef.current?.focus();
  };

  const handleCopyLink = async () => {
    if (searchState.status !== 'verified') return;
    const url = new URL(window.location.href);
    url.searchParams.set('code', searchState.record.code);
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard permissions are restricted
      setCopied(false);
    }
  };

  const hasText = codeInput.trim().length > 0;

  return (
    <section
      id="verification"
      aria-labelledby="verification-heading"
      className="bg-white border-b border-slate-200/80 py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600 mb-5 no-print">
          Official Verification Portal
        </p>

        <h1
          id="verification-heading"
          className="font-serif font-bold text-4xl sm:text-5xl lg:text-[3.25rem] text-[#0B1221] tracking-tight leading-[1.12] mb-5 no-print"
        >
          Verify a Qythera Internship
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed mb-10 no-print">
          Verify the authenticity of an internship record issued by Qythera using
          the unique verification code provided on the certificate.
        </p>

        {/* Verification Input Card */}
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-[0_14px_44px_-12px_rgba(15,23,42,0.11)] border border-slate-200/75 p-6 sm:p-8 text-left no-print">
          <form onSubmit={handleSubmit} noValidate>
            <label
              htmlFor="verification-code-input"
              className="block text-xs font-semibold uppercase tracking-[0.1em] text-slate-700 mb-3"
            >
              Verification Code
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  id="verification-code-input"
                  type="text"
                  value={codeInput}
                  onChange={(e) => {
                    setCodeInput(e.target.value);
                    if (searchState.status === 'empty_error') {
                      setSearchState({ status: 'idle' });
                    }
                  }}
                  placeholder="Enter verification code"
                  autoComplete="off"
                  spellCheck={false}
                  aria-describedby="verification-helper"
                  className="w-full h-12 pl-4 pr-10 rounded-lg border border-slate-200 bg-white text-slate-900 font-mono text-sm tracking-wide placeholder:font-sans placeholder:tracking-normal placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-colors"
                />
                {hasText && (
                  <button
                    type="button"
                    onClick={handleReset}
                    aria-label="Clear verification code"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>

              <button
                type="submit"
                className={`h-12 px-6 rounded-lg text-sm font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${
                  hasText
                    ? 'bg-[#0B1221] text-white hover:bg-slate-800'
                    : 'bg-[#B8C4D0] text-white hover:bg-slate-500'
                }`}
              >
                <span>Verify Record</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {searchState.status === 'empty_error' && (
              <p
                role="alert"
                className="mt-3 text-xs font-medium text-rose-700 flex items-center gap-1.5"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Please enter the verification code printed on the certificate.</span>
              </p>
            )}

            <div
              id="verification-helper"
              className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500"
            >
              <span>Verification codes are unique to each internship record.</span>
              <span className="font-mono tabular-nums text-slate-400">
                Format: 7 alphanumeric characters
              </span>
            </div>
          </form>
        </div>

        {/* Result Area */}
        <AnimatePresence mode="wait">
          {searchState.status === 'verified' && (
            <motion.div
              key={`verified-${searchState.record.code}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl mt-8 text-left print-record"
              aria-live="polite"
            >
              <div className="bg-white rounded-xl border border-slate-200 shadow-[0_10px_32px_-12px_rgba(15,23,42,0.08)] overflow-hidden">
                {/* Verified Header Banner */}
                <div className="bg-emerald-50/70 border-b border-emerald-200/70 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 text-emerald-900">
                    <ShieldCheck
                      className="w-5 h-5 text-emerald-700 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-semibold tracking-tight">
                      Verified Internship Record
                    </span>
                  </div>
                  <span className="font-mono tabular-nums text-xs font-medium text-emerald-800">
                    Code: {searchState.record.code}
                  </span>
                </div>

                {/* Primary Student Identity */}
                <div className="p-6 sm:p-8">
                  <div className="pb-6 border-b border-slate-100">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 mb-2">
                      Intern Full Name
                    </p>
                    <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#0B1221] tracking-tight">
                      {searchState.record.studentName}
                    </h2>
                    {searchState.record.isSample && (
                      <p className="mt-2 text-xs text-slate-500">
                        Demonstration entry for previewing the verification layout.
                      </p>
                    )}
                  </div>

                  {/* Structured Metadata Definition List */}
                  <dl className="divide-y divide-slate-100 text-sm">
                    <div className="py-3.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                      <dt className="text-slate-500 font-medium">Issuing Organization</dt>
                      <dd className="text-slate-900 font-semibold">Qythera</dd>
                    </div>

                    <div className="py-3.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                      <dt className="text-slate-500 font-medium">Verification Status</dt>
                      <dd className="text-emerald-800 font-semibold inline-flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                        <span>{searchState.record.status} &amp; Authentic</span>
                      </dd>
                    </div>

                    <div className="py-3.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                      <dt className="text-slate-500 font-medium">Credential Code</dt>
                      <dd className="font-mono tabular-nums text-slate-900 font-medium">
                        {searchState.record.code}
                      </dd>
                    </div>

                    {searchState.record.role && (
                      <div className="py-3.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                        <dt className="text-slate-500 font-medium">Internship Role</dt>
                        <dd className="text-slate-900 font-medium">
                          {searchState.record.role}
                        </dd>
                      </div>
                    )}

                    {searchState.record.department && (
                      <div className="py-3.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                        <dt className="text-slate-500 font-medium">Department</dt>
                        <dd className="text-slate-900">{searchState.record.department}</dd>
                      </div>
                    )}

                    {searchState.record.duration && (
                      <div className="py-3.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                        <dt className="text-slate-500 font-medium">Internship Period</dt>
                        <dd className="text-slate-900 tabular-nums">
                          {searchState.record.duration}
                        </dd>
                      </div>
                    )}

                    {searchState.record.issueDate && (
                      <div className="py-3.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                        <dt className="text-slate-500 font-medium">Date Issued</dt>
                        <dd className="text-slate-900 tabular-nums">
                          {searchState.record.issueDate}
                        </dd>
                      </div>
                    )}
                  </dl>

                  {/* Actions */}
                  <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 no-print">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                            <span>Link Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                            <span>Copy Verification Link</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                        <span>Print Record</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs font-medium text-slate-600 hover:text-slate-950 underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Verify Another Code
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {searchState.status === 'not_found' && (
            <motion.div
              key={`not-found-${searchState.queriedCode}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl mt-8 text-left no-print"
              aria-live="polite"
            >
              <div className="bg-white rounded-xl border border-rose-200 p-6 sm:p-7">
                <div className="flex items-start gap-3.5">
                  <AlertCircle
                    className="w-5 h-5 text-rose-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="flex-1">
                    <h2 className="text-base font-semibold text-slate-900">
                      Record Not Found
                    </h2>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                      No Qythera internship record matches the code{' '}
                      <span className="font-mono font-semibold text-slate-900">
                        {searchState.queriedCode}
                      </span>
                      . Confirm the characters on the certificate and try again, or
                      contact the Qythera registrar below for manual verification.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-4 inline-flex items-center px-3.5 py-2 rounded-md border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      Clear &amp; Try Again
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
