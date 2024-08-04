import { useState, useEffect } from 'react'
import ProjectCard from '../../components/ProjectCard'
import Modal from '../../components/Modal'
import ProjectForm from '../../components/ProjectForm'
import { getProjects } from '../../services/ProjectService'
import { toast } from 'react-hot-toast'

export default function HomeScreen() {

    const [openModal, setOpen] = useState(false)
    const [projects, setProjects] = useState([])


    const onClose = () => setOpen(() => !openModal)

    const fetchProject = async () => {
        try {
            const data = await getProjects()
            console.log(data.data.projects)
            if (data.data.projects.length) {
                setProjects(data?.data?.projects)
            }
        } catch (error) {
            toast("Somthing went wrong!, tru again!")
        }
    }
    useEffect(() => {
        fetchProject()
    }, [])

    return (
        <main className="h-[200vh] ">
            <button
                className="py-2 mt-9 px-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg shadow-lg "
                onClick={onClose}
            >
                New Project
            </button>
            <Modal isOpen={openModal} onClose={onClose}>
                <ProjectForm />
            </Modal>
            <div className="w-full mb-9 mt grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-5">
                {
                    projects.length ? (<>
                        {
                            projects?.map((project) => (
                                <ProjectCard project={project}/>
                            ))
                        }
                    </>) : <>
                        not projects
                    </>
                }
                {/* <ProjectCard /> */}
                {/* <ProjectCard /> */}
                {/* <ProjectCard /> */}
                {/* <ProjectCard /> */}
                {/* <ProjectCard /> */}
            </div>
        </main >
    )
}