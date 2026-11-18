
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );

        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
    nav: true,
    dots: true,
    margin: 20,
    loop: true,
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="row">
            {new Array(4).fill(0).map((_, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={index}
              >
                <div className="skeleton__card"></div>
              </div>
            ))}
          </div>
        ) : collections.length > 0 ? (
          <OwlCarousel className="owl-theme" {...options}>
            {collections.map((collection, index) => (
              <div key={collection.id || index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${collection.nftId}`}>
                      <img
                        src={collection.nftImage}
                        className="lazy img-fluid"
                        alt={collection.title || "NFT collection"}
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${collection.authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={collection.authorImage}
                        alt={collection.authorName || "Collection author"}
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{collection.title}</h4>
                    </Link>
                    <span>ERC-{collection.code}</span>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
        ) : (
          <div className="text-center">
            <p>No collections available.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HotCollections;