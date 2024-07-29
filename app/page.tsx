import Header from "@/app/components/header";
import HeroImage from "@/public/hero-image.jpg";
import Image from "next/image";
import ChatSection from "./components/chat-section";

export default function Home() {
  return (
    <main className=" text-slate-50 h-screen w-screen flex justify-center items-center">
      <Image
        alt="HeroImage"
        src={HeroImage}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        className="object-left"
        style={{
          objectFit: "cover",
        }}
      />
      <div className=" z-50 space-y-2 lg:space-y-10 w-[90%] lg:w-[60rem]">
        <Header />
        <div className="h-[60vh] flex">
          <ChatSection />
        </div>
      </div>
      <div className="absolute bottom-8 ">
        <span>
          Powered by&nbsp;
          <a
            className="font-bold hover:underline"
            href="https://ts.llamaindex.ai/"
          >
            LlamaIndex&nbsp;
            <Image
              src="/llama.png"
              className="inline"
              alt="LlamaIndex"
              width={26}
              height={25}
            ></Image>
          </a>
        </span>
        <div>
          Made with ♡ by{" "}
          <a
            className="font-bold hover:underline"
            href="https://github.com/wanasim"
          >
            wanasim
          </a>
        </div>
      </div>
    </main>
  );
}
