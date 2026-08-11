export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-6 font-[family-name:var(--font-display)] text-4xl font-semibold">
        Privacy Policy
      </h1>
      <div className="space-y-6 text-muted-foreground">
        <p>
          FixItNow collects the information you provide during registration — your name, email,
          and role — along with booking, payment, and review data generated as you use the
          platform.
        </p>
        <div>
          <h2 className="mb-2 font-semibold text-foreground">How we use your data</h2>
          <p>
            Your information is used to operate core platform features: matching customers with
            technicians, processing bookings and payments, and displaying reviews. We do not sell
            your personal data to third parties.
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-semibold text-foreground">Payments</h2>
          <p>
            Payment processing is handled by SSLCommerz. FixItNow does not store your card or
            mobile banking credentials directly.
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-semibold text-foreground">Your rights</h2>
          <p>
            You may request access to or deletion of your account data at any time by contacting
            support.
          </p>
        </div>
      </div>
    </main>
  );
}