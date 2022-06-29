import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        image
        description
        title
        image
        link
      }
    }
  }
`;

export const QUERY_COMMENT = gql`
  query comment($id: ID!) {
    comment(_id: $id) {
      _id
      commentText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;