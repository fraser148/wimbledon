
export default function Footer() {
  return (
    <div className="mt-24 w-full">
      <footer className="flex sm:flex-row flex-col gap-2 items-center justify-between w-full px-6 py-4 bg-white border-t border-gray-200">
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-gray-800">
            <span className="font-light">Developed by </span><a href="https://github.com/fraser148">Fraser Rennie</a>
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-lg font-semibold text-gray-800">
            <a href="https://github.com/fraser148/wimbledon">Github</a> 
          </p>
        </div>
      </footer>
    </div>
  )
}