const Logo = () => {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: `
          <?xml version="1.0" encoding="UTF-8"?>
          <svg width="16px" height="22px" viewBox="0 0 16 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: Sketch 61.2 (89653) - https://sketch.com -->
              <title>Mark</title>
              <desc>Created with Sketch.</desc>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Artboard" transform="translate(-8.000000, -5.000000)" fill="#FFFFFF" fill-rule="nonzero">
                      <g id="Mark" transform="translate(8.000000, 5.000000)">
                          <g id="Group">
                              <polygon id="Line" transform="translate(7.066667, 7.202381) rotate(-47.000000) translate(-7.066667, -7.202381) " points="-1.06666667 8.9047619 15.2 8.9047619 15.2 5.5 -1.06666667 5.5"></polygon>
                              <polygon id="Line-Copy" transform="translate(8.933333, 14.797619) rotate(-47.000000) translate(-8.933333, -14.797619) " points="0.8 16.5 17.0666667 16.5 17.0666667 13.0952381 0.8 13.0952381"></polygon>
                          </g>
                      </g>
                  </g>
              </g>
          </svg>`
      }}
    />
  );
};

export default Logo;
