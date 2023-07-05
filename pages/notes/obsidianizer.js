// use API explorer if needed
// https://docs.github.com/en/graphql/overview/explorer
const repoFilesQuery = "RepoFiles";
const folderContentsQueryName = "FolderContents";

const query = `
query ${repoFilesQuery}($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      object(expression: "HEAD:") {
        ... on Tree {
          entries {
            name
            oid
            type
            object {
              ... on Blob {
                byteSize
              }
            }
          }
        }
      }
    }
  }`;

const folderContentsquery = `
  query ${folderContentsQueryName}($owner: String!, $name: String!, $oid: GitObjectID) {
      repository(owner: $owner, name: $name) {
        object(oid: $oid) {
          ... on Tree {
            entries {
              name
              type
              oid
              extension
              nameRaw
              path
              object {
                ... on Blob {
                  byteSize
                }
              }
            }
          }
        }
      }
    }`;

const repoVariables = {
  owner: "erikvanek",
  name: "erikvanek.github.io"
};

// const endpoint = "https://graphql.github.com/graphql/proxy";
const endpoint = "https://api.github.com/graphql";
// token = "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";
const token = process.env.obsidianizertoken;
const docsFolderName = "docs";
const notesFolderName = 'notes';

const queryFileStructure = async (operationName, query, variables) => {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: "token " + token
    },
    body: JSON.stringify({
      operationName,
      query,
      variables
    })
  });
};

const fetchData = async () => {
  const result = await queryFileStructure(repoFilesQuery, query, repoVariables);
  const response = await result.json();
  const entries = getFolderChildren(response);
  const docsFolder = entries.find(x => x.name === docsFolderName);
  const docsContents = await fetchDocsContents(docsFolder);
  const notesFolder = docsContents.find(x => x.name === notesFolderName);
  console.log(notesFolder)
  const notesContents = await fetchDocsContents(notesFolder)
  console.log(notesContents)
};

const getFolderChildren = response => {
  const { data } = response;
  const { repository } = data;
  const { object } = repository;
  const { entries } = object;
  return entries;
};

const fetchDocsContents = async docsFolder => {
  const result = await queryFileStructure(
    folderContentsQueryName,
    folderContentsquery,
    { ...repoVariables, oid: docsFolder.oid }
  );
  const response = await result.json();
  return getFolderChildren(response);
};

document.addEventListener("DOMContentLoaded", fetchData);
console.log(process.env)