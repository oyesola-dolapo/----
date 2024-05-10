export default function Footer() {
  const links = [
    {
      name: "Privacy Policy",
    },
    { name: "Terms of Service" },
    { name: "FAQS" },
    { name: "About Us" },
    { name: "Contact Us" },
    ,
  ];
  return (
    <footer className="px-8 py-4 flex flex-col sm:px-24 border-t-2 border-black- border-solid border-opacity-[.5]">
      <div className="flex flex-col sm:my-0 sm:mx-auto sm:items-center gap-4">
        <p className="font-medium text-xl">LEGAL</p>
        <ul className="tracking-wider flex flex-col gap-6  sm:flex-row">
          {links.map((link) => {
            return (
              <li key={link.name}>
                <a href="#">{link.name}</a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="sm:flex items-center justify-between mt-8">
        <div className="subscribe ">
          <p className="text-center text-2xl tracking-widest mb-4">
            Subscribe on 𝟗ƑℲ
          </p>
          <form
            action="#"
            className="border-2 border-black flex items-center sm:w-[30rem]">
            <input
              type="email"
              placeholder="Email"
              className="px-2 border-none outline-none w-[90%]"
            />
            <button type="submit" className="ml-auto">
              <i className="fa-solid fa-arrow-right text-lg p-4 "></i>
            </button>
          </form>
        </div>
        <div className="socials flex justify-center mt-12">
          <ul className="text-2xl flex gap-4">
            <li>
              <a href="#">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>

            <li>
              <a href="#">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
