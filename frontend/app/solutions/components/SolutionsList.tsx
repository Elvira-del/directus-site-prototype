"use client";

import { Container } from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import { useState } from "react";

function getSeverityIcon(severity) {
  switch (severity) {
    case "critical":
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case "high":
      return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    case "medium":
      return <Info className="h-5 w-5 text-yellow-500" />;
    case "low":
      return <CheckCircle className="h-5 w-5 text-blue-500" />;
  }
}

function getSeverityColor(severity) {
  switch (severity) {
    case "critical":
      return "bg-red-100 text-red-800 border-red-200";
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "low":
      return "bg-blue-100 text-blue-800 border-blue-200";
  }
}

export const SolutionsList = ({ solutions }) => {
  const [expandedError, setExpandedError] = useState<string | null>(null);

  return (
    <Container>
      <div className="space-y-4">
        {solutions?.map((solution) => {
          const isExpanded = expandedError === solution.id;
          return (
            <Card
              key={solution.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader
                className="cursor-pointer"
                onClick={() =>
                  setExpandedError(isExpanded ? null : solution.id)
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1">
                      {getSeverityIcon(solution.severity)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <code className="px-3 py-1 bg-gray-100 rounded text-sm text-gray-800">
                          {solution.code}
                        </code>
                        <Badge
                          className="capitalize"
                          key={solution.category}
                          variant="outline"
                        >
                          {solution.category}
                        </Badge>
                        <Badge
                          className={getSeverityColor(solution.severity)}
                          variant="outline"
                        >
                          {solution.severity}
                        </Badge>
                      </div>
                      <h3 className="text-gray-900 mb-2">{solution.title}</h3>
                      <div
                        className="text-gray-600"
                        dangerouslySetInnerHTML={{
                          __html: solution.description,
                        }}
                      />
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="border-t bg-gray-50">
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="text-gray-900 mb-3 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        Symptoms
                      </h4>
                      <ul className="space-y-2">
                        {solution.symptoms.map(
                          ({ error_symptoms_id: { id, title } }) => (
                            <li
                              key={id}
                              className="flex items-baseline gap-2 text-gray-700"
                            >
                              <span className="text-red-500 mt-1">•</span>
                              {title}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-gray-900 mb-3 flex items-center gap-2">
                        <Info className="h-5 w-5 text-blue-500" />
                        Common Causes
                      </h4>
                      <ul className="space-y-2">
                        {solution.causes.map(
                          ({ error_causes_id: { id, title } }) => (
                            <li
                              key={id}
                              className="flex items-baseline gap-2 text-gray-700"
                            >
                              <span className="text-blue-500 mt-1">•</span>
                              {title}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Solutions
                    </h4>
                    <div className="space-y-6">
                      {/* {solution.solutions.map(
                      ({ step, title, description, codeExample }) => (
                        <div
                          key={step}
                          className="bg-white rounded-lg p-6 border"
                        >
                          <div className="flex items-start gap-4">
                            <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                              {step}
                            </div>
                            <div className="flex-1">
                              <h5 className="text-gray-900 mb-2">{title}</h5>
                              <p className="text-gray-600 mb-4">
                                {description}
                              </p>
                              {codeExample && <CodeBlock code={codeExample} />}
                            </div>
                          </div>
                        </div>
                      ),
                    )} */}
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="text-gray-600 mb-2">Tags:</div>
                      <div className="flex flex-wrap gap-2">
                        {solution.tags?.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {/* {solutions.relatedErrors.length > 0 && (
                    <div>
                      <div className="text-gray-600 mb-2">Related Errors:</div>
                      <div className="flex flex-wrap gap-2">
                        {solutions.relatedErrors.map((relatedCode) => (
                          <code
                            key={relatedCode}
                            className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-800 cursor-pointer hover:bg-gray-200"
                            onClick={() => {
                              const relatedError = errorSolutions.find(
                                (e) => e.code === relatedCode,
                              );
                              if (relatedError)
                                setExpandedError(relatedError.id);
                            }}
                          >
                            {relatedCode}
                          </code>
                        ))}
                      </div>
                    </div>
                  )} */}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </Container>
  );
};
