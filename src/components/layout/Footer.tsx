import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-espresso-deep px-8 py-12 text-center">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-center">
          <Image
            src="/images/nokhodian-logo.png"
            alt="Nokhodian"
            width={80}
            height={80}
            className="mx-auto mb-4 opacity-30"
          />
        </div>
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
