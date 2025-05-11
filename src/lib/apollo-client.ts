import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql', // Changed from [::1] to localhost and graphiql to graphql
    cache: new InMemoryCache(),
});
