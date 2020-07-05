import React from "react";
import "./ImageModal.scss";

class ImageModal extends React.Component {
  render() {
    const { isOpened, images, close } = this.props;
    return (
      <>
        {isOpened ? (
          <div className="Modal-wrapper">
            <div className="MyModalImages">
              <div className="button-wrap">
                <button onClick={close}> close </button>
              </div>

              {images.map((img) => {
                return <img alt="product-img-in-full-size" src={img} />;
              })}
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default ImageModal;
