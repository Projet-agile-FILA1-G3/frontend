import React from 'react';

const Card: React.FC = () => {
    return (
        <div className="max-w-sm w-full lg:max-w-full lg:flex p-8">
            {/* <div
                className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                style={{
                    backgroundImage:
                        "url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Jordan_Bardella_-_Strasbourg_European_Parliament_September_2022_%28cropped%29.jpg/1024px-Jordan_Bardella_-_Strasbourg_European_Parliament_September_2022_%28cropped%29.jpg')",
                }}
            ></div> */}
            <div className="  lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                    <div className="text-gray-900 font-bold text-xl mb-2">
                        Can coffee make you a better developer?
                    </div>
                    <p className="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Voluptatibus quia, nulla! Maiores et perferendis
                        eaque, exercitationem praesentium nihil.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Card;
