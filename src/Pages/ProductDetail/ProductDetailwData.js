import React from "react";
import { connect } from "react-redux";
import { addProduct, openModal } from '../../Redux/Actions';
import ImageModal from "../../Components/ImageModal/ImageModal";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import Nav from "../../Components/Nav/Nav";
import ProductBottomBar from "../../Components/ProductBottomBar/ProductBottomBar";
import Footer from "../../Components/Footer/Footer";
import { API_URL, MOCK_URL } from "../../config";
import "./ProductDetail.scss";
import Arrowdown from "../../Images/arrow-down.png";
import Heart from "../../Images/heart1.png";
import Heart2 from "../../Images/red-heart.png";

class ProductDetailwData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailData: {},
      heartClick: false,
      showList: false,
      option: "",
      click: false,
      showImage: false,
      isModalOpen: false,
      isLoading: false,
      prevScrollpos: window.pageYOffset,
      isVisible: false,
      openWishlist: false,
      id : null
    };
  }

  componentDidMount() {
    const { id, colorId } = this.props.match.params;
    this.setState({ isLoading: true });
    setTimeout(() => {
      // fetch(`${API_URL}/product/${id}/color/${colorId}`)
      fetch(`${MOCK_URL}/detailDatadata.json`)
        .then((res) => res.json())
        .then((res) =>
          this.setState({
            detailData: { ...res.product_data, quantity: 1 },
            isLoading: false,
            id,
          })
        );
    }, 1000);

    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    this.setState({
      isVisible: window.pageYOffset > 500 ? true : false,
    });
  };


  addBtnClick = () => {
    const { product_images, product_name, product_size, product_color, quantity, product_price } = this.state.detailData;
    const { option } = this.state; 
    
    if (this.state.option !== "") {
      this.props.addProduct({
          productImage: product_images[0],
          name: product_name,
          size: product_size,
          selectedOption: option,
          color: product_color,
          quantity: quantity,
          price: product_price,
      })
      this.props.openModal();
    } else {
      this.setState({
        click: !this.state.click,
      });
    }
  };

  heartClickHandler = () => {
    const { heartClick } = this.state;

    fetch(`${API_URL}/order/like-product`,{
      method : "POST",
      headers:{
        "Authorization": localStorage.getItem("access_token")
      },
      body: JSON.stringify({
        product_id: this.state.id
      })
    })

    this.setState({
      openWishlist: true,               
      heartClick: !heartClick,
    });
  };

  closeWishlist = () => {
    this.setState({
      openWishlist: false,
    });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
    window.scrollTo(0, 0);
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const {
      openModal,
      closeModal,
      heartClickHandler,
    } = this;

    const {
      detailData,
      option,
      click,
      isModalOpen,
      isLoading,
      isVisible,
      heartClick,
    } = this.state;

    const imgsArray =
      detailData.product_images &&
      detailData.product_images.filter((obj, index) => {
        return index !== 0;
      });

    return (
     <>
        <ImageModal
          isOpen={isModalOpen}
          close={closeModal}
          images={detailData.product_images}
        />

  
      <Nav/>     
        {isLoading ? (
          <LoadingPage />
        ) : (
          <>
            <main className="ProductDetail">
              <header>
                <button>Man</button>
                <span>{`>`}</span>
                <button>Clothing</button>
                <span>{`>`}</span>
                <button>{detailData.sub_sub_category}</button>
              </header>
              <div className="product-main-photo-and-info">
                <section className="size">
                  <img
                    className="product-photo"
                    alt="product-img"
                    src={
                      detailData.product_images && detailData.product_images[0]
                    }
                  />
                  <img
                  alt="heart-button"
                    className="heart-button"
                    src={heartClick ? Heart2 : Heart}
                    onClick={heartClickHandler}
                  />
                </section>
                <section className="product-info-wrapper size">
                  <div className="product-info">
                    <h1>{detailData.product_name}</h1>
                    <div className="price-detail">
                      <span>
                        ₩ {}
                        {detailData.product_price &&
                          detailData.product_price.toLocaleString()}
                      </span>
                      <span className="import-incl">
                        (Import Duties Included)
                      </span>
                    </div>
                    <p>clothing standard</p>
                    <div className="select-a-size">
                      <span>Size</span>
                      <div
                        onClick={()=>{this.setState({ click: !click })}}
                        className="size-dropdown-bar"
                      >
                        <div className="drop-down">
                          <div className="click-to-select">
                            <span>
                              {option !== "" ? option : "Select a size"}
                            </span>
                            <img
                              className={click ? "clicked" : "x-clicked"}
                              alt="arrow-icon"
                              src={Arrowdown}
                            />
                          </div>

                          <ul className={`size-list ${click ? "show" : ""}`}>
                            {detailData.product_size &&
                              detailData.product_size.map((opt, i) => {
                                return (
                                  <li key = {i}
                                    onClick={() => this.setState({ option : opt })}
                                    name={opt}
                                  >
                                    {opt}
                                  </li>
                                );
                              })}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="color-in-comment-box"></div>
                    <div className="colors-options">
                      <span>Colors</span>
                      <div className="colors">
                        {detailData.button_images &&
                          detailData.button_images.map((obj, i) => {
                            return (
                              <div className="colors-wrapper" key = {i}>
                                <span>COLOR</span>
                                <img
                                  alt="color-options"
                                  className="circled-color"
                                  src={obj}
                                />
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <button className="add-to-cart" onClick={this.addBtnClick}>
                      Add to cart
                    </button>
                  </div>
                  <div className="product-detail-buttons">
                    <button>Description</button>
                    <button>Size Guide</button>
                    <button>Shipping</button>
                  </div>
                </section>

                {imgsArray &&
                  imgsArray.map((imgobj, i) => {
                    return (
                      <section className="size" key = {i}>
                        <img
                          onClick={openModal}
                          alt="product-img"
                          className="product-photo"
                          src={imgobj}
                        />
                      </section>
                    );
                  })}
              </div>
              <div className="customer-care-guide">
                <div className="care-box">
                  <div className="care">
                    <h2>Customer Care</h2>
                    <p>eshop@amiparis.fr</p>
                    <p>+44 238 214 5908</p>
                  </div>
                </div>
                <div className="care-box">
                  <div className="care">
                    <h2>Care Guide</h2>
                    {detailData.product_guide &&
                      detailData.product_guide.map((cg, i) => {
                        return <p className="care-guide" key={i}>{cg}</p>;
                      })}
                  </div>
                </div>
              </div>
            </main>
            <Footer />
            {detailData.product_size && (
              <ProductBottomBar
                isActive={isVisible}
                price={detailData.product_price.toLocaleString()}
                size={detailData.product_size}
              />
            )}
          </>
        )}
     </>
    );
  }
}

const mapStateToProps = (state) => ({
  cartList: state.cartList,
});

export default connect(mapStateToProps, {addProduct, openModal})(ProductDetailwData)
