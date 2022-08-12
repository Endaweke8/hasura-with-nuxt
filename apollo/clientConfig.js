import { InMemoryCache } from "apollo-cache-inmemory";

export default function (context) {
  return {
   
    httpLinkOptions: {
      uri: "https://dynamic-drum-69.hasura.app/v1/graphql",

      credentials: "same-origin",

      headers: {
        "x-hasura-admin-secret": "HqFjG6ZeCjRKuz3rSH80rKB9eYkBtZ6bTP46g620NRAR4PNBA4NHxbaLn8NMYi5K"
   },
    },
    cache: new InMemoryCache(),
    wsEndpoint: "ws://dynamic-drum-69.hasura.app/v1/graphql",
  };
}
