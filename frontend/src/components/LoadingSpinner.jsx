import React from 'react';

const LoadingSpinner = ({ size = 'md', fullScreen = false }) => {
    const sizes = {
        sm: 'w-6 h-6 border-2',
        md: 'w-10 h-10 border-3',
        lg: 'w-16 h-16 border-4',
        xl: 'w-24 h-24 border-4'
    };

    const spinner = (
        <div className="flex flex-col items-center justify-center gap-3">
            <div className={`${sizes[size]} border-primary border-t-transparent rounded-full animate-spin`} />
            <p className="text-gray-600 font-medium">Loading...</p>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
                {spinner}
            </div>
        );
    }

    return <div className="flex items-center justify-center py-12">{spinner}</div>;
};

export default LoadingSpinner;
