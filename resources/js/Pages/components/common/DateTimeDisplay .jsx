import { Calendar, Clock, Timer } from "lucide-react";
import React, { useState, useEffect } from "react";

const DateTimeDisplay = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer); // Nettoyage de l'intervalle
    }, []);

    const formatDate = (date) => {
        const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        const months = [
            "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ];

        const dayName = days[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${dayName}, ${day} ${month} ${year}`;
    };

    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className="text-center">
            <p className="text-md text-gray-600">
                <Calendar size="20px" className="inline-flex ml-2"/> {formatDate(currentTime)}
                <Clock size="20px" className="inline-flex ml-2"/> {formatTime(currentTime)}
            </p>
        </div>
    );
};

export default DateTimeDisplay;
