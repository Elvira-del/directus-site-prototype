import Image from "next/image";
import { Container } from "./Container";
import { IBlockHero } from "@/types/api.types";

export default function Hero({
  id,
  headline,
  content,
  buttons,
  image,
}: IBlockHero) {
  return (
    <section id={id} className="mb-10">
      <Container>
        <h2 className="text-3xl font-bold">{headline}</h2>
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/${image}`}
          alt=""
          width={700}
          height={350}
        />
        <div
          className="text-2xl"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="flex gap-4 mt-auto">
          {buttons?.map((button, index) => (
            <button key={index} className="">
              {button.label}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
