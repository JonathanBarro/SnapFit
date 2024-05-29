import React from 'react';

const cardClasses = "max-w-xs mx-2 my-4 bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden";
const titleClasses = "text-lg font-semibold text-zinc-800 dark:text-white";
const descriptionClasses = "text-sm text-zinc-600 dark:text-zinc-400";
const buttonClasses = "bg-purple-500 text-white px-3 py-1 mt-2 rounded-lg hover:bg-purple-400 transition duration-200 ease-in-out";

const VideoCardItem = ({ title, description, videoUrl, thumbnailUrl }) => {
    return (
        <div className={cardClasses}>
            <img src={thumbnailUrl} alt="Video thumbnail" className="w-full" />
            <div className="p-4">
                <h3 className={titleClasses}>{title}</h3>
                <p className={descriptionClasses}>{description}</p>
                <a href={videoUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses}>Watch Now</a>
            </div>
        </div>
    );
};

export default VideoCardItem;
