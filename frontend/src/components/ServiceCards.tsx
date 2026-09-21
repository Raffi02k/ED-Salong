import { Link } from "react-router-dom";
import { services } from "../content/services";
export function ServiceCards({ limit = services.length }: { limit?: number }) {
  return (
    <div className="service-grid">
      {services.slice(0, limit).map((s, i) => (
        <Link className="service-card" to={"/tjanster/" + s.slug} key={s.slug}>
          <div className="service-photo">
            <img
              src={"/images/" + s.image}
              alt={
                "Inspirationsbild för " + s.title + " från Buffalo-materialet"
              }
              loading="lazy"
            />
            <span className="photo-number">0{i + 1}</span>
          </div>
          <div className="service-card-title">
            <h3>{s.title}</h3>
            <span>↗</span>
          </div>
          <div className="service-card-meta">
            <span>
              {s.duration} · {s.confirmed ? "cirka" : "demopris"}
            </span>
            <strong>{s.price} kr</strong>
          </div>
        </Link>
      ))}
    </div>
  );
}
