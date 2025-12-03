import { motion } from "framer-motion";
import { site } from "../data/site";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full border-t border-[var(--border-color)]"
    >
      <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-[var(--text-secondary)]">
          © {year}{" "}
          <span className="font-semibold text-[var(--text-primary)]">{site.name}</span>
          . All rights reserved.
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-[var(--text-secondary)]">
          <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-[var(--accent-color)]">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-[var(--accent-color)]">
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-[var(--accent-color)]">
            Email
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
