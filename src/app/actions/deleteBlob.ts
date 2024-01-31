"use server"

import { del } from '@vercel/blob';

export async function deleteBlobAction(url: string) {
    await del(url);
}