export default function Navbar() {
  return (
    <div className="fixed w-full h-12 border-solid border-gray-300 border-b flex justify-center items-center text-gray-500">
      <div className="max-w-[80%] w-full flex justify-between items-center">
        <a href="/" className="text-2xl">
          MoonEn
        </a>
        <input id="drawer" type="checkbox" className="hidden toggle" />
        <label htmlFor="drawer" className=" cursor-pointer p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <ul className="sidebar hidden">
          <li>회원가입</li>
          <li>구글연동</li>
        </ul>
      </div>
    </div>
  )
}
