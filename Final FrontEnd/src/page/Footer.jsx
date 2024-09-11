//src/page/Footer.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";

import GroundCard2 from "../GroundComponent/GroundCard2 ";

const Footer = () => {
  const [grounds, setGrounds] = useState([]);

  useEffect(() => {
    const retrieveAllGrounds = async () => {
      const response = await axios.get("http://localhost:8080/api/ground/fetch");
      setGrounds(response.data.grounds);
    };
    retrieveAllGrounds();
  }, []);

  return (
    <div className="footer mt-4">
      <h2>Available Turfs:</h2>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {grounds.map((ground) => (
          <GroundCard2 key={ground.id} item={ground} />
        ))}
      </div>
    </div>
  );
};


export default Footer;