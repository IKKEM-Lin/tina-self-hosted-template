'use client'
 
const SSG_BASE_PATH = process.env.SSG_BASE_PATH || "";

export default function ssgImageLoader({ src }: any) {
  // console.log(src, width, quality)
  return `${SSG_BASE_PATH}${src.replace(/^\/api\/images/,"/uploads")}`
}