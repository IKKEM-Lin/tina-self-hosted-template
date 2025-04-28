"use client";

import React from "react";
import { BUTTON_HOVER_CLASS } from "../utils/constant";
// import { usePathname } from "next/navigation";

interface TranslationProps {
  lang: string;
}

const Translation: React.FC<TranslationProps> = ({ lang }) => {
  // Your translation logic here
  // console.log(lang);
  return (
    <div
      onClick={() => {
        const currentHref = window.location.href;
        if (window.location.pathname === "/") {
          window.location.href = lang === "en" ? "/zh" : "/en";
          return;
        }
        if (lang === "en") {
          window.location.href = currentHref.replace("/en", "/zh");
        } else {
          window.location.href = currentHref.replace("/zh", "/en");
        }
      }}
      className={`flex items-center gap-1 px-3 h-7 border-custom-gray-33 rounded-full ${BUTTON_HOVER_CLASS}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.75 5.34722H12.6389C13.176 5.34722 13.6111 5.77986 13.6111 6.31944V12.6389C13.6111 13.176 13.1785 13.6111 12.6389 13.6111H6.31944C5.78229 13.6111 5.34722 13.1785 5.34722 12.6389V8.75H7.29167C8.10153 8.75 8.75 8.09715 8.75 7.29167V5.34722ZM0 0.972222C0 0.435069 0.432639 0 0.972222 0H7.29167C7.82882 0 8.26389 0.432639 8.26389 0.972222V7.29167C8.26389 7.82882 7.83125 8.26389 7.29167 8.26389H0.972222C0.435069 8.26389 0 7.83125 0 7.29167V0.972222ZM1.94444 5.16882H2.65417V4.79257H3.67792V6.58924H4.42993V4.79257H5.47458V5.10611H6.2475V2.72465H4.42993V2.20257C4.42993 2.04944 4.45083 1.91722 4.49312 1.8059C4.50426 1.78649 4.51122 1.76497 4.51354 1.74271C4.51354 1.7291 4.46493 1.71549 4.36771 1.70139H3.65653V2.72465H1.94444V5.16882ZM2.65417 3.30993H3.67792V4.22868H2.65465L2.65417 3.30993ZM5.47458 4.22868H4.42993V3.31042H5.47458V4.22868ZM8.57111 11.6419L8.86375 10.8272H10.3887L10.6813 11.6419H11.5165L10.1587 7.77778H9.17681L7.77778 11.6424L8.57111 11.6419ZM9.07278 10.1797L9.63667 8.52979H9.65757L10.1797 10.1797H9.07278ZM12.6389 3.88889H11.6667C11.6667 2.815 10.7961 1.94444 9.72222 1.94444V0.972222C11.3331 0.972222 12.6389 2.27806 12.6389 3.88889ZM0.972222 9.72222H1.94444C1.94444 10.7961 2.815 11.6667 3.88889 11.6667V12.6389C2.27806 12.6389 0.972222 11.3331 0.972222 9.72222Z"
          fill="currentColor"
        />
      </svg>

      <span className="">{lang === "en" ? "中" : "EN"}</span>
    </div>
  );
};

export default Translation;
