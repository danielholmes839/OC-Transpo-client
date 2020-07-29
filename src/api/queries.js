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

export const stopQuery = (id) => {
    return gql`
        query {
            stop: Stop_get(stop: "${id}") {
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
            stopRoute: StopRoute_get(stopRoute: "${id}") {
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