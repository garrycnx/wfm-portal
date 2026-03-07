import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WFM Forecasting Models Explained | WFM Clubs",
  description: "Understand WFM forecasting models — Weighted Moving Average, ARIMA, Holt-Winters, and ML approaches — with accuracy metrics MAPE and MAE explained.",
};

export default function ForecastingModelsPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <div className="bg-[#0b1c2d] text-white py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
            <Link href="/resources" className="hover:text-white transition-colors">Knowledge Base</Link>
            <span>/</span>
            <span className="text-[#00b4ff]">Forecasting Models</span>
          </div>
          <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full uppercase tracking-widest mb-5">Forecasting · 10 min read</span>
          <h1 className="text-4xl font-extrabold mb-4 leading-tight">WFM Forecasting Models Explained</h1>
          <p className="text-gray-300 text-base leading-relaxed">From basic averages to AI — the complete guide to choosing and evaluating forecasting methods for contact centres.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 prose-wfm">
        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
          <h2>Why Forecasting Models Matter</h2>
          <p>
            A 5% forecast error on 1,000 calls per day means 50 calls go unplanned. At an average AHT of 5 minutes, that is over 4 hours of unscheduled workload — roughly 2 FTE for the entire day.
          </p>
          <p>
            Forecasting accuracy is the single biggest driver of WFM efficiency. No amount of scheduling optimisation can compensate for a consistently inaccurate forecast.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
          <h2>Weighted Moving Average (WMA)</h2>
          <p>WMA is the most common baseline model used in contact centres. It averages historical data, with more recent periods given higher weight.</p>

          <div className="formula-block">
            {"WMA = Σ(Weight × Historical Value) ÷ Σ(Weights)\n\nExample: 3-week WMA with weights 3, 2, 1:\nWMA = (3 × Week3 + 2 × Week2 + 1 × Week1) ÷ (3+2+1)"}
          </div>

          <h3>When to use WMA</h3>
          <ul>
            <li>Short-range forecasting (1–4 weeks ahead)</li>
            <li>When recent data is more representative than older data</li>
            <li>Simple, transparent, and easy to explain to stakeholders</li>
          </ul>

          <h3>Limitations</h3>
          <ul>
            <li>Does not model trend or seasonality — must be applied to deseasonalised data</li>
            <li>Lags in detecting trend changes</li>
            <li>Weight selection is manual and somewhat arbitrary</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
          <h2>Simple Exponential Smoothing (SES) & Holt-Winters</h2>
          <p>
            Exponential smoothing assigns exponentially decreasing weights to older observations. Holt-Winters extends this to handle both <strong>trend</strong> and <strong>seasonality</strong>.
          </p>

          <div className="formula-block">
            {"Holt-Winters (triple exponential smoothing):\n\nLevel:   Lₜ = α(Yₜ / Sₜ₋ₘ) + (1−α)(Lₜ₋₁ + Tₜ₋₁)\nTrend:   Tₜ = β(Lₜ − Lₜ₋₁) + (1−β)Tₜ₋₁\nSeason:  Sₜ = γ(Yₜ / Lₜ) + (1−γ)Sₜ₋ₘ\n\nForecast: Ŷₜ₊ₕ = (Lₜ + h×Tₜ) × Sₜ₋ₘ₊ₕ\n\nα, β, γ = smoothing parameters (0 to 1)"}
          </div>

          <h3>When to use Holt-Winters</h3>
          <ul>
            <li>When data has a clear trend and seasonal pattern</li>
            <li>Medium-range forecasting (1–6 months)</li>
            <li>Built into most spreadsheet software (Excel, Google Sheets) and WFM tools</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
          <h2>ARIMA</h2>
          <p>
            ARIMA (AutoRegressive Integrated Moving Average) is a more sophisticated statistical model that combines autoregression, differencing, and moving average components. SARIMA extends it to handle seasonality.
          </p>
          <div className="formula-block">{"ARIMA(p, d, q) × SARIMA(P, D, Q)[m]\n\np = autoregressive order\nd = integration/differencing order\nq = moving average order\nm = seasonal period (e.g. 7 for weekly, 30 for monthly)"}
          </div>
          <h3>When to use ARIMA</h3>
          <ul>
            <li>When you have sufficient historical data (&gt;2 years recommended)</li>
            <li>Complex seasonality patterns</li>
            <li>Academic rigor required — ARIMA is statistically defensible</li>
            <li>Requires statistical software (Python statsmodels, R)</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
          <h2>Machine Learning Forecasting</h2>
          <p>
            ML models (XGBoost, Random Forest, LightGBM, LSTM neural networks) can capture non-linear patterns and incorporate many external variables. They tend to outperform statistical models on large, complex datasets.
          </p>

          <h3>Key advantages</h3>
          <ul>
            <li>Can incorporate external drivers: CRM data, marketing campaign flags, weather, product release dates</li>
            <li>Non-linear pattern detection</li>
            <li>Real-time reforecasting (update forecast as actuals come in during the day)</li>
          </ul>

          <h3>Key limitations</h3>
          <ul>
            <li>&quot;Black box&quot; — harder to explain to non-technical stakeholders</li>
            <li>Requires large, clean datasets and data engineering skills</li>
            <li>Risk of overfitting on historical anomalies</li>
            <li>Higher operational complexity to maintain</li>
          </ul>

          <div className="step-block">
            <strong>Practitioner advice:</strong> Start with a well-calibrated Holt-Winters model and MAPE benchmarking. Only move to ML when you have identified specific patterns the statistical model consistently misses and have the data engineering capacity to support it.
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-gray-100">
          <h2>Forecast Accuracy Metrics</h2>

          <h3>MAPE — Mean Absolute Percentage Error</h3>
          <div className="formula-block">
            {"MAPE = (1/n) × Σ |Actual − Forecast| / Actual × 100\n\nExample: Actual = 1,000, Forecast = 950\nError = |1,000 − 950| / 1,000 × 100 = 5%"}
          </div>
          <ul>
            <li>Best for communicating accuracy as a percentage</li>
            <li>Target: &lt;5% weekly, &lt;10% daily</li>
            <li>Limitation: undefined when Actual = 0; inflated for near-zero actuals</li>
          </ul>

          <h3>MAE — Mean Absolute Error</h3>
          <div className="formula-block">
            {"MAE = (1/n) × Σ |Actual − Forecast|\n\nExample: If you average 50 calls off per interval, MAE = 50"}
          </div>
          <ul>
            <li>Expressed in the same unit as the forecast (calls, emails, etc.)</li>
            <li>More intuitive for operational stakeholders: &quot;we are off by 50 calls on average&quot;</li>
            <li>Use when actual values can be zero or near-zero (MAPE breaks down)</li>
          </ul>

          <div className="overflow-x-auto mt-4">
            <table>
              <thead><tr><th>Horizon</th><th>MAPE Target (Good)</th><th>MAPE (Acceptable)</th></tr></thead>
              <tbody>
                <tr><td>Monthly</td><td>&lt; 3%</td><td>&lt; 7%</td></tr>
                <tr><td>Weekly</td><td>&lt; 5%</td><td>&lt; 10%</td></tr>
                <tr><td>Daily</td><td>&lt; 8%</td><td>&lt; 15%</td></tr>
                <tr><td>Interval (30-min)</td><td>&lt; 10%</td><td>&lt; 20%</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#0b1c2d] rounded-2xl p-8 text-white text-center">
          <p className="font-semibold mb-2">Continue Reading</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/resources/shrinkage-calculation" className="px-5 py-2 border border-white/30 text-white rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">← Shrinkage Guide</Link>
            <Link href="/resources/schedule-efficiency" className="px-5 py-2 bg-[#00b4ff] text-white rounded-lg text-sm font-semibold hover:bg-[#0095d8] transition-colors">Schedule Efficiency →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
