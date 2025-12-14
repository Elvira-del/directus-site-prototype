import { IBlockRichtext } from "@/types/api.types";
import { Container } from "./Container";

export default function RichText({ id, headline, content }: IBlockRichtext) {
  return (
    <section id={id} className="mb-10">
      <Container>
        <h2>{headline}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </section>
  );
}
