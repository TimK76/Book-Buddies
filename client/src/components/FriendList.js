import React from 'react';
import { Link } from 'react-router-dom';
const graphQLHTTP = require('express-graphql');
const { GraphQLObjectType,
        GraphQLSchema,
} = require('graphql/type');

// const graphQLHTTP = require('express-graphql');
// const { GraphQLObjectType,
//         GraphQLSchema,
// } = require('graphql/type');
// const bcrypt = require('bcrypt')

// class FriendList extends Model {
//     // bcrypt
//     checkPassword(loginPw) {
//         return bcrypt.compareSync(loginPw, this.password);
//     }
// };

// FriendList.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         username: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 len: [4]
//             }
//         },
//         trip_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: 'trip',
//                 key: 'id'
//             }
//         }
//     },
//     {
//         hooks: {
//             async beforeCreate(newUserData) {
//                 newUserData.password = await bcrypt.hash(newUserData.password, 10);
//                 return newUserData;
//             },

//             async beforeUpdate(updatedUserData) {
//                 updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
//                 return updatedUserData;
//             }
//         },
//         timestamps: false,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'FriendList'
//     }
// );

// module.exports = FriendList;

import React from 'react';
import { Link } from 'react-router-dom';

const FriendList = ({ friendCount, username, friends }) => {
  if (!friends || !friends.length) {
    return <p className="bg-dark text-light p-3">{username}, make some friends!</p>;
  }
  return (
    <div>
      <h5>
        {username}'s {friendCount} {friendCount === 1 ? 'friend' : 'friends'}
      </h5>
      {friends.map(friend => (
        <button className="btn w-100 display-block mb-2" key={friend._id}>
          <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default FriendList;