function Footer() {
  return (
    <div className="footer-wrapper flex-grow-1 d-flex">
      <ul className="footer col d-flex flex-column flex-md-row justify-content-between">
        <li>
          <a
            href="https://www.thefinalswindle.com/"
            className="link-info"
            target="_blank"
            rel="noreferrer"
          >
            The Final Swindle
          </a>
          <span className="text-black-50 ps-1 pe-1">&times;</span>
          <a
            href="https://sloppylabwork.com/"
            className="link-info"
            target="_blank"
            rel="noreferrer"
          >
            Sloppy Labwork
          </a>
        </li>
        <li>
          <a
            href="https://www.thefinalswindle.com/p/formats.html"
            className="link-info"
            target="_blank"
            rel="noreferrer"
          >
            About Tetrad and Other Swindle Formats
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Footer
