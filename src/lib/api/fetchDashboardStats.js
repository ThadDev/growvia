export const fetchDashboardData = async () => {
  try {
    const res = await fetch(
      `/api/users/dashboard-stats`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    let result;
    try {
      result = await res.json();
    } catch {
      throw new Error("Invalid server response");
    }

    if (!res.ok) {
      throw new Error(result?.message || "Failed to load dashboard");
    }

    const data = result?.data || {};

    return {
      fullName: data.fullName ?? "",
      depositBalance: Number(data.userDeposit) || 0,
      earnings: Number(data.availableProfit) || 0,
      withdrawals: Number(data.totalWithdrawalAmount) || 0,
      totalInvestments: Number(data.totalInvestmentAmount) || 0,
      referralCode: data.referralCode ?? "",
    };
  } catch (error) {
    console.error("Dashboard fetch error:", error.message);
    throw error;
  }
};
