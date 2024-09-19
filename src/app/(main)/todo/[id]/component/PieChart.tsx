import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/Chart";
import { Label, Pie, PieChart } from "recharts";
const config = {
  todo: {
    label: "Todo",
    color: "#006FEE",
  },
  done: {
    label: "Done",
    color: "#17C964",
  },
  "in-progress": {
    label: "In Progress",
    color: "#F5A524",
  },
  low: {
    label: "Low",
    color: "#F87171",
  },
  medium: {
    label: "Medium",
    color: "#FBBF24",
  },
  high: {
    label: "High",
    color: "#34D399",
  },
};
function TodoPieChart({
  data,
  label,
}: {
  data: { name: string; value: number; fill: string }[];
  label: string;
}) {
  const totals = data.reduce((acc, { value }) => acc + value, 0);
  return (
    <div className="w-full">
      <ChartContainer className="mx-auto w-full aspect-square" config={config}>
        <PieChart width={730} height={250}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            strokeWidth={5}
            cx="50%"
            cy="50%"
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
                        className="fill-default-foreground text-3xl font-bold"
                      >
                        {totals.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-content2-foreground"
                      >
                        subtasks
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
          <ChartTooltip
            content={
              <ChartTooltipContent hideLabel cursor={false} className="w-44" />
            }
          />
        </PieChart>
      </ChartContainer>
      <p className="text-sm text-center">{label}</p>
    </div>
  );
}

export default TodoPieChart;
