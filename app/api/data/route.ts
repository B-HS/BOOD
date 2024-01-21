import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    try {
        const infos = await request.json()
        const { data, error } = await supabase.from('bood').upsert(infos)
        if (error) {
            return NextResponse.error()
        }

        return NextResponse.json('Data saved successfully')
    } catch (error) {
        return NextResponse.error()
    }
}
