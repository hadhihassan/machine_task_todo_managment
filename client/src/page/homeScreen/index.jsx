import { useState } from 'react'
import ProjectCard from '../../components/ProjectCard'
import Modal from '../../components/Modal'

export default function HomeScreen() {

    const [openModal, setOpen] = useState(false)

    const onClose = () => setOpen(() => !openModal)

    return (
        <main className="h-[200vh] ">
            <button
                className="py-2 mt-9 px-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg shadow-lg "
                onClick={onClose}
            >
                New Project
            </button>
            <Modal isOpen={openModal} onClose={onClose}>
                <ProjectCard />
            </Modal>                
            <div className="w-full mb-9 mt grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-5">
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </div>
        </main >
    )
}