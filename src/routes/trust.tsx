import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";

export const Route = createFileRoute("/trust")({
  component: TrustPage,
  head: () => ({
    meta: [
      { title: "Trust, Security & Privacy — Docly" },
      {
        name: "description",
        content:
          "How Docly approaches security, privacy, and data handling for the student community.",
      },
      { property: "og:title", content: "Trust, Security & Privacy — Docly" },
      {
        property: "og:description",
        content:
          "Learn how Docly protects accounts and handles your data.",
      },
      { property: "og:url", content: "https://docly-web-app.lovable.app/trust" },
    ],
    links: [{ rel: "canonical", href: "https://docly-web-app.lovable.app/trust" }],
  }),
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-[18px] font-bold mb-2">{title}</h2>
      <div className="text-[14px] text-muted-foreground leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  );
}

function TrustPage() {
  return (
    <AppLayout>
      <header className="mb-6">
        <h1 className="text-[24px] font-bold mb-2">Trust, Security & Privacy</h1>
        <p className="text-[13px] text-muted-foreground">
          This page is maintained by the Docly team to answer common security and
          privacy questions about Docly. It describes current practices and
          enabled controls — it is not an independent certification or audit.
        </p>
      </header>

      <Section title="Access & authentication">
        <p>
          Accounts are protected by email and password sign-in. Sessions are
          handled by our authentication provider and stored using browser-native
          secure storage. Users can sign out at any time from Settings.
        </p>
      </Section>

      <Section title="Platform & hosting">
        <p>
          Docly runs on the Lovable platform. Application code is served over
          HTTPS. Use of underlying platform infrastructure does not by itself
          imply any third-party certification of Docly.
        </p>
      </Section>

      <Section title="Data we collect & how we use it">
        <p>
          We collect the information needed to operate the product: account
          details you provide (such as name and email), the documents and posts
          you choose to share, and basic interaction data used to power features
          like search, library, and community feeds. We do not sell personal
          data.
        </p>
      </Section>

      <Section title="Cookies & analytics">
        <p>
          We use a minimal set of cookies and local storage entries required for
          sign-in, language preference, and theme. Any analytics is limited to
          aggregate product usage.
        </p>
      </Section>

      <Section title="Subprocessors & integrations">
        <p>
          Docly relies on a small set of service providers for hosting,
          authentication, and storage. Third-party services you connect from
          your account (for example, sign-in providers) operate under their own
          terms and privacy policies.
        </p>
      </Section>

      <Section title="Data retention & deletion">
        <p>
          Account and content data is retained while your account is active. You
          can request deletion of your account and associated personal data by
          contacting us; some records may be retained where required for
          security, fraud prevention, or legal compliance.
        </p>
      </Section>

      <Section title="Privacy requests">
        <p>
          To exercise privacy rights (access, correction, deletion, export),
          contact the Docly team using the contact channel listed in Settings.
          We respond to verified requests within a reasonable timeframe.
        </p>
      </Section>

      <Section title="Security & vulnerability reporting">
        <p>
          If you believe you have found a security issue affecting Docly, please
          report it privately to the Docly team rather than disclosing publicly.
          We appreciate good-faith reports and will work with you on a fix.
        </p>
      </Section>

      <Section title="Shared responsibility">
        <p>
          Security is a shared responsibility. Docly maintains the application
          and its configuration; the underlying platform provides hosting and
          baseline infrastructure controls; and users are responsible for
          safeguarding their account credentials and the content they choose to
          share.
        </p>
      </Section>

      <p className="text-[12px] text-muted-foreground mt-10">
        This page is app-owned editable content and may be updated as Docly
        evolves.
      </p>
    </AppLayout>
  );
}
