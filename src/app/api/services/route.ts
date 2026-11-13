import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
export async function GET(request: Request) {
  try {
    const jsonDirectory = path.join(process.cwd(), 'app/data');
    const filePath = path.join(jsonDirectory, `services.json`);

    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: '読み込みに失敗しました。' } },
      { status: 404 }
    );
  }
}