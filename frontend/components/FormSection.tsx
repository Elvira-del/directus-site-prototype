"use client";

import { useState } from "react";
import { Container } from "./Container";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function FormSection({ tagline, headline, form }) {
  const [formData, setFormData] = useState(() =>
    form.fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}),
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/form_submissions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setIsSubmitted(true);
      setFormData(
        form.fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}),
      );
    } catch (err) {
      console.error(err);
      setError("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!form || !form.fields) return null;

  return (
    <section className="mb-10 bg-gray-50 py-20">
      <Container>
        <div className="text-center mb-12">
          {tagline && <p className="text-gray-600">{tagline}</p>}
          {headline && <h2>{headline}</h2>}
        </div>

        {isSubmitted ? (
          <div className="text-center bg-green-200 p-10 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-green-700 mb-2.5">
              Thank you!
            </h3>
            <p className="text-base text-green-700 mb-7">
              {form.success_message ||
                "Your form has been successfully submitted."}
            </p>
            <Button onClick={() => setIsSubmitted(false)}>
              Submit another response
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col max-w-[50%] space-y-6 mx-auto"
          >
            {error && (
              <div className="bg-red-200 text-red-700 p-3 rounded-lg mb-5 text-[14px]">
                {error}
              </div>
            )}

            {form.fields.map((field) => (
              <div key={field.id}>
                <Label htmlFor={field.name}>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea
                    className="mt-2"
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    placeholder="Your message..."
                    onChange={handleChange}
                    rows={5}
                    required={field.required}
                  />
                ) : (
                  <Input
                    className="mt-2"
                    id={field.name}
                    type={field.type || "text"}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                  />
                )}
              </div>
            ))}

            <Button
              className="w-full"
              size="lg"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : form.submit_label || "Submit"}
            </Button>
          </form>
        )}
      </Container>
    </section>
  );
}
