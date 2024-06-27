import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CardProps {
    title: string;
    description: string;
    link: string;
    pub_date: string;
    audio_link: string;
}

const Card: React.FC<CardProps> = ({
    title,
    description,
    link,
    pub_date,
    audio_link,
}) => {
    const formattedDate = format(
        new Date(pub_date),
        "'Publié le' d MMMM yyyy 'à' HH:mm",
        { locale: fr }
    );

    const getFaviconUrl = (url: string) => {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}`;
    };

    const getDomain = (url: string) => {
        return new URL(url).hostname;
    };

    const faviconUrl = getFaviconUrl(link);
    const domain = getDomain(link);

    return (
        <div className="max-w-sm max-h-80 w-full lg:max-w-7xl lg:flex border-2 transition-transform duration-300 motion-safe:hover:scale-105">
            {/* <div
                className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                style={{
                    backgroundImage:
                        "url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Jordan_Bardella_-_Strasbourg_European_Parliament_September_2022_%28cropped%29.jpg/1024px-Jordan_Bardella_-_Strasbourg_European_Parliament_September_2022_%28cropped%29.jpg')",
                }}
            ></div> */}
            <div className="w-full lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 font-bold text-xl mb-2 hover:text-orange-500 visited:text-orange-800"
                    >
                        {title}
                    </a>
                    <p className="text-gray-700 text-base line-clamp-3">
                        {description}
                    </p>
                    {audio_link ? (
                        <audio
                            controls={true}
                            src={audio_link}
                            className="mt-4 px-5 w-full"
                        ></audio>
                    ) : (
                        <></>
                    )}
                </div>
                <p>{formattedDate}</p>
                <div className="footer flex items-center max-w-full">
                    <img
                        src={faviconUrl}
                        alt="Favicon"
                        className="w-4 h-4 mr-2"
                    />
                    <span className="text-orange-900 truncate overflow-hidden whitespace-nowrap">
                        {domain}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Card;
