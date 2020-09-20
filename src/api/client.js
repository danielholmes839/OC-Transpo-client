// Apollo
import { ApolloClient } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const httpLink = createHttpLink({
  //uri: 'http://og-transpo.us-east-1.elasticbeanstalk.com/graphql',
  uri: "https://www.oc-transpo-graphql.com/graphql",
  //uri: "https://octranspo-graphql.herokuapp.com/graphql"
  //uri: "http://localhost:3000/",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const authData = JSON.parse(localStorage.getItem("tokens"));
  const token = (authData) ? authData.token : null;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      token: token
    }
  }
});

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions
});