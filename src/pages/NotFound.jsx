import { Link } from "lucide-react"


const NotFound = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
        <h1 className='text-6xl font-bold text-blue-600'>
            404
        </h1>
        <p className='mt-4 text-xl'>Page Not Found</p>
        <Link to="/" className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white">
            Back to Home
        </Link>
    </div>
  )
}

export default NotFound