import { NextResponse } from 'next/server';

const getDebouncedResponse = async <T>(data: T) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 700);
  });
};
export async function POST(request: Request) {
  const data = await request.json();

  const response = await getDebouncedResponse(data);
  return NextResponse.json(response);
}
