import React, { useState } from 'react';
import './video.scss'

const cardClasses = "max-w-xs mx-2 my-4 bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden";
const titleClasses = "titleClasses";
const descriptionClasses = "text-sm text-zinc-600 dark:text-zinc-400";
const buttonClasses = "bg-purple-500 text-white px-3 py-1 mt-2 rounded-lg hover:bg-purple-400 transition duration-200 ease-in-out";

const VideoCardItem = ({ title, description, videoUrl, thumbnailUrl }) => {
    const [showVideo, setShowVideo] = useState(false);

    const handleButtonClick = () => {
        setShowVideo(!showVideo);
    };

    return (
        <div className={cardClasses}>
            {showVideo ? (
                <div className="w-full aspect-w-16 aspect-h-9">
                    <iframe
                        className="w-full h-full"
                        src={videoUrl.replace("watch?v=", "embed/")}
                        title={title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            ) : (
                <img src={thumbnailUrl} alt="Video thumbnail" className="w-full" />
            )}
            <div className="p-4">
                <h3 className={titleClasses}>{title}</h3>
                <p className={descriptionClasses}>{description}</p>
                <button onClick={handleButtonClick} className={buttonClasses}>
                    {showVideo ? 'Hide Video' : 'Watch Now'}
                </button>
            </div>
        </div>
    );
};

export default VideoCardItem;
