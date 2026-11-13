"use client";

import Image from "next/image";
import Icon from "@/public/icon.png";
import { useState, useEffect } from "react";
import { House, LayoutGrid } from "lucide-react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const isMobile = window.matchMedia("(max-width: 767px)").matches;

        if (isMenuOpen && isMobile) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");

        const updateLayout = () => {
            document.body.style.paddingRight = mediaQuery.matches
                ? "16rem"
                : "";
        };

        updateLayout();
        mediaQuery.addEventListener("change", updateLayout);

        return () => {
            mediaQuery.removeEventListener("change", updateLayout);
            document.body.style.paddingRight = "";
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            <header className="site-header fixed top-0 left-0 w-full z-[60]">
                <div className="h-16 flex items-center justify-between px-4 md:px-6">

                    <a
                        href="/"
                        className="flex items-center gap-3 group"
                    >
                        <Image
                            src={Icon}
                            alt="NukoServer"
                            className="h-10 w-10 object-contain transition-transform duration-200 group-hover:scale-105"
                        />

                        <div className="flex flex-col">
                            <h1 className="text-xl md:text-2xl font-bold tracking-tight leading-tight">
                                NukoServer
                            </h1>
                        </div>
                    </a>

                    <button
                        type="button"
                        className="menu-toggle md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
                        aria-expanded={isMenuOpen}
                        aria-controls="site-navigation"
                    >
                        {isMenuOpen ? (
                            <svg
                                viewBox="0 0 24 24"
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            >
                                <path d="M18 6 6 18M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg
                                viewBox="0 0 24 24"
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            >
                                <path d="M4 7h16M4 12h16M4 17h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            <div
                className={`
                    mobile-overlay fixed inset-0 top-16 z-40 md:hidden
                    transition-opacity duration-300
                    ${isMenuOpen
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"}
                `}
                onClick={() => setIsMenuOpen(false)}
                aria-hidden="true"
            />

            <nav
                id="site-navigation"
                aria-label="メインメニュー"
                className={`
                    site-nav fixed top-16 right-0 z-50
                    h-[calc(100dvh-4rem)]
                    w-72 max-w-[85vw]
                    overflow-y-auto overscroll-contain
                    transition-transform duration-300 ease-in-out

                    ${isMenuOpen ? "translate-x-0" : "translate-x-full"}

                    md:translate-x-0
                    md:w-64 md:max-w-none
                `}
            >
                <div className="p-5">
                    <div className="mb-7">
                        <h2 className="text-xl font-bold">
                            メニュー
                        </h2>
                    </div>

                    <ul className="space-y-2">
                        <li>
                            <a
                                href="/"
                                className="nav-link"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <House />
                                <span>ホーム</span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="/services"
                                className="nav-link"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <LayoutGrid />
                                <span>サービス一覧</span>
                            </a>
                        </li>
                    </ul>

                    <div className="nav-footer mt-10 pt-5">
                        <p className="header-muted text-xs">
                            Copyright© 2026<br/>
                            NukoServer All rights reserved.
                        </p>
                    </div>
                </div>
            </nav>
        </>
    );
}