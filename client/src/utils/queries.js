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
export const GET_friendlist = gql`
{
    friendlist {
    _id
    username
    email
  }
}
`;