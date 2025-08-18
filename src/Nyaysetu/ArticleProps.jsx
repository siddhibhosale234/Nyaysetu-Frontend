import { Articles1 } from "./Articles";
import './ArticleProps.css';

export function ArticleProps() {
  const Articles = [
    {
      Title: "Supreme Court: Only Blood Relatives Can Be Considered For Compassionate Appointment",
      Date: "July 10, 2024",
      Tag: "Judgment",
      ReadMore: "https://advocatesjournal.com/2025/02/16/supreme-court-summarizes-key-principles-on-compassionate-appointments/"
    },
    {
      Title: "Centre Notifies Rules For Mediation Act, 2023",
      Date: "June 28, 2024",
      Tag: "Legal Update",
      ReadMore: "https://www.barandbench.com/view-point/mediation-act-2023-latest-amendments-guide"
    },
    {
      Title: "Artificial Intelligence in Courts: Boon or Threat?",
      Date: "July 5, 2024",
      Tag: "Legal Tech / Opinion",
      ReadMore: "https://www.barandbench.com/columns/litigation-columns/ai-powered-indian-judiciary-a-step-forward-cause-concern"
    },
    {
      Title: "How to Manage Stress as a Young Lawyer",
      Date: "May 15, 2024",
      Tag: "Career Tip / Wellness",
      ReadMore: "https://lawbhoomi.com/how-to-deal-with-stress-and-burnout-as-a-lawyer/"
    },
    {
      Title: "Supreme Court Decriminalizes Adultery",
      Date: "September 27, 2018",
      Tag: "Landmark Judgment / Constitutional Law",
      ReadMore: "https://www.legalserviceindia.com/legal/article-12142-landmark-judgment-analyzing-joseph-shine-v-s-union-of-india-case-a-significant-decision-that-decriminalizes-adultery-in-india.html#google_vignette"
    }
  ];

  return (
    <div className="articles-section">
      <h2 className="articles-heading">Some Legal Readings Curated For You</h2>
      <div className="articles-container">
        {Articles.map((val, index) => (
          <Articles1 key={index} p={val} />
        ))}
      </div>
    </div>
  );
}
