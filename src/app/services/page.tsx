"use client";

import { useEffect, useState } from "react";

export default function Services() {
    const [categorys, setCategorys] = useState<any[]>([]);

    async function loadServices() {
        const res = await fetch("/api/services");
        const json = await res.json();

        setCategorys(json.categorys)
    }

    useEffect(() => {
        setTimeout(() => {
            loadServices();
        }, 500)
    }, [])

    return (
        <div>
            <h1 className="text-3xl">サービス一覧</h1>
            <p className="pt-3 mb-5">便利なサービスを提供しています。</p>

            {categorys.length > 0 ? 
                categorys.map((category) => (
                    <section key={category.name}>
                        <h3 className="text-2xl border-b">{category.name}</h3>
                        <div className="flex flex-wrap gap-4">
                            {category.services.map((service: any) => (
                                <a href={service.url} key={service.name}>
                                    <div className="text-white p-4">
                                        <h3 className="text-2xl">{service.name}</h3>
                                        <p className="border-b mb-3">{service.description}</p>
                                        <img className="h-30 w-30 rounded-full" src={service.icon_url} />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>
                ))
            : "ロード中.."}
        </div>
    );
}
