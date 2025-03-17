/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

const chartConfig = {
  colleges: {
    label: "Colleges",
  },
} satisfies ChartConfig;

export function ChartByState({
  data,
}: {
  data: {
    stateAbbr: string;
    referenceCount: number;
  }[];
}) {
  const chartData = data.map(({ stateAbbr, referenceCount }, index) => ({
    state: stateAbbr,
    count: referenceCount,
    fill: `hsl(var(--chart-${(index % 5) + 1}))`,
  }));

  const totalColleges = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  return (
    <Card className="flex max-w-3xl flex-col bg-muted">
      <CardHeader className="items-center pb-0">
        <CardTitle>Colleges by State</CardTitle>
        <CardDescription>
          Colleges that have emailed me since March, 2025
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="state"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalColleges.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Colleges
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}