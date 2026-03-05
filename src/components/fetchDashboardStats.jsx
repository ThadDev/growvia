// export const fetchDashboardStats = async () => {
//   try {
//     const res = await fetch("<< YOUR DASHBOARD API URL HERE >>", {
//       method: "GET",
//       credentials: "include", // ✅ cookie-based auth
//       headers: {
//         "Content-Type": "application/json",
//       },
//       cache: "no-store", // dashboards should never be cached
//     });

//     let result;

//     try {
//       result = await res.json();
//     } catch {
//       throw new Error("Invalid server response");
//     }

//     if (!res.ok) {
//       throw new Error(
//         result?.message || "Failed to fetch dashboard data"
//       );
//     }

//     return {
//       fullName: result?.data?.fullName ?? "",
//       depositBalance: result?.data?.depositBalance ?? 0,
//       totalWithdrawal: result?.data?.totalWithdrawal ?? 0,
//       totalInvestments: result?.data?.totalInvestments ?? 0,
//       referralCode: result?.data?.referralCode ?? "",
//     };
//   } catch (error) {
//     console.error("Dashboard fetch error:", error.message);
//     throw error;
//   }
// };
