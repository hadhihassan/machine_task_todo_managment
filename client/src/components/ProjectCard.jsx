export default function ProjectCard() {
    return (
        <div className="border p-5 rounded-lg border-violet-900 hover:border-violet-500  max-w-[300px] max-h-[100p]">
            <p className="font-sans font-semibold py-5 ">
                User Managment
            </p>
            <p className="text-xs break-words font-light text-slate-200">
                Our team is creating and sharing useful resources on a regular basis and thousands of developers are using Tailwind CSS to create amazing websites with TailwindTap s free open-source pre-made components and templates.
            </p>
            <p className="text-sm my-5"><span className="text-violet-400">Summary</span> : 2 / 5 todos completed</p>
            <button className="w-full border my-3 bg-violet-700">Delete</button>
            <button className="w-full border bg-violet-700">Edit</button>
        </div>
    )
} 