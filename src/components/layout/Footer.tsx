import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-espresso-deep px-8 py-12 text-center">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-center gap-8 text-sm text-gold/50">
          <Link
            href="https://github.com/nokhodian"
            className="transition-colors hover:text-gold"
          >
            GitHub
          </Link>
          <Link href="/community" className="transition-colors hover:text-gold">
            Community
          </Link>
        </div>
        <p className="text-xs text-gold/30">
          &copy; {new Date().getFullYear()} Nokhodian. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
