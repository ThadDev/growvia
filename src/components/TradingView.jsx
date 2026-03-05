// components/TradingViewWidget.jsx
"use client";

export default function TradingViewWidget() {
  return (
    <div
      className="tradingview-widget-container"
      style={{ width: "100%", height: "27em" }}
    >
   
      <div className="w-full h-[450px] bg-card rounded-xl overflow-hidden">
  <iframe
    src="https://www.tradingview-widget.com/embed-widget/technical-analysis/?locale=en#%7B%22interval%22%3A%2215m%22%2C%22isTransparent%22%3Atrue%2C%22symbol%22%3A%22BINANCE:BTCUSDT%22%2C%22showIntervalTabs%22%3Atrue%2C%22colorTheme%22%3A%22dark%22%7D"
    className="w-full h-full"
    style={{
      border: "none",
      width:"100%",
      backgroundColor: "transparent", // 🔥 important
    }}
    // allowTransparency
    scrolling="no"
    title="TradingView Technical Analysis"
  />
</div>

    </div>
  );
}
// "use client";

// export default function TradingViewWidget({ theme }) {
//   const src = `https://www.tradingview-widget.com/embed-widget/technical-analysis/?locale=en#%7B%22interval%22%3A%2215m%22%2C%22isTransparent%22%3Atrue%2C%22symbol%22%3A%22BINANCE:BTCUSDT%22%2C%22showIntervalTabs%22%3Atrue%2C%22colorTheme%22%3A%22${theme}%22%7D`;

//   return (
//     <div
//       className={`w-full h-[450px] rounded-xl overflow-hidden ${
//         theme === "dark" ? "bg-grey" : "bg-white"
//       }`}
//     >
//       <iframe
//         key={theme} // 🔥 forces reload when theme changes
//         src={src}
//         className="w-full h-full transition-opacity duration-300"
//         style={{
//           border: "none",
//           backgroundColor: "transparent",
//         }}
//         allowTransparency
//         scrolling="no"
//         title="TradingView Technical Analysis"
//       />
//     </div>
//   );
// }
