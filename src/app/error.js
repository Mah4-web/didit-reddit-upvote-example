"use client";

export default function Error({ error }) {
    return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-red-50">
        <h1 className="text-3xl font-bold text-red-700 mb-4">An error has occurred!</h1>
        <p className="mb-6 text-red-600 text-center max-w-md">{error.message}</p>
    </div>
    );
}
