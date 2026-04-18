import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-ivory-parchment border-t border-ivory-linen px-8 py-12 text-center">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-center">
          <Image
            src="/images/logo.png"
            alt="Monoes"
            width={60}
            height={60}
            className="mx-auto mb-4 opacity-70"
          />
        </div>
        <div className="mb-6 flex items-center justify-center gap-8 text-sm text-gold-bronze">
          <Link
            href="https://github.com/nokhodian"
            className="transition-colors hover:text-espresso"
          >
            GitHub
          </Link>
          <Link href="/community" className="transition-colors hover:text-espresso">
            Community
          </Link>
        </div>
        <p className="text-xs text-gold-bronze/50">
          &copy; {new Date().getFullYear()} Nokhodian. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
