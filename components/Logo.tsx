const Logo = () => {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: `<svg width="16" height="22"><g fill="currentColor" fill-rule="nonzero"><path d="M2.765 14.312L13.859 2.415 11.369.093.274 11.99zM4.631 21.907L15.726 10.01l-2.49-2.322L2.14 19.585z"/></g></svg>`
      }}
    />
  );
};

export default Logo;
