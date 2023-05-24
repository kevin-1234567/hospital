const Carousel = () => {
  const imageStyle = {
    width: '100%',
    height: '500px',
  };
  return (
    <div class="container-fluid">
      <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>

        <div class="carousel-inner">
          <div class="item active">
            <img
              style={imageStyle}
              src="https://softwareauggest-blogimages.s3.ca-central-1.amazonaws.com/blog/wp-content/uploads/2021/05/10192350/Top-8-Benefits-of-Having-A-Smart-Hospital-Management-System.png"
            />
          </div>

          <div class="item">
            <img
              style={imageStyle}
              src="https://images.drlogy.com/assets/uploads/img/admin/blog/5cc681eaab9a07ffb32df5ba3302645e.png"
            />
          </div>

          <div class="item">
            <img
              style={imageStyle}
              src="https://softwareauggest-blogimages.s3.ca-central-1.amazonaws.com/blog/wp-content/uploads/2022/11/28170745/Best-FreeOpen-Source-Hospital-Management-System-06-1.png"
            />
          </div>
        </div>

        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#myCarousel" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Carousel;
