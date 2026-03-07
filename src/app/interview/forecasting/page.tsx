const qas = [
  {
    q: "What is WFM forecasting and why is it important?",
    a: "WFM forecasting is the process of predicting future contact volume (calls, chats, emails) by interval, day, week, and month. An accurate forecast is the foundation of all WFM planning — it drives staffing requirements, scheduling, capacity planning, and intraday management. An overforecast leads to overstaffing and excess cost; an underforecast leads to understaffing and SL failures. The goal is to minimize forecast error while accounting for seasonality, trends, and special events.",
  },
  {
    q: "What is the difference between statistical and ML-based forecasting?",
    a: "Statistical forecasting uses mathematical models (WMA, ARIMA, Holt-Winters) that rely on historical patterns, trends, and seasonality. These models are transparent, interpretable, and work well with limited data. ML-based forecasting (Random Forest, XGBoost, Neural Networks) learns complex non-linear patterns and can incorporate many external variables (weather, marketing campaigns, CRM data). ML models tend to outperform statistical methods on large, complex datasets but require more data engineering and are harder to explain to stakeholders.",
  },
  {
    q: "What is Weighted Moving Average (WMA) and how do you use it?",
    a: "WMA is a statistical method that calculates a forecast by taking a weighted average of recent historical data points, giving more weight to recent observations. Formula: WMA = Σ(Weight × Historical Value) / Σ(Weights). Example: 3-week WMA with weights 3, 2, 1 (most recent = 3): WMA = (3 × Week3 + 2 × Week2 + 1 × Week1) / 6. WMA is useful for contact centre forecasting because recent volume is often more predictive than older data. Adjusting weights allows you to control sensitivity to recent spikes.",
  },
  {
    q: "What is MAPE and how do you interpret it?",
    a: "MAPE (Mean Absolute Percentage Error) measures forecast accuracy as a percentage. Formula: MAPE = (1/n) × Σ |Actual − Forecast| / Actual × 100. Example: If actual volume is 1,000 and forecast is 950, the error for that period is 5%. MAPE is averaged across all periods. A MAPE of 5% is considered good for weekly contact centre forecasting; below 10% is acceptable. Higher MAPE indicates the forecast is less reliable and may require model adjustment or additional data inputs.",
  },
  {
    q: "What is MAE (Mean Absolute Error) and when would you use it over MAPE?",
    a: "MAE measures average absolute error in the same unit as the forecast (e.g., calls). Formula: MAE = (1/n) × Σ |Actual − Forecast|. Use MAE when actual values can be zero or near-zero (MAPE is undefined or inflated when the denominator is close to zero). MAE is also easier to communicate to non-technical stakeholders — 'our forecast was off by an average of 50 calls per interval' is more intuitive than a percentage.",
  },
  {
    q: "How do you handle seasonality in your forecasts?",
    a: "Seasonality is modeled by identifying recurring patterns at multiple levels: intraday (hourly/half-hourly patterns), intraweek (day-of-week patterns), and intra-year (monthly/seasonal patterns). Techniques include: (1) Seasonal decomposition — split the time series into trend, seasonality, and residual components. (2) Seasonal indices — calculate the ratio of each period's average to the overall average and apply as multipliers. (3) Holt-Winters exponential smoothing — a model with built-in additive or multiplicative seasonality. Special seasonal events (Christmas, Ramadan, Black Friday) are typically modeled with event flags or manual overrides.",
  },
  {
    q: "How do you handle volume outliers in historical data?",
    a: "Outliers in historical data (caused by system outages, marketing campaigns, one-off events) can distort the forecast if not handled. Approaches: (1) Identify outliers using statistical methods (Z-score, IQR). (2) Investigate the root cause — was it a genuine business event or a data error? (3) For genuine events that will recur (e.g., annual promotion), model them as events. (4) For non-recurring anomalies, replace the outlier with the average of surrounding similar periods. (5) Document all adjustments for audit purposes.",
  },
  {
    q: "What is a long-range vs. short-range forecast and how do they differ in accuracy?",
    a: "Short-range forecasts (1–4 weeks) have higher accuracy because the input data is more recent and business conditions are more stable. These are used for final scheduling. Long-range forecasts (3–12+ months) have lower accuracy but are essential for capacity planning and budgeting. They rely on growth assumptions, trend extrapolation, and strategic inputs from the business. Long-range forecasts should be presented with confidence intervals, not point estimates, to communicate uncertainty.",
  },
  {
    q: "How do you incorporate business events into a forecast?",
    a: "Business events (product launches, marketing campaigns, price changes, system outages, regulatory deadlines) are incorporated through event modeling. Steps: (1) Identify all known events in the forecast horizon. (2) For recurring events, calculate the historical volume uplift or suppression (e.g., a promo that increases volume by 20%). (3) Apply the event factor to the baseline forecast in the relevant period. (4) Align with marketing and ops stakeholders to capture unknown upcoming events. (5) Review and adjust after the event for future calibration.",
  },
  {
    q: "What is the difference between a top-down and bottom-up forecast?",
    a: "A top-down forecast starts at the macro level (annual or monthly total volume) and disaggregates it into daily and interval-level forecasts using historical patterns. A bottom-up forecast builds from granular interval-level data upward to the total. Top-down is faster and better for long-range planning; bottom-up is more accurate for short-range scheduling. Most mature WFM teams use bottom-up short-range forecasts validated against top-down strategic forecasts.",
  },
  {
    q: "How do you present forecast accuracy to stakeholders?",
    a: "Present forecast accuracy in terms the business understands: (1) Show MAPE for the relevant time horizon (daily, weekly). (2) Translate error to operational impact — e.g., 'A 10% underforecast on a 1,000 call day means 100 more calls than planned, which would require 5 additional agents to maintain SL.' (3) Show trend — is accuracy improving or deteriorating? (4) Highlight outlier events that caused spikes in error. (5) Recommend model improvements or data enrichment if accuracy is consistently below target.",
  },
  {
    q: "What is the role of AI/ML in modern contact centre forecasting?",
    a: "AI/ML models can capture complex patterns that traditional statistical models miss: non-linear seasonality, interaction effects between variables, and real-time adaptation. Common use cases: (1) Incorporating external data (CRM data, social media sentiment, weather) as features. (2) Anomaly detection — flagging unusual volume patterns before they impact SL. (3) Real-time intraday reforecasting — updating the remainder-of-day forecast based on actual call arrival patterns. However, AI models require large, clean datasets and skilled data scientists, and their 'black box' nature can be a challenge in regulated environments.",
  },
];

export default function ForecastingInterview() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#00b4ff]/10 text-[#00b4ff] text-sm font-semibold rounded-full mb-4">
            Interview Preparation
          </span>
          <h1 className="text-4xl font-bold text-[#0b1c2d] mb-3">Forecasting Interview Preparation</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Common WFM Forecasting interview questions with detailed, expert answers.
          </p>
        </div>

        <div className="space-y-5">
          {qas.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <p className="font-bold text-[#0b1c2d] mb-3 text-base">
                <span className="text-[#00b4ff] mr-2">Q{i + 1}.</span>
                {item.q}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed border-l-4 border-[#00b4ff]/30 pl-4">
                {item.a}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#0b1c2d] rounded-2xl p-8 text-white text-center">
          <p className="font-semibold mb-2">Explore more interview guides</p>
          <p className="text-gray-400 text-sm mb-4">Continue your WFM interview preparation.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/interview/capacity" className="px-5 py-2 border border-white/30 text-white rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">
              ← Capacity Planning
            </a>
            <a href="/interview/rta" className="px-5 py-2 bg-[#00b4ff] text-white rounded-lg text-sm font-semibold hover:bg-[#0095d8] transition-colors">
              RTA Interview
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
