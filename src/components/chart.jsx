// // components/SalesChart.js
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const data = [
//   { month: "Jan", sales: 400 },
//   { month: "Feb", sales: 300 },
//   { month: "Mar", sales: 500 },
//   { month: "Apr", sales: 700 },
// ];

// export default function SalesChart() {
//   return (
//     <div className="w-full h-64 p-4 bg-white rounded-lg shadow-md">
//       <h2 className="text-lg font-bold mb-2">Monthly Sales</h2>
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Line type="monotone" dataKey="sales" stroke="#4ade80" strokeWidth={3} />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
// components/BalanceCard.js
// import { LineChart, Line, ResponsiveContainer } from "recharts";

// export default function BalanceCard({ title, amount, data, lineColor }) {
//   return (
//     <div className="bg-white px-4 py-2 rounded-xl shadow-md flex flex-col justify-between">
//       {/* Balance info */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h3 className="text-sm text-gray-500">{title}</h3>
//           <p className="text-xl font-bold">${amount}</p>
//         </div>
//       </div>

//       {/* Mini line chart */}
//       <div className="mt-4 w-full h-16">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <Line
//               type="monotone"
//               dataKey="value"
//               stroke={lineColor} // Your custom color
//               strokeWidth={2}
//               dot={false} // remove dots if you want clean lines
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

// components/SparklineChart.js
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function SparklineChart({ data, lineColor = "#4ade80", height = 50 }) {
  return (
    <div className={`w-full`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={lineColor}
            strokeWidth={2}
            dot={false}          // remove dots
            isAnimationActive={true} // optional animation
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
