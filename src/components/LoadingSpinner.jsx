import React from "react"

const LoadingSpinner = () => {
    return (
        <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default LoadingSpinner;