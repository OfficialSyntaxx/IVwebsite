
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import SectionTitle from '../components/SectionTitle';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const StaffApplication = () => {
    const [formData, setFormData] = useState({
        discord: '',
        age: '',
        experience: '',
        why: '',
        scenario: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch('http://localhost:3002/staff-application', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
            } else {
                console.error("Submission failed");
                alert("Failed to submit application. Please try again later.");
                setStatus('idle');
            }
        } catch (error) {
            console.error("Submission error", error);
            alert("Error connecting to server.");
            setStatus('idle');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen pt-32 pb-20 container mx-auto px-6 relative z-20 flex items-center justify-center">
                <div className="bg-slate-900/50 border border-green-500/30 p-12 rounded-2xl text-center max-w-2xl animate-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-400">
                        <CheckCircle size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Application Received</h2>
                    <p className="text-slate-400 text-lg mb-8">
                        Thank you for your interest in joining the IronVeil staff team.
                        We have received your application and will review it shortly.
                        If you are selected for an interview, we will contact you via Discord.
                    </p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="text-slate-500 hover:text-white underline underline-offset-4"
                    >
                        Submit another application
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 container mx-auto px-6 relative z-20 animate-in fade-in duration-500">
            <Helmet>
                <title>Staff Application - IronVeil</title>
                <meta name="description" content="Apply to become a staff member at IronVeil." />
            </Helmet>

            <div className="max-w-3xl mx-auto">
                <SectionTitle subtitle>Staff Application</SectionTitle>
                <p className="text-slate-400 text-lg mb-8">
                    We are looking for mature, dedicated players to help moderate the chat, assist new players, and maintain the integrity of the game.
                </p>

                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 md:p-10 shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-slate-300 text-sm font-bold mb-2 uppercase tracking-wide">Discord Username</label>
                                <input
                                    type="text"
                                    name="discord"
                                    required
                                    placeholder="Username#0000"
                                    value={formData.discord}
                                    onChange={handleChange}
                                    className="w-full bg-black/40 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-bold mb-2 uppercase tracking-wide">Age</label>
                                <input
                                    type="text"
                                    name="age"
                                    required
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full bg-black/40 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-slate-300 text-sm font-bold mb-2 uppercase tracking-wide">Previous Experience</label>
                            <textarea
                                name="experience"
                                required
                                rows="4"
                                placeholder="List any servers you have been staff on..."
                                value={formData.experience}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-slate-300 text-sm font-bold mb-2 uppercase tracking-wide">Why do you want to join?</label>
                            <textarea
                                name="why"
                                required
                                rows="4"
                                placeholder="Tell us about yourself and your motivation..."
                                value={formData.why}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-slate-300 text-sm font-bold mb-2 uppercase tracking-wide">Why should we consider you?</label>
                            <textarea
                                name="scenario"
                                required
                                rows="3"
                                placeholder="What unique skills or qualities do you bring to the team?"
                                value={formData.scenario}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                            ></textarea>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className={`
                                    w-full py-4 rounded-lg font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all
                                    ${status === 'submitting' ? 'bg-slate-700 cursor-wait' : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:shadow-[0_0_30px_rgba(8,145,178,0.6)]'}
                                `}
                            >
                                {status === 'submitting' ? 'Submitting...' : <><Send size={18} /> Submit Application</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StaffApplication;
