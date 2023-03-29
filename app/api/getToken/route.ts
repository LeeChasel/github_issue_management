import { NextRequest, NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt"

export async function GET(req:NextRequest)
{
    const token = await getToken({req})
    if (token) return NextResponse.json({access_Token : token.accessToken})
    return new Response("Don't have login", {
        status:401,
    })
}