import { Container } from "./Container";

type RichTextProps = {
  id: string;
  headline: string;
  content: string;
};

export default function RichText({ id, headline, content }: RichTextProps) {
  return (
    <section id={id} className="mb-10">
      <Container>
        <h2>{headline}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </section>
  );
}
