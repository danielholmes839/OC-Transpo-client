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
                        next(limit: 3) {
                            id
                            time {
                                string
                                remaining: stringRemaining
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
                            remaining: stringRemaining
                        }
                        gps {
                            distance
                        }
                    }
                }

                map(width: 800, height: 400)
                
                schedule {
                    next(limit: 3) {
                        id
                        time {
                            string
                            remaining: stringRemaining
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

export const stopRouteScheduleQuery = (id) => {
	return gql`
        query {
            stopRoute: StopRoute_get(id: "${id}") {
                schedule {
                    all {
                        id
                        time {
                            string
                        }
                    }
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
                
                service {
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
                }
            }
        }
    `
}
