import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../UI/Countdown";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(8);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
        );
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching new items:", error);
      }
    };

    fetchData();
  }, []);

  const loadMoreItems = () => {
    setDisplayedItems(displayedItems + 4);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const sortedItems = [...items];
  if (filter === "low-to-high") {
    sortedItems.sort((a, b) => a.price - b.price);
  } else if (filter === "high-to-low") {
    sortedItems.sort((a, b) => b.price - a.price);
  } else if (filter === "likes-high-to-low") {
    sortedItems.sort((a, b) => b.likes - a.likes);
  }

  return (
    <>
      <div>
        <select value={filter} onChange={handleFilterChange} id="filter-items">
          <option value="">Default</option>
          <option value="low-to-high">Price, Low to High</option>
          <option value="high-to-low">Price, High to Low</option>
          <option value="likes-high-to-low">Most liked</option>
        </select>
      </div>

      {loading ? (
        <div className="row">
          {new Array(8).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="skeleton__card"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="row">
          {sortedItems.slice(0, displayedItems).map((item, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {item.expiryDate && <Countdown expiryDate={item.expiryDate} />}
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to="/item-details">
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {displayedItems < items.length && (
            <div className="col-md-12 text-center">
              <button
                onClick={loadMoreItems}
                id="loadmore"
                className="btn-main lead"
              >
                Load more
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ExploreItems;
