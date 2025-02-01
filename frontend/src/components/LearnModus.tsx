import {Card} from "@/types/card";
import React, {useEffect, useState} from "react";
import {formatTimeFromSeconds} from "@/utils/time";

interface LearnModusProps {
    cards: Card[];
    stopLearnModi: () => void
}

export const LearnModus: React.FC<LearnModusProps> = ({cards, stopLearnModi}) => {
    const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0);
    const [timer, setTimer] = useState<number>(0);
    const [flipped, setFlipped] = useState<boolean>(false);

    const handleNextCard = () => {
        if (selectedCardIndex + 1 < cards.length) {
            setFlipped(false);
            setSelectedCardIndex((prevState) => prevState + 1);
        }
    };

    const handlePreviousCard = () => {
        if (selectedCardIndex - 1 >= 0) {
            setFlipped(false);
            setSelectedCardIndex((prevState) => prevState - 1);
        }
    };

    useEffect(() => {
        handleTimer()
    }, []);

    const handleTimer = () => {
        setTimeout(() => {
            setTimer((prevState) => prevState + 1)
            handleTimer()
        }, 1000)
    }


    return (
        <main className="w-screen relative h-[85%] flex justify-center items-center">
            <button
                onClick={() => setFlipped(!flipped)}
                className={`w-80 h-96 bg-accent-600 rounded-md p-2 transition-transform duration-500 preserve-3d ${
                    flipped ? 'rotate-y-180' : ''
                }`}
            >
                <div className="relative w-full h-full preserve-3d">
                    {/* Front */}
                    <div className="absolute w-full h-full flex items-center justify-center backface-hidden">
                        <p className="p-2 text-lg break-words">{cards[selectedCardIndex].question}</p>
                    </div>
                    {/* Back */}
                    <div
                        className="absolute w-full h-full flex items-center justify-center backface-hidden rotate-y-180">
                        <p className="p-2 text-lg break-words">{cards[selectedCardIndex].answer}</p>
                    </div>
                </div>
            </button>
            <button className="absolute left-8 top-1/2" onClick={handlePreviousCard}>
                <span className="material-icons text-black">arrow_back_ios</span>
            </button>
            <button className="absolute right-8 top-1/2" onClick={handleNextCard}>
                <span className="material-icons text-black">arrow_forward_ios</span>
            </button>
            <button onClick={stopLearnModi}
                    className="absolute top-8 right-8 bg-accent-600 w-28 h-10 rounded-lg">Beenden
            </button>
            <p className="absolute top-8 right-40 bg-accent-600 w-28 h-10 rounded-lg flex justify-center items-center">{formatTimeFromSeconds(timer)}
            </p>
        </main>
    );
};
