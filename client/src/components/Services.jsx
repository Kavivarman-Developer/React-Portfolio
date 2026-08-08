import { SERVICES } from "./portfolioData";

const Services = () => {
  return (
    <section id="services" className="section">
      <div className="section-inner">
        <div className="section-label reveal">Offerings</div>
        <h2 className="section-title reveal reveal-delay-1">What I Can Help With</h2>
        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <div className={`service-card reveal reveal-delay-${(index % 3) + 1}`} key={service.title}>
              <div className="service-icon">{service.icon}</div>
              <div className="service-title">{service.title}</div>
              <div className="service-desc">{service.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
