'use client';

import { gql, useQuery } from '@apollo/client';

const AUTH_QUERY = gql`
  query {
    authPing
  }
`;

export default function TestPage() {
    const { data, loading, error } = useQuery(AUTH_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return <h1>{data.authPing}</h1>;
}
