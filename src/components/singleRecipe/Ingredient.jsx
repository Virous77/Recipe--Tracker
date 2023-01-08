import React from "react";

const Ingredient = ({ ing }) => {
  return (
    <section className="ingredientsMain">
      {ing?.map((item, idx) => (
        <div className="ingList" key={idx}>
          <span>
            {" "}
            {idx + 1 < 10 ? 0 : ""}
            {idx + 1})
          </span>
          <p>
            {item.quantity} {item.unit} {item.description}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Ingredient;
