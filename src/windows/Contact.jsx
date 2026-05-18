import { WindowControls } from "#components/imports";
import { socials } from "#constants/constant";
import WindowWrapper from "#hoc/WindowWrapper";
import { AtSign, MapPin, Send } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    // Compose a mailto link so it works without a backend
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.open(`mailto:muftiarmaan160@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      {/* Header */}
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact</h2>
        <span />
      </div>

      <div className="contact-body">
        {/* Left panel — info + socials */}
        <aside className="contact-aside">
          <div className="contact-avatar">
            {/* The profile picture will map to public/images/profile.jpg */}
            <img src="/images/profile.jpg" alt="Armaan" />
          </div>

          <div className="contact-info">
            <h3>Mufti Armaan</h3>
            <p className="contact-role">Software Developer</p>

            <ul className="contact-meta">
              <li>
                <AtSign size={13} />
                <span>muftiarmaan160@gmail.com</span>
              </li>
              <li>
                <MapPin size={13} />
                <span>India 🇮🇳</span>
              </li>
            </ul>
          </div>

          <div className="contact-socials">
            <p className="contact-socials-label">Socials</p>
            <ul>
              {socials.map(({ id, text, icon, bg, link }) => (
                <li key={id}>
                  <a
                    href={link.startsWith("http") ? link : `https://${link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-card"
                    style={{ "--card-bg": bg }}
                  >
                    <span className="contact-social-icon">
                      <img src={icon} alt={text} />
                    </span>
                    <span className="contact-social-text">{text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Right panel — message form */}
        <div className="contact-form-panel">
          <div className="contact-form-header">
            <Send size={16} className="text-blue-500" />
            <h4>Send a message</h4>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="What's on your mind?"
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className={`contact-submit ${sent ? "sent" : ""}`}
            >
              {sent ? "✓ Sent!" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;
