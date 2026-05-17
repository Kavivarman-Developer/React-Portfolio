import { TESTIMONIALS } from "./portfolioData";

const Testimonials = () => {
  return (
    <section className="section" style={{ background: "rgba(255,255,255,0.01)" }}>
      <div className="section-inner">
        <div className="section-label reveal">Social Proof</div>
        <h2 className="section-title reveal reveal-delay-1">What Clients <span className="gradient-text">Say</span></h2>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((item, index) => (
            <div className={`testi-card reveal reveal-delay-${index + 1}`} key={item.name}>
              <div className="testi-quote">"</div>
              <div className="testi-text">{item.quote}</div>
              <div className="testi-author">
                <div className="testi-avatar">{item.initials}</div>
                <div>
                  <div className="testi-name">{item.name}</div>
                  <div className="testi-role">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
