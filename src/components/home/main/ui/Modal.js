import { useState, useRef } from 'react';
import Image from 'next/image';

export default function Modal({ isOpen, onClose, onSuccess }) {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setImagePreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !message || !file) {
            setError('Please fill all fields and select an image.');
            return;
        }

        setLoading(true);

        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const fileContent = reader.result;

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        message,
                        fileContent,
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    setError(data.error || 'Upload failed');
                    setLoading(false);
                    return;
                }

                setSuccess(true);

                setTimeout(() => {
                    setSuccess(false);
                    setName('');
                    setMessage('');
                    setFile(null);
                    setImagePreview(null);
                    if (onSuccess) onSuccess();
                    else onClose();
                }, 2000);
            };

            reader.onerror = () => {
                setError('Failed to read the selected file.');
                setLoading(false);
            };

        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-500">
            <dialog
                open={isOpen}
                className="bg-foreground border border-primary/10 p-8 rounded-md w-full max-w-md relative"
            >
                <div className="w-full flex justify-between items-center mb-6">
                    <h2 className="text-md uppercase tracking-widest font-light text-primary">
                        Add Contribution
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-primary/50 hover:text-primary transition-colors duration-500 cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {success ? (
                    <article className="text-center py-10 animate-in fade-in zoom-in">
                        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>

                        <h3 className="text-lg uppercase text-primary font-medium tracking-widest mb-2">Thank you!</h3>
                        <p className="text-primary/60 uppercase tracking-widest text-sm">Your contribution has been added.</p>
                    </article>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                    >
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-primary/60 mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-primary/5 border border-primary/10 rounded-lg px-4 py-3 text-primary focus:outline-none focus:border-primary/30 transition-colors"
                                placeholder="John Doe"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-widest text-primary/60 mb-2">Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full bg-primary/5 border border-primary/10 rounded-lg px-4 py-3 text-primary focus:outline-none focus:border-primary/30 transition-colors"
                                placeholder="A short message about Avicii..."
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-widest text-primary/60 mb-2">Image</label>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full bg-primary/5 border border-primary/10 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors overflow-hidden relative group"
                                style={{ minHeight: imagePreview ? '120px' : '150px', padding: imagePreview ? '0' : '1.5rem' }}
                            >
                                {imagePreview ? (
                                    <>
                                        <Image
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover max-h-[200px]"
                                            width={400}
                                            height={400}
                                        />

                                        <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-primary text-sm uppercase tracking-widest">Click to change</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-primary/40 mb-2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                            <polyline points="17 8 12 3 7 8"></polyline>
                                            <line x1="12" y1="3" x2="12" y2="15"></line>
                                        </svg>
                                        <span className="text-primary text-sm uppercase tracking-widest">Click to upload image</span>
                                    </>
                                )}
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm uppercase tracking-widest">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="cursor-pointer mt-2 w-full bg-primary/5 text-secondary font-medium text-sm tracking-widest uppercase px-4 py-3 hover:bg-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                        >
                            {loading ? (
                                <svg
                                    className="animate-spin h-5 w-5 text-black"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </form>
                )}
            </dialog>
        </div>
    );
}