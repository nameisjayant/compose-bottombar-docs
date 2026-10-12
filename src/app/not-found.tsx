import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <h1>Page not found</h1>
      <p>That page slipped off the bar.</p>
      <Link href="/" className="btn btn-primary">Back home</Link>
    </main>
  );
}
