"use client";

import { Container } from "./Container";

export default function RichTextSection({
  id,
  tagline,
  headline,
  content,
  alignment = "center",
}) {
  return (
    <section id={id} className="mb-10">
      <Container>
        <div className={`text-${alignment}`}>
          {tagline && <p className="tagline">{tagline}</p>}
          {headline && <h2>{headline}</h2>}
          {content && (
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </Container>
    </section>
  );
}
