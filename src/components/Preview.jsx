import React from 'react';
import { Link } from 'react-router-dom'
import { Card } from './Card';
import StopRouteList from './StopRouteList'


export const StopPreview = ({ stop }) => {
    return (
        <Card>
            <h5 className="card-title">{stop.name}</h5>
            <p className="card-subtitle mb-2 text-muted">Stop #{stop.code}</p>
            <StopRouteList stopRoutes={stop.stopRoutes} />
            <div className="mt-2">
                <Link className="btn btn-sm btn-outline-primary px-5" to={"stop/" + stop.id}>View</Link>
            </div>
        </Card>
    );
};