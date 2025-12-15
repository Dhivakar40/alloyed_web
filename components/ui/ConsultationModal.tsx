"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Loader2, CheckCircle2 } from "lucide-react";
import { useState, FormEvent } from "react";

interface ConsultationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        date: "",
        time: "",
        topic: ""
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        
        // 1. Construct the payload with the specific 'type'
        const messagePayload = {
            name: formData.name,
            email: formData.email,
            type: "consultation", // <--- Critical for routing logic
            // We combine details into the 'request' field for the Admin Email
            request: `CONSULTATION REQUEST\n\nPreferred Date: ${formData.date}\nPreferred Time: ${formData.time}\n\nTopic: ${formData.topic}`
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(messagePayload),
            });
            
            if (res.ok) {
                setStatus("success");
                // Close modal automatically after 3 seconds of success
                setTimeout(() => {
                    onClose();
                    setStatus("idle");
                    setFormData({ name: "", email: "", date: "", time: "", topic: "" });
                }, 4000);
            } else {
                setStatus("idle");
            }
        } catch (error) {
            console.error(error);
            setStatus("idle"); 
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* BACKDROP */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                    />

                    {/* MODAL WINDOW */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 z-[70] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-6"
                    >
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F17] p-8 shadow-2xl">
                            
                            {/* Neon Header Gradient */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
                            
                            {/* Close Button */}
                            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                                <X size={24} />
                            </button>

                            {/* --- CONTENT SWITCHER --- */}
                            {status === "success" ? (
                                // SUCCESS STATE
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-4">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Request Sent!</h3>
                                    <p className="text-slate-400">
                                        We have received your preference. We will send a <strong>calendar invitation</strong> to your email shortly confirming the slot.
                                    </p>
                                </div>
                            ) : (
                                // FORM STATE
                                <>
                                    <h2 className="text-2xl font-bold text-white mb-1">Book Consultation</h2>
                                    <p className="text-slate-400 text-sm mb-6">Select a preferred time. We will confirm via email.</p>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-slate-500 uppercase">Your Name</label>
                                                <input 
                                                    required 
                                                    type="text" 
                                                    placeholder="Shine Leo"
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors"
                                                    value={formData.name}
                                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                                                <input 
                                                    required 
                                                    type="email" 
                                                    placeholder="alloyedtech@gmail.com"
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors"
                                                    value={formData.email}
                                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                                                    <Calendar size={12} /> Date
                                                </label>
                                                <input 
                                                    required 
                                                    type="date" 
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors [color-scheme:dark]"
                                                    value={formData.date}
                                                    onChange={e => setFormData({...formData, date: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                                                    <Clock size={12} /> Preferred Time
                                                </label>
                                                <select 
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors appearance-none"
                                                    value={formData.time}
                                                    onChange={e => setFormData({...formData, time: e.target.value})}
                                                >
                                                    <option value="" className="bg-[#0B0F17]">Select...</option>
                                                    <option value="Morning (9AM - 12PM)" className="bg-[#0B0F17]">Morning (9AM - 12PM)</option>
                                                    <option value="Afternoon (12PM - 4PM)" className="bg-[#0B0F17]">Afternoon (12PM - 4PM)</option>
                                                    <option value="Evening (4PM - 7PM)" className="bg-[#0B0F17]">Evening (4PM - 7PM)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase">Discussion Topic</label>
                                            <textarea 
                                                required 
                                                rows={3}
                                                placeholder="Mobile App, Web Project, Blockchain..."
                                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors resize-none"
                                                value={formData.topic}
                                                onChange={e => setFormData({...formData, topic: e.target.value})}
                                            />
                                        </div>

                                        <button 
                                            disabled={status === "loading"}
                                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                                        >
                                            {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : "Request Booking"}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}