const Header = () => {
  return (
    <div className="flex justify-center pt-2 pb-6">
      <a
        aria-current="page"
        className="flex items-center justify-start"
        href="/"
      >
        <img
          className="w-[120px]"
          alt="logo"
          width="1"
          src="https://pub-f7ac37ac420b462fb53f3e3dcc999562.r2.dev/images/logo.svg"
        />
      </a>
    </div>
  );
};

export default Header;
