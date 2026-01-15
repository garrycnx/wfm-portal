export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="footer-credit">
      © {year}{" "}
      <span className="footer-name">Developed by {" "} Gurpreet Singh</span>{" "}
      | 
      <a
        href="https://www.linkedin.com/in/gurpreetgarry/"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>{" "}
      ·{" "}
      <a
        href="https://github.com/garrycnx"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </div>
  );
}
