import Link from "next/link";
import { getAllPages } from "../../src/services/content/getAllPages";
import { getAllBlogArticles } from "../../src/services/content/getAllBlogArticle"
import Image from "next/image";
import { RichTextRenderer } from "@caisy/rich-text-react-renderer";

const allArticles = async () => {
    const data = await getAllBlogArticles({});
    return data;
}
const allPages = async () => {
    const resAllPages = await getAllPages({});
    return resAllPages?.filter((page) => page.slug && page.slug !== "404")
}
const Blog = async () => {
    const articles = await allArticles();
    const pages = await allPages();

    return (
        <>
            <div className="bg-white py-14">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        {pages.map((page) => {
                            if (page.slug === "blog") {
                                return (
                                    <div key={page.id}>
                                        {/* @ts-ignore */}
                                        {page.components.map((component) => {
                                            const text = component.text;
                                            return (
                                                <div key={component.id} className="[&>h1]:text-3xl [&>h1]:sm:text-4xl [&>h1]:font-bold [&>p]:text-lg [&>p]:mt-2 tracking-tight text-gray-900">
                                                    {text?.json && <RichTextRenderer node={text?.json} />}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {articles.map(article => (
                            <article key={article.id} className="flex flex-col items-start justify-between">
                                <div className="relative w-full">
                                    <Image
                                        // @ts-ignore
                                        src={article?.teaserImage?.src}
                                        alt=""
                                        width={1024}
                                        height={686}
                                        objectFit="contain"
                                        className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                    />
                                    {/* <img
                                        src={post.imageUrl}
                                        alt=""
                                        className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                    /> */}
                                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                                </div>
                                <div className="max-w-xl">
                                    {/* <div className="mt-8 flex items-center gap-x-4 text-xs">
                                        <time dateTime={post.datetime} className="text-gray-500">
                                            {post.date}
                                        </time>
                                        <a
                                            href={post.category.href}
                                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                        >
                                            {post.category.title}
                                        </a>
                                    </div> */}
                                    <div className="group relative">
                                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                            <Link href={`/${article?.slug}`}>
                                                <span className="absolute inset-0" />
                                                {article?.seo?.title}
                                            </Link>
                                        </h3>
                                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{article.teaserDesciption}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog