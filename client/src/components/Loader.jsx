import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const finish = () => window.setTimeout(() => setIsLoading(false), 550);
    const fallback = window.setTimeout(() => setIsLoading(false), 1800);

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("load", finish);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="app-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.36, ease: "easeOut" }}
        >
          <motion.div
            className="loader-card"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
          >
            <div className="loader-topbar">
              <span />
              <span />
              <span />
              <div>portfolio.init</div>
            </div>

            <div className="loader-body">
              <div className="loader-mark">KV</div>
              <div>
                <div className="loader-title">Kavi Varman</div>
                <div className="loader-subtitle">Preparing developer portfolio</div>
              </div>
            </div>

            <div className="loader-code">
              <span className="code-blue">const</span> ready = <span className="code-teal">true</span>;
            </div>

            <div className="loader-progress" aria-hidden="true">
              <motion.div
                animate={{ x: ["-45%", "145%"] }}
                transition={{ duration: 1.05, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
