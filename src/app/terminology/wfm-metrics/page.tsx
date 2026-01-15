export default function WFMMetricsPage() {
  const metrics = [
    {
      name: "Service Level",
      definition:
        "The percentage of customer calls answered within a predefined time threshold, commonly expressed as X% of calls answered within Y seconds.",
      example:
        "If 1,000 calls are offered and 850 are answered within 20 seconds, the service level is 85%. This shows how quickly customers are served."
    },
    {
      name: "Occupancy",
      definition:
        "The proportion of an agent’s logged-in time spent actively handling customer interactions including talk time, hold time, and after-call work.",
      example:
        "An agent logged in for 8 hours and spent 6 hours handling calls has an occupancy of 75%. Very high occupancy may cause burnout."
    },
    {
      name: "Utilization",
      definition:
        "Measures how effectively paid agent time is used, including both productive and available time.",
      example:
        "If an agent is paid for 9 hours and spends 7.5 hours working or available, utilization is 83%. Low utilization may indicate overstaffing."
    },
    {
      name: "Shrinkage",
      definition:
        "The percentage of scheduled agent time that is not available for handling customer contacts due to breaks, training, meetings, leaves, or system issues.",
      example:
        "If agents are scheduled for 100 hours but only 75 hours are available, shrinkage is 25%. Shrinkage must be added while calculating headcount."
    },
    {
      name: "Attrition Percentage",
      definition:
        "The percentage of employees who leave the organization or transfer internally during a given period.",
      example:
        "If 10 agents leave during a month and the average headcount is 200, attrition is 5%. High attrition increases hiring and training costs."
    },
    {
      name: "ASA (Average Speed of Answer)",
      definition:
        "The average time customers wait in queue before their call is answered by an agent.",
      example:
        "If customers wait a total of 5,000 seconds for 250 answered calls, ASA is 20 seconds. Higher ASA often leads to dissatisfaction."
    },
    {
      name: "Total Wait Time",
      definition:
        "The cumulative time spent by all callers waiting in the queue before their calls are answered.",
      example:
        "If 100 callers wait an average of 30 seconds, total wait time is 3,000 seconds. This helps assess customer experience."
    },
    {
      name: "Abandon Rate",
      definition:
        "The percentage of callers who disconnect before their call is answered.",
      example:
        "If 80 out of 1,000 callers hang up before answer, abandon rate is 8%. High abandon rate indicates understaffing."
    },
    {
      name: "Offered to Handled %",
      definition:
        "The percentage of offered calls that are successfully handled by agents.",
      example:
        "If 900 out of 1,000 calls are handled, offered-to-handled is 90%. This shows handling efficiency."
    },
    {
      name: "Volume % / OTF %",
      definition:
        "The ratio of actual call volume to forecasted call volume (Offered to Forecast).",
      example:
        "If forecasted calls were 10,000 but actual calls were 11,000, OTF is 110%, indicating higher-than-expected demand."
    },
    {
      name: "Handled to Forecast %",
      definition:
        "The percentage of calls actually handled compared to the forecasted call volume.",
      example:
        "If forecasted calls are 10,000 and handled calls are 9,200, handled-to-forecast is 92%."
    },
    {
      name: "AHT (Average Handle Time)",
      definition:
        "The average time an agent spends handling a customer interaction, including talk time, hold time, and after-call work.",
      example:
        "If agents spend 15,000 minutes handling 1,000 calls, AHT is 15 minutes. AHT strongly impacts staffing needs."
    },
    {
      name: "Loaded AHT",
      definition:
        "Average Handle Time adjusted to include outbound work in addition to inbound interactions.",
      example:
        "If outbound calls add extra handling time, loaded AHT gives a more accurate picture of workload."
    },
    {
      name: "Chat Concurrency",
      definition:
        "The average number of chat sessions handled simultaneously by an agent.",
      example:
        "If an agent manages 2 chats at the same time, chat concurrency is 2. Higher concurrency improves productivity but may impact quality."
    },
    {
      name: "Line Adherence",
      definition:
        "The extent to which agents meet required staffing levels at specific time intervals.",
      example:
        "If agents meet staffing requirements in 48 out of 60 intervals, line adherence is 80%."
    },
    {
      name: "Schedule Adherence",
      definition:
        "Measures how closely agents follow their assigned work schedules.",
      example:
        "If an agent follows schedule for 7.5 out of 8 hours, adherence is 93.75%."
    },
    {
      name: "Schedule Conformance",
      definition:
        "Compares actual login or working time against scheduled time.",
      example:
        "If an agent works 460 minutes against a scheduled 480 minutes, conformance is 95.8%."
    },
    {
      name: "Schedule Attainment",
      definition:
        "The percentage of agents who log in during a scheduled interval.",
      example:
        "If 45 out of 50 scheduled agents log in, schedule attainment is 90%."
    },
    {
      name: "Staff Time",
      definition:
        "Total time an agent is logged in, including handled, available, and auxiliary time.",
      example:
        "An agent logged in for 8 hours has 8 hours of staff time."
    },
    {
      name: "Production Time",
      definition:
        "Time spent by agents on productive activities including handling and being available.",
      example:
        "If an agent is productive for 6.5 hours out of 8, production time is 6.5 hours."
    },
    {
      name: "Productive Time",
      definition:
        "Time spent actively handling customer interactions.",
      example:
        "If an agent talks to customers for 5 hours, productive time is 5 hours."
    },
    {
      name: "Workload",
      definition:
        "The total amount of work expected to be handled in a period, calculated using forecasted volume and AHT.",
      example:
        "If forecasted calls are 5,000 and AHT is 6 minutes, workload is 30,000 minutes."
    },
    {
      name: "Net Headcount (100% Occupancy)",
      definition:
        "Minimum number of agents required assuming full occupancy.",
      example:
        "If workload is 1,000 hours and each agent provides 8 hours, net headcount is 125 agents."
    },
    {
      name: "Net Headcount (Customized Occupancy)",
      definition:
        "Required agents considering a realistic occupancy level.",
      example:
        "At 80% occupancy, more agents are needed compared to 100% occupancy."
    },
    {
      name: "Gross Headcount",
      definition:
        "Total agents required after accounting for shrinkage and attrition.",
      example:
        "If net headcount is 100 and shrinkage is 25%, gross headcount becomes ~133."
    },
    {
      name: "Model Occupancy",
      definition:
        "Projected occupancy based on forecasted workload and schedules.",
      example:
        "Used in Erlang models to validate staffing efficiency."
    },
    {
      name: "Scheduled Inflexibility",
      definition:
        "Measures overstaffing caused by rigid scheduling constraints.",
      example:
        "Fixed shifts may cause excess staff during low volume periods."
    },
    {
      name: "Scheduled Efficiency",
      definition:
        "Indicates how well schedules match workload while minimizing waste.",
      example:
        "Higher efficiency means better alignment between demand and staffing."
    },
    {
      name: "Forecast Accuracy",
      definition:
        "Measures how close the forecasted volume is to actual volume.",
      example:
        "If forecast was 10,000 calls and actual was 9,500, accuracy is 95%."
    },
    {
      name: "Training Throughput",
      definition:
        "Measures effectiveness of training by comparing certified vs started trainees.",
      example:
        "If 80 out of 100 trainees get certified, throughput is 80%."
    },
    {
      name: "EPH (Emails Per Hour)",
      definition:
        "The number of emails handled by an agent per hour.",
      example:
        "If an agent handles 40 emails in 4 hours, EPH is 10."
    },
    {
      name: "FTE (Full Time Equivalent)",
      definition:
        "Represents the number of full-time agents required based on workload.",
      example:
        "If workload equals 80 productive hours per day, FTE requirement is 10 agents."
    }
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "40px", background: "#f4f6f8" }}>
      <h1 style={{ textAlign: "center" }}>
        WFM Metrics & Terminology
        </h1>
      

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px"
        }}
      >
        {metrics.map((m, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
            }}
          >
            <h2>{m.name}</h2>
            <p><strong>Definition:</strong> {m.definition}</p>
            <p><strong>Example:</strong> {m.example}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
