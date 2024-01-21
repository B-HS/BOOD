import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    try {
        const infos = await request.json()
        console.log(infos)

        const { data, error } = await supabase.from('bood').upsert(infos)

        if (error) {
            console.error('Error saving data to Supabase:', error)
            return NextResponse.error()
        }

        console.log('Data saved successfully:', data)
        return NextResponse.json('Data saved successfully')
    } catch (error) {
        console.error('Error processing request:', error)
        return NextResponse.error()
    }
}
