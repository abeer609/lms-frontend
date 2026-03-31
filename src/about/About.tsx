import Footer from "../components/Footer"
import Header from "../components/Header"

const About = () => {
    return (
        <>
            <Header currentPage="about" />
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-indigo-400">About EduLMS</h2>
                <div className="max-w-4xl mx-auto text-gray-300 space-y-6 text-center text-lg md:text-xl">
                    <p>EduLMS is a cutting-edge Learning Management System that transforms education into an interactive, engaging, and fully accessible experience for learners of all levels.</p>

                </div>
            </section>
            <section className="py-24 px-6 bg-gray-900">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-indigo-400">Why Choose EduLMS?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-6xl mx-auto">

                    <div className="bg-gray-800 rounded-2xl p-10 shadow-lg hover:scale-105 transform transition">
                        <div className="text-indigo-400 text-6xl mb-4">⚡</div>
                        <h4 className="text-2xl font-semibold mb-4">Interactive Learning</h4>
                        <p className="text-gray-400">Engage with interactive quizzes, exercises, and an AI-powered editor for hands-on learning.</p>
                    </div>

                    <div className="bg-gray-800 rounded-2xl p-10 shadow-lg hover:scale-105 transform transition">
                        <div className="text-indigo-400 text-6xl mb-4">🚀</div>
                        <h4 className="text-2xl font-semibold mb-4">Seamless Experience</h4>
                        <p className="text-gray-400">Learn anywhere, anytime with a responsive, mobile-friendly design and smooth performance.</p>
                    </div>

                    <div className="bg-gray-800 rounded-2xl p-10 shadow-lg hover:scale-105 transform transition">
                        <div className="text-indigo-400 text-6xl mb-4">🔒</div>
                        <h4 className="text-2xl font-semibold mb-4">Secure & Reliable</h4>
                        <p className="text-gray-400">Enterprise-level security ensures your data and learning environment are safe.</p>
                    </div>

                    <div className="bg-gray-800 rounded-2xl p-10 shadow-lg hover:scale-105 transform transition">
                        <div className="text-indigo-400 text-6xl mb-4">💻</div>
                        <h4 className="text-2xl font-semibold mb-4">Built-in Code Compiler</h4>
                        <p className="text-gray-400">Practice coding directly in courses with our integrated compiler supporting multiple languages.</p>
                    </div>

                    <div className="bg-gray-800 rounded-2xl p-10 shadow-lg hover:scale-105 transform transition">
                        <div className="text-indigo-400 text-6xl mb-4">📈</div>
                        <h4 className="text-2xl font-semibold mb-4">Progress Tracking</h4>
                        <p className="text-gray-400">Monitor your course progress, completion rates, and earned certificates effortlessly.</p>
                    </div>

                    <div className="bg-gray-800 rounded-2xl p-10 shadow-lg hover:scale-105 transform transition">
                        <div className="text-indigo-400 text-6xl mb-4">🤝</div>
                        <h4 className="text-2xl font-semibold mb-4">Collaboration Tools</h4>
                        <p className="text-gray-400">Work with peers through discussions, peer reviews, and real-time collaboration features.</p>
                    </div>

                </div>
            </section>
            <Footer />
        </>
    )
}

export default About