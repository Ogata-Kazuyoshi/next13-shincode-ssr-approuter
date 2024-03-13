# Next.js13の基本コード（Approuter）

<details open="open">
<summary>目次</summary>



- [Nextjsセットアップ](#Nextjsセットアップ)
- [CSRの書き方](#CSRの書き方)
- [index.tsxについて](#index.tsxについて)
- [ダイナミックルーティングについて](#ダイナミックルーティングについて)
- [Linkタグとaタグの違い](#Linkタグとaタグの違い)

- [参考](#参考)

</details>

# Nextjsセットアップ

<summary> 1. 下記コマンドでNextAppを作成</summary>


```zh
 npx create-next-app@latest
```

<summary> 2. 下記の設定を聞かれる</summary>

```zh
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like to use `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes => AppRouterにするとpage.tsxしかルーティングできなくなる
Would you like to customize the default import alias (@/*)? No / Yes
What import alias would you like configured? @/*
```

# CSRの書き方
- CSR(client side rendering)はNextjsではデフォルでは実行できな（デフォがSSR）
- useEffectやuseStateなどのメソッドはCSR用のメソッドで使用できない。
- CSRでレンダリングしたい時は下記の様に、use clientを書いてあげる
- CSR：初回レンダリングがClient依存のため遅い。２回目以降はキャッシュデータを使用
- SSR：初回レンダリングは早い。２回目以降も毎回サーバー側でレンダリングするのでCSRより遅い

```tsx
'use client'

export default  function Home() {
    useEffect(()=>{
        const getArticle = async () => {
            const res = await fetch('http://localhost/3001/posts',{cache : "force-cache"})
            return await res.json()
        }
        getArticle()
    })
   
    return (
        <div className='md:flex'>
            <section className='w-full md:w-2/3 flex flex-col items-center px-3'>
                <ArticleList articles={articles}/>
            </section>
        ....
        </div>)
```

# 参考
- [Nextjsの公式ドキュメント](https://nextjs.org/docs)
