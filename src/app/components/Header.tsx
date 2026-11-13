
"use client";

import Image from "next/image";
import Icon from "@/public/icon.png";
import { useState, useEffect } from "react";

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

    return (
        <>
            {/* ヘッダー */}
            <header className="fixed top-0 left-0 w-full z-[60] bg-gray-800">
                <div className="flex justify-between items-center p-3">
                    <div className="flex items-center">
                        <Image
                            src={Icon}
                            alt="Icon"
                            className="h-10 w-10 ml-5"
                        />
                        <h1 className="text-3xl m-3">NukoServer</h1>
                    </div>

                    {/* スマホ用メニューボタン */}
                    <button
                        className="md:hidden border px-3 py-2 rounded-sm mr-3"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="メニューを開閉"
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? "×" : "≡"}
                    </button>
                </div>
            </header>

            {/* スマホ用オーバーレイ */}
            <div
                className={`
                    fixed inset-0 top-16 z-40 bg-black/50 md:hidden
                    transition-opacity duration-300
                    ${isMenuOpen
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"}
                `}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* メニュー */}
            <nav
                className={`
                    fixed top-16 right-0 z-50
                    h-[calc(100dvh-4rem)]
                    w-72 max-w-[85vw]
                    shadow-xl
                    overflow-y-auto overscroll-contain
                    transition-transform duration-300 ease-in-out
                    bg-gray-800

                    ${isMenuOpen ? "translate-x-0" : "translate-x-full"}

                    md:translate-x-0
                    md:w-64 md:max-w-none
                    md:shadow-none
                `}
            >
                <div className="p-5">
                    <h2 className="text-xl font-bold mb-5">
                        NukoServer
                    </h2>

                    <ul className="space-y-4">
                        <li>
                            <a href="/" className="block p-3 hover:bg-gray-500 rounded">
                                ホーム
                            </a>
                        </li>
                        <li>
                            <a href="/services" className="block p-3 hover:bg-gray-500 rounded">
                                サービス一覧
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}