import { gql } from "apollo-boost";


export const searchQuery = (text) => {
    /* Search stops */
    return gql`
        query {
            stops: Stop_search(name: "${text}", limit: 10) {
                id
                name
                code
                stopRoutes {
                    id
                    headsign
                    number
                    route {
                        textColour
                        backgroundColour
                        number
                    }
                }
            }  
        }
    `;
};

export const stopHistoryQuery = (stops) => {
    /* Search stops */
    return gql`
        query {
            stops: Stop_getMany(ids: ${JSON.stringify(stops)}) {
                id
                name
                code
                stopRoutes {
                    id
                    headsign
                    number
                    route {
                        textColour
                        backgroundColour
                        number
                    }
                }
            }  
        }
    `;
};

export const stopQuery = (id) => {
    return gql`
        query {
            stop: Stop_get(id: "${id}") {
                id
                name
                code

                stopRoutes {
                    id
                    headsign
                    number

                    route {
                        id
                        number
                        textColour
                        backgroundColour
                    }

                    liveBusData {
                        busCount
                    }

                    schedule {
                        next(number: 3) {
                            id
                            time {
                                string
                                remaining
                            }
                        }
                    }
                }
            }
        }
    `;
};


export const stopRouteQuery = (id) => {
    return gql`
        query {
            stopRoute: StopRoute_get(id: "${id}") {
                id
                headsign
                number
                
                liveBusData {
                    busCount
                    buses {
                        headsign
                        number
                        age
                        onTime
                        arrival {
                            string
                            remaining
                        }
                        gps {
                            distance
                        }
                    }
                }

                map(zoom: 13, width: 800, height: 400)
                
                schedule {
                    next(number: 5) {
                        id
                        time {
                            string
                            remaining
                        }
                    }
                }
                
                route {
                    id
                    number
                    backgroundColour
                    textColour
                }
                
                stop {
                    id
                    name
                    code
                }
            }
        }
    `;
};


export const stopTimeQuery = (id) => {
    return gql`
        query {
            stopTime: StopTime_get(id: "${id}") {
                id
                
                stop {
                    id
                    code
                    name
                }
                
                stopRoute {
                    id
                    headsign
                }

                route {
                    id
                    number
                    backgroundColour
                    textColour
                }
                
                time {
                    string
                }
                
                service {
                    monday
                    tuesday
                    wednesday
                    thursday
                    friday
                    saturday
                    sunday

                    start {
                        string
                    }
                    
                    end {
                        string
                    }
                }
                
                trip {
                    id
                    stopTimes {
                        id
                        stop {
                            id
                            code
                            name
                        }
                        time {
                            string
                        }
                    }
                }
            }
        }
    `
}
