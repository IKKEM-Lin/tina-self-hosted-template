'use client'
 
export default function ssgImageLoader({ src }: any) {
  // console.log(src, width, quality)
  return `${src.replace(/^\/api\/images/,"/uploads")}`
}