import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full h-16 px-6 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <Image src="/logo.png" width={40} height={40} alt={"logo"}/>
        <Link href="/" className="text-xl font-semibold text-gray-800 ml-3">
          Wimbledon Courts Notifier
        </Link>
      </div>
      {/* <div className="flex items-center">
        <a href="/login" className="text-lg font-semibold text-gray-800">
          Login
        </a>
      </div> */}
    </header>
  )
}