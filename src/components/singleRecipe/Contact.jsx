import React from "react";

const Contact = ({ source, publisher }) => {
  return (
    <section className="contact">
      <p>
        This food info is related to
        <span> {publisher}. </span>
        They are best in business & always provide accurate info to make good
        food at home.
      </p>

      <a href={source} target="_blank">
        Visit for more Info
      </a>
    </section>
  );
};

export default Contact;
