import React from "react";
import graphqlImg from "img/icons/graphql.png";
import typescriptImg from "img/icons/typescript.png";
import reactImg from "img/icons/react.png";
import awsImg from "img/icons/aws.png";

const Icon = ({src}) => <img src={src} alt="Icon" style={{width: '18vw', height: '18vw', maxWidth: 100, maxHeight:100 }}/>
const Home = () => {
    return (
        <div>
            <h1 className="font-weight-bold">Home</h1>
            <hr/>
            <p>Welcome to OC Transpo GraphQL. The best way to get live bus data and schedules of OC Transpo</p>
            
            <div className="p-3 rounded bg-light">
                <h5 className="font-weight-bold mb-3">Built with:</h5>
                <Icon src={graphqlImg}/>
                <Icon src={typescriptImg}/>
                <Icon src={reactImg}/>
                <Icon src={awsImg}/>
                <p className="mt-1 text-muted font-italic">GraphQL, Typescript, React.js, AWS and more.</p>
            </div>

        </div>
    );
};

export default Home;