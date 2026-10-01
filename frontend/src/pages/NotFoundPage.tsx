import { Link } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { ArrowIcon } from "../components/ArrowIcon";
export function NotFoundPage() {
  return (
    <>
      <PageHero
        label="404 · Sidan saknas"
        title="Här blev det lite för kort."
        text="Sidan du letar efter finns inte. Vi hjälper dig tillbaka."
      />
      <div className="wrap section compact">
        <Link className="button" to="/">
          <span>Till startsidan</span> <ArrowIcon />
        </Link>{" "}
        <Link className="text-link" to="/tjanster">
          Se tjänster
        </Link>
      </div>
    </>
  );
}
