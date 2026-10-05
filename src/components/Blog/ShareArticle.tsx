"use client";

import Image from "next/image";
import { useState } from "react";

const SITE_URL = "https://www.fluensyfrench.com";

type ShareArticleProps = {
  title: string;
  path: string;
};

const ShareArticle = ({ title, path }: ShareArticleProps) => {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}${path}`;

  const shareLinks = [
    {
      label: "Share on LinkedIn",
      icon: "/blog-linkedin-share.svg",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: "Share on X",
      icon: "/blog-x-share.svg",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      label: "Share on WhatsApp",
      icon: "/blog-whatsapp-share.svg",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (e.g. non-secure context); nothing else to do
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 text-[20px] text-secondary-1">
      <span className="text-primary">Share article</span>

      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link to article"
        className="relative hover:opacity-70 transition-opacity"
      >
        <Image src="/blog-copy-link.svg" alt="" width={24} height={24} />
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-primary px-2 py-1 text-[14px] text-white">
            Copied!
          </span>
        )}
      </button>

      {shareLinks.map(({ label, icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="hover:opacity-70 transition-opacity"
        >
          <Image src={icon} alt="" width={24} height={24} />
        </a>
      ))}
    </div>
  );
};

export default ShareArticle;
