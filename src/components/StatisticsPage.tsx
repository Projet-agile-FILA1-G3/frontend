import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Chart from './Chart';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ui/datepicker-custom.css';
import { registerLocale } from 'react-datepicker';
import { fr } from 'date-fns/locale';

registerLocale('fr', fr);

const StatisticsPage: React.FC = () => {
    const [results, setResults] = useState<any[]>([]);
    const [interval, setInterval] = useState<string>('hour');
    const [startDate, setStartDate] = useState<Date | null>(
        new Date('2024-01-01T00:00:00')
    );
    const [endDate, setEndDate] = useState<Date | null>(
        new Date('2024-09-09T00:00:00')
    );

    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        if (query) {
            searchAPI(query);
        }
    }, [interval, startDate, endDate]);

    const handleIntervalChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setInterval(event.target.value);
    };

    const handleStartDateChange = (date: Date | null) => {
        if (date && endDate && date > endDate) {
            setEndDate(date); // Adjust endDate if it's earlier than startDate
        }
        setStartDate(date);
    };

    const handleEndDateChange = (date: Date | null) => {
        if (date && startDate && date < startDate) {
            setStartDate(date); // Adjust startDate if it's later than endDate
        }
        setEndDate(date);
    };

    const handleQueryChange = (newQuery: string) => {
        setQuery(newQuery);
    };

    const getParams = (query: string) => {
        return {
            query: query,
            start_date: startDate,
            end_date: endDate,
            interval: interval,
        };
    };

    const processResults = (data: any) => {
        setResults(data);
    };

    const searchAPI = async (query: string) => {
        const params = getParams(query);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_APP_API_BASE_URL}/metrics`,
                {
                    params,
                    headers: {
                        Accept: 'application/json',
                    },
                }
            );

            if (response.status === 204) {
                setResults([]);
            } else {
                processResults(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setResults([]);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <SearchBar
                apiUrl={`${import.meta.env.VITE_APP_API_BASE_URL}/metrics`}
                placeholder="Rechercher des statistiques sur quelque chose..."
                getParams={getParams}
                processResults={processResults}
                renderResults={() => <div />}
                onQueryChange={handleQueryChange}
            />
            <div className="flex justify-start items-center space-x-40">
                <div className="flex flex-col">
                    <label htmlFor="interval" className="mb-1">
                        Intervalle :{' '}
                    </label>
                    <select
                        className="border border-gray-200 rounded-lg p-1 w-80"
                        id="interval"
                        value={interval}
                        onChange={handleIntervalChange}
                    >
                        <option value="hour">Heure</option>
                        <option value="day">Jour</option>
                        <option value="week">Semaine</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="startDate" className="mb-1">
                        Date de début :{' '}
                    </label>
                    <DatePicker
                        className="border border-gray-200 rounded-lg p-1 w-80"
                        selected={startDate}
                        onChange={handleStartDateChange}
                        showTimeSelect
                        timeCaption="Heure"
                        dateFormat="dd/MM/yyyy, HH:mm"
                        locale="fr"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="endDate" className="mb-1">
                        Date de fin :{' '}
                    </label>
                    <DatePicker
                        className="border border-gray-200 rounded-lg p-1 w-80"
                        selected={endDate}
                        onChange={handleEndDateChange}
                        showTimeSelect
                        timeCaption="Heure"
                        dateFormat="dd/MM/yyyy, HH:mm"
                        locale="fr"
                    />
                </div>
            </div>
            <Chart data={results} />
        </div>
    );
};

export default StatisticsPage;
