"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [categorys, setCategorys] = useState<any[]>([]);

  async function loadServices() {
    const res = await fetch("/api/top");
    const json = await res.json();

    setCategorys(json.categorys)
  }

  useEffect(() => {
    loadServices();
  }, [])

  return (
    <div>
      <h1 className="text-3xl border-b">👋ようこそ！</h1>
      <p className="pt-3 mb-5">NukoServerは使いやすいサービスを<br/>提供しています。</p>

      <h1 className="text-3xl border-b">😆私たちについて</h1>
      <p className="pt-3 mb-5">私たちは主にX、Youtube、<br/>Misskey、Fluxerで活動しています。</p>

      {categorys.length > 0 ? 
        categorys.map((category) => (
          <section key={category.name}>
            <h3 className="text-3xl border-b">{category.name}</h3>
            {category.services.map((service: any) => (
              <a href={service.url} key={service.name}>
                <div className="p-4">
                  <h3 className="text-2xl">{service.emoji}{service.name}</h3>
                  <p className="border-b">{service.description}</p>
                </div>
              </a>
            ))}
          </section>
        ))
      : "追加情報をロード中.."}
    </div>
  );
}
