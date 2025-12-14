import { Container } from "@/components/Container";
import { Input } from "@/components/ui/input";
import client from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { Terminal } from "lucide-react";
import { SolutionsList } from "./components/SolutionsList";
import { IErrorSolutions } from "@/types/api.types";

const getErrorSolutions = async (): Promise<IErrorSolutions[] | undefined> => {
  try {
    const solutions = await client.request(
      readItems("error_solutions", {
        fields: [
          "id",
          "code",
          "title",
          "description",
          "severity",
          "category",
          { symptoms: ["id", { error_symptoms_id: ["id", "title"] }] },
          { causes: ["id", { error_causes_id: ["id", "title"] }] },
          "tags",
          "status",
          "sort",
          "date_updated",
        ] as const,
      }),
    );

    return solutions as IErrorSolutions[];
  } catch (error) {
    console.error("Error fetching solutions:", error);
  }
};

export default async function Page() {
  const solutions = await getErrorSolutions();

  return (
    <section>
      <header className="bg-linear-to-br from-slate-900 to-slate-800 text-white py-16 border-b">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Terminal className="h-10 w-10" />
              <h1 className="text-white text-3xl font-bold">
                Solutions Library
              </h1>
            </div>
            <p className="text-slate-300 text-xl mb-8">
              Comprehensive documentation of common errors and their solutions
            </p>
            <Input
              className="pl-12 h-14 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-slate-400"
              type="search"
              placeholder="Search by error code, title, or keywords..."
            />
          </div>
        </Container>
      </header>

      <SolutionsList solutions={solutions} />
    </section>
  );
}
