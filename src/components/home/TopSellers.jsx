import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TopSellers = () => {
const [sellers, setSellers] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setSellers(response.data);
    } catch (error) {
      console.error("Error fetching top sellers:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
          {loading ? (
            <div className="row">
          {new Array(4).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="skeleton__card"></div>
              </div>
            ))}
          </div>
          ) : sellers.length > 0 ? (
              {sellers.map((seller, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">{seller.authorName}</Link>
                    <span>{seller.price} ETH</span>
                  </div>
                </li>
              ))}
          ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
