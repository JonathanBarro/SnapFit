import React from 'react';
import VideoCardItem from './video';
import './videoList.scss'

const videoData = {
    pecho: [
        {
            title: 'Push Up',
            description: 'Cómo hacer flexiones correctamente.',
            videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
            thumbnailUrl: 'https://img.youtube.com/vi/IODxDxX7oi4/0.jpg'
        },
        {
            title: 'Chest Press',
            description: 'Cómo hacer press de pecho con mancuernas.',
            videoUrl: 'https://www.youtube.com/watch?v=gRVjAtPip0Y',
            thumbnailUrl: 'https://img.youtube.com/vi/gRVjAtPip0Y/0.jpg'
        },
        {
            title: 'Incline Bench Press',
            description: 'Cómo hacer press inclinado con barra.',
            videoUrl: 'https://www.youtube.com/watch?v=8iPEnn-ltC8',
            thumbnailUrl: 'https://img.youtube.com/vi/8iPEnn-ltC8/0.jpg'
        },
        {
            title: 'Cable Fly',
            description: 'Cómo hacer fly con cables.',
            videoUrl: 'https://www.youtube.com/watch?v=LGDCjwO-hFg',
            thumbnailUrl: 'https://img.youtube.com/vi/LGDCjwO-hFg/0.jpg'
        }
    ],
    espalda: [
        {
            title: 'Pull Up',
            description: 'Cómo hacer dominadas correctamente.',
            videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
            thumbnailUrl: 'https://img.youtube.com/vi/eGo4IYlbE5g/0.jpg'
        },
        {
            title: 'Lat Pulldown',
            description: 'Cómo hacer jalones al pecho.',
            videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc',
            thumbnailUrl: 'https://img.youtube.com/vi/CAwf7n6Luuc/0.jpg'
        },
        {
            title: 'Seated Row',
            description: 'Cómo hacer remo sentado.',
            videoUrl: 'https://www.youtube.com/watch?v=GZbfZ033f74',
            thumbnailUrl: 'https://img.youtube.com/vi/GZbfZ033f74/0.jpg'
        },
        {
            title: 'Deadlift',
            description: 'Cómo hacer peso muerto correctamente.',
            videoUrl: 'https://www.youtube.com/watch?v=op9kVnSso6Q',
            thumbnailUrl: 'https://img.youtube.com/vi/op9kVnSso6Q/0.jpg'
        }
    ],
    brazos: [
        {
            title: 'Bicep Curl',
            description: 'Cómo hacer curl de bíceps con mancuernas.',
            videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo',
            thumbnailUrl: 'https://img.youtube.com/vi/ykJmrZ5v0Oo/0.jpg'
        },
        {
            title: 'Tricep Dips',
            description: 'Cómo hacer fondos de tríceps.',
            videoUrl: 'https://www.youtube.com/watch?v=0326dy_-CzM',
            thumbnailUrl: 'https://img.youtube.com/vi/0326dy_-CzM/0.jpg'
        },
        {
            title: 'Hammer Curl',
            description: 'Cómo hacer hammer curl.',
            videoUrl: 'https://www.youtube.com/watch?v=zC3nLlEvin4',
            thumbnailUrl: 'https://img.youtube.com/vi/zC3nLlEvin4/0.jpg'
        },
        {
            title: 'Tricep Pushdown',
            description: 'Cómo hacer extensión de tríceps en polea.',
            videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU',
            thumbnailUrl: 'https://img.youtube.com/vi/2-LAMcpzODU/0.jpg'
        }
    ],
    abdominales: [
        {
            title: 'Crunch',
            description: 'Cómo hacer crunch abdominal.',
            videoUrl: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU',
            thumbnailUrl: 'https://img.youtube.com/vi/Xyd_fa5zoEU/0.jpg'
        },
        {
            title: 'Leg Raise',
            description: 'Cómo hacer elevación de piernas.',
            videoUrl: 'https://www.youtube.com/watch?v=l4kQd9eWclE',
            thumbnailUrl: 'https://img.youtube.com/vi/l4kQd9eWclE/0.jpg'
        },
        {
            title: 'Russian Twist',
            description: 'Cómo hacer Russian twist.',
            videoUrl: 'https://www.youtube.com/watch?v=wkD8rjkodUI',
            thumbnailUrl: 'https://img.youtube.com/vi/wkD8rjkodUI/0.jpg'
        },
        {
            title: 'Plank',
            description: 'Cómo hacer plank correctamente.',
            videoUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw',
            thumbnailUrl: 'https://img.youtube.com/vi/pSHjTRCQxIw/0.jpg'
        }
    ],
    pierna: [
        {
            title: 'Squat',
            description: 'Cómo hacer sentadillas correctamente.',
            videoUrl: 'https://www.youtube.com/watch?v=YaXPRqUwItQ',
            thumbnailUrl: 'https://img.youtube.com/vi/YaXPRqUwItQ/0.jpg'
        },
        {
            title: 'Lunge',
            description: 'Cómo hacer zancadas.',
            videoUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U',
            thumbnailUrl: 'https://img.youtube.com/vi/QOVaHwm-Q6U/0.jpg'
        },
        {
            title: 'Leg Press',
            description: 'Cómo hacer press de pierna.',
            videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
            thumbnailUrl: 'https://img.youtube.com/vi/IZxyjW7MPJQ/0.jpg'
        },
        {
            title: 'Leg Curl',
            description: 'Cómo hacer curl de pierna.',
            videoUrl: 'https://www.youtube.com/watch?v=1Tq3QdYUuHs',
            thumbnailUrl: 'https://img.youtube.com/vi/1Tq3QdYUuHs/0.jpg'
        }
    ],
    cardio: [
        {
            title: 'Jump Rope',
            description: 'Cómo saltar la cuerda correctamente.',
            videoUrl: 'https://www.youtube.com/watch?v=jLtEd2JwjNo',
            thumbnailUrl: 'https://img.youtube.com/vi/jLtEd2JwjNo/0.jpg'
        },
        {
            title: 'Burpees',
            description: 'Cómo hacer burpees correctamente.',
            videoUrl: 'https://www.youtube.com/watch?v=TU8QYVW0gDU',
            thumbnailUrl: 'https://img.youtube.com/vi/TU8QYVW0gDU/0.jpg'
        },
        {
            title: 'Mountain Climbers',
            description: 'Cómo hacer escaladores correctamente.',
            videoUrl: 'https://www.youtube.com/watch?v=nmwgirgXLYM',
            thumbnailUrl: 'https://img.youtube.com/vi/nmwgirgXLYM/0.jpg'
        },
        {
            title: 'High Knees',
            description: 'Cómo hacer rodillas altas.',
            videoUrl: 'https://www.youtube.com/watch?v=OAJ_J3EZkdY',
            thumbnailUrl: 'https://img.youtube.com/vi/OAJ_J3EZkdY/0.jpg'
        }
    ]
};

const VideoCardList = () => {
    return (
        <div className="flex flex-col items-center">
            {Object.entries(videoData).map(([group, videos]) => (
                <div key={group} className="info-video">
                    <h2 className="text-5xl mb-4 text-center capitalize">{group}</h2>
                    <div className="flex-wrap">
                        {videos.map((video, index) => (
                            <VideoCardItem
                                key={index}
                                title={video.title}
                                description={video.description}
                                videoUrl={video.videoUrl}
                                thumbnailUrl={video.thumbnailUrl}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VideoCardList;
