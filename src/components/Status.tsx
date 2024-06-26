import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils.ts';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu.tsx';
import "./status.css";

const Status = () => {
    const [status, setStatus] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/healthcheck`)
            .then((response) => response.json())
            .then((data) => {
                setStatus(data);
            });
    }, []);

    console.log(status);


    return (
        <div className={cn(navigationMenuTriggerStyle(), 'flex items-center justify-center cursor-pointe status-icon')}>
            <div className={`rounded-full h-3 w-3 mr-2 ${status?.status === 'OK' ? 'bg-green-500' : 'bg-red-500'}`}>

            </div>
            <div className="status-details absolute w-max bg-neutral-50 shadow-lg p-2 top-10 right-0 hidden rounded-lg">
                <table className="table-auto">
                    <tbody>
                    <tr>
                        <td><b>Crawler status</b></td>
                        <td>{status?.status}</td>
                    </tr>
                    <tr>
                        <td><b>Feeds number</b></td>
                        <td>{status?.number_of_feeds}</td>
                    </tr>
                    <tr>
                        <td><b>Articles number</b></td>
                        <td>{status?.number_of_articles}</td>
                    </tr>
                    <tr>
                        <td><b>Last fetching date</b></td>
                        <td>{new Date(status?.last_fetching_date).toLocaleString()}</td>
                    </tr>
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Status;