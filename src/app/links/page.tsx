"use client";

import { useEffect, useState } from "react";

interface LinkData {
    name: string,
    description: string,
    link: string,
    image_link?: string,
}

export default function LinksPage() {
    const [links, setLinks] = useState<any[]>([]);

    async function loadServices() {
        const res = await fetch("/api/links");
        const json = await res.json();

        setLinks(json.links)
    }

    useEffect(() => {
        loadServices();
    }, [])

    return (
        <div>
            <h1 className="text-3xl">相互リンク一覧</h1>
            <p className="pt-3 mb-5">
                相互リンクはいつでも募集しています。<br/>
                申請は以下のDiscordサーバーから↓<br/><br/>
                <a href="https://discord.gg/adEJ7SfJUN" className="bg-blue-600 p-3 rounded-sm text-white">Discordサーバー</a>
            </p><br/>

            {links.length > 0 ? <div className="flex flex-wrap gap-4">
                {links.map((link: LinkData) => <a href={link.link} key={link.link}>
                    <div className='p-3 border rounded-sm'>
                        <span className='text-2xl'>{link.name}</span><br/>
                        {link.description}<br/>
                        {link.image_link ? <img src={link.image_link} className="w-20 h-auto" /> : ""}
                    </div>
                </a>)}
            </div> : "ロード中.."}
        </div>
    );
}