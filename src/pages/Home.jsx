import mapImg from "img/staticmap.png";
import React from "react";

import { Page, Section, ButtonLink, ButtonAnchor, IndentedParagraph } from "components";

const HighLight = ({ children }) => {
    return <span className="text-primary font-weight-bold">{children}</span>
}

const Home = () => {
    return (
        <Page title="Welcome">
            <Section>
                <IndentedParagraph>
                    <HighLight>Stop Checker</HighLight> is the easiest,
                    and quickest way to get <HighLight>Live Bus Data</HighLight> in Ottawa for <HighLight>OC Transpo</HighLight>.
                    <ul>
                        <li>Search stops by name or stop code</li>
                        <li>Get a map showing the location of buses in real-time</li>
                        <li>Free to use!</li>
                    </ul>
                </IndentedParagraph>
            </Section>

            <Section title={"Find Your Stop!"}>
                <IndentedParagraph>
                    Get started and find your stop
                </IndentedParagraph>
                <ButtonLink to={"/search"}>Search ></ButtonLink>
            </Section>

            <Section title={"Example Map"}>
                <IndentedParagraph>
                    This is an example map showing the location of a live bus heading to a stop.
                    When viewing the map the estimated arrival time, and distance from the stop are also given.
                    This map can show up to 3 buses however, OC Transpo's data is very inconsistent.
                </IndentedParagraph>
                <img className="img-fluid" src={mapImg} alt="Static Map" />
            </Section>

            <Section title={"Technical Details"}>
                <IndentedParagraph>
                    Built using GraphQL, MongoDB, Typescript, React. The code for both the GraphQL server and React.js client can be found on GitHub below
                </IndentedParagraph>
                <ButtonAnchor href={"https://github.com/danielholmes839/OC-Transpo-GraphQL"}>GitHub / Server</ButtonAnchor>
                <ButtonAnchor href={"https://github.com/danielholmes839/OC-Transpo-client"}>GitHub / Client</ButtonAnchor>
            </Section>

            <p className="text-muted">Created by Daniel Holmes</p>
        </Page>
    );
};

export default Home;