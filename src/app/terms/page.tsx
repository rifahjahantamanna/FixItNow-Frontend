export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-6 font-[family-name:var(--font-display)] text-4xl font-semibold">
        Terms of Service
      </h1>
      <div className="space-y-6 text-muted-foreground">
        <div>
          <h2 className="mb-2 font-semibold text-foreground">Bookings</h2>
          <p>
            Customers may book any listed service. A booking is only confirmed once the
            technician accepts and payment is completed.
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-semibold text-foreground">Technician Conduct</h2>
          <p>
            Technicians are expected to accurately represent their skills and complete accepted
            jobs professionally. Accounts that violate platform policies may be suspended by an
            administrator.
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-semibold text-foreground">Payments &amp; Refunds</h2>
          <p>
            All payments are processed through SSLCommerz. Refund requests for incomplete or
            unsatisfactory work should be directed to support for review.
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-semibold text-foreground">Reviews</h2>
          <p>
            Reviews may only be submitted by the customer on a completed booking, and reflect the
            genuine experience of that booking.
          </p>
        </div>
      </div>
    </main>
  );
}