import fetch from 'node-fetch';

const getInfo = async (name) => {
  const query = `query GetInfo($name: String!){
        getInfo(name: $name){
          age
          nameOfFriends
        }
      }`;

  const variables = { name };

  const result = await fetch(
    'http://testapi.codesignal.com/graphql/demoGraphQL',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    }
  )
    .then((response) => response.text())
    .catch((error) => {
      console.log(error);
    });

  console.log(result);

  return result;
};

getInfo('Areg');
