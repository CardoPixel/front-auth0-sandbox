// /app/aws/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const AwsPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [response, setResponse] = useState(null);

    useEffect(() => {
        setUserId(uuidv4());
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            // Fetch OpenID Connect token
            const tokenResponse = await axios.post(
                "https://dev-n4anap17xr2qxksj.us.auth0.com/oauth/token",
                {
                    client_id: "8xNypIfqRuRmH9k8qe0fHnw3sflDE520",
                    client_secret: "6TwVLXi5r3eebCbbJ6ltPmRY1GHKtF8uDVp-qfbvRibjuivM7V8fQQVFfCfN-cm_",
                    audience: "https://ze2zfots2jhnfbn5gcyn7irbhy.appsync-api.us-east-1.amazonaws.com/graphql",
                    grant_type: "client_credentials",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const token = tokenResponse.data.access_token;

            // Make AppSync mutation request
            const graphqlResponse = await axios.post(
                "https://ze2zfots2jhnfbn5gcyn7irbhy.appsync-api.us-east-1.amazonaws.com/graphql",
                {
                    query: `
            mutation MyMutation {
              createUser(email: "${email}", userId: "${userId}", username: "${username}") {
                email
                userId
                username
              }
            }
          `,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setResponse(graphqlResponse.data);
            console.log(graphqlResponse.data);
        } catch (error) {
            console.error("Error making request:", error);
        }
    };

    return (
        <div className="content-layout">
            <h1 id="page-title" className="content__title">AWS Page</h1>
            <div className="content__body">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="userId">Generated User ID (for debugging):</label>
                        <input type="text" id="userId" value={userId} readOnly />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                {response && (
                    <div>
                        <h2>Response from AppSync:</h2>
                        <pre>{JSON.stringify(response, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AwsPage;