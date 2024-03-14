'use client'
import {createArticle} from "@/blogApi";
import {useState} from "react";
import {useRouter} from "next/navigation";

const CreateBlogPage =  () => {
    const router = useRouter()
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const hadleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setLoading(true)
        await createArticle(id,title,content)
        setLoading(false)
        router.push("/")
        router.refresh()
    }

    return <div className='min-h-screen py-8 px-4 md:px-12'>
        <h2 className='text-2xl font-bold mb-4'>ブログ新規作成</h2>
        <form action="" className='bg-slate-200 p-6 rounded shadow-lg' onSubmit={hadleSubmit}>
            <div className='mb-4'>
                <label htmlFor="" className='text-gray-700 text-sm font-bold mb-2'>URL</label>
                <input type="text"
                       className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none'
                       onChange={(e)=> {setId(e.target.value)}}
                />
            </div>
            <div className='mb-4'>
                <label htmlFor="" className='text-gray-700 text-sm font-bold mb-2'>タイトル</label>
                <input type="text"
                       className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none'
                       onChange={(e)=> {setTitle(e.target.value)}}
                />
            </div>
            <div className='mb-4'>
                <label htmlFor="" className='text-gray-700 text-sm font-bold mb-2'>本文</label>
                <textarea
                       className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none'
                       onChange={(e)=> {setContent(e.target.value)}}
                />
            </div>

            <button type='submit' className={`py-2 px-4 border rounded-md bg-orange-300 ${loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-400 hover:bg-orange-500"}`}
                disabled={loading}
            >
                投稿
            </button>
        </form>
    </div>
}
export default CreateBlogPage