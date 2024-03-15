import {supabase} from "@/utils/supabaseClient";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req:NextRequest,res:NextResponse) {

    const { data, error } = await supabase
        .from('supabase_blog')
        .select('*')

    if (error) {
        console.log("/pageのGETでエラーです")
        return NextResponse.json(error);
    }

    return NextResponse.json(data);
}

export async function POST(req: Request, res: Response) {
    const { id, title, content } = await req.json();
    console.log("id : ",id)
    console.log("title : ",title)
    console.log("content : ",content)

    const { data, error } = await supabase
        .from("supabase_blog")
        .insert([{ id, title, content, createdAt: new Date().toISOString() }]);

    if (error) {
        console.log("errorが出てます :",error)
        return NextResponse.json(error);
    }

    return NextResponse.json(data);
}