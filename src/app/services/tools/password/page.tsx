"use client";

import { CircleCheck, ClipboardCopy } from "lucide-react";
import { useEffect, useState } from "react";

export default function PasswordGenTool() {
    const [number, setNumber] = useState<number>(16);
    const [password, setPassword] = useState<string>("ロード中..");
    const [isCopyed, setIsCopyed] = useState<boolean>(false);

    function generatePassword(length = 24) {
        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
            "abcdefghijklmnopqrstuvwxyz" +
            "0123456789" +
            "!@#$%^&*()-_=+[]{}";

        const result = [];
        const randomValues = new Uint8Array(128);

        const limit = Math.floor(256 / chars.length) * chars.length;

        while (result.length < length) {
            crypto.getRandomValues(randomValues);

            for (const value of randomValues) {
                if (value >= limit) continue;

                result.push(chars[value % chars.length]);

                if (result.length >= length) break;
            }
        }

        return result.join("");
    }

    useEffect(() => {
        setPassword(generatePassword(number));
    }, [number])

    return (
        <div>
            <h1 className="text-3xl">安全なパスワード生成</h1>
            <p className="pt-3 mb-5">安全なパスワードを生成できます。</p>

            <div>
                <h4 className="text-1xl">桁数を入力</h4>
                <input onChange={(e) => {
                    const num = Number(e.target.value)
                    if (Number.isNaN(num)) return;
                    setNumber(num)
                }} value={String(number)} type="number" className="mb-5 border p-2 rounded-sm" />

                <h4 className="text-1xl">生成したパスワード</h4>
                <div className="flex items-center gap-2 mb-5">
                    <input value={password} type="text" className="border p-2 w-[80%] rounded-sm h-full" readOnly />
                    <button onClick={() => {
                        navigator.clipboard.writeText(password);
                        setIsCopyed(true);
                        setTimeout(() => {
                            setIsCopyed(false);
                        }, 3000)
                    }}>{!isCopyed ? <ClipboardCopy color="#ff7b0f" className="h-full" /> : <CircleCheck color="#2bff0f" className="h-full" /> }</button>
                </div>

                <button onClick={() => setPassword(generatePassword(number))} className="bg-blue-600 p-2 rounded-sm text-white">再生成</button>
            </div>
        </div>
    );
}