'use strict';

module.exports = {
  up: async (queryInterface) => {
    // Init tables
    await queryInterface.sequelize.query(
      `
        CREATE TABLE IF NOT EXISTS "group" (
          id varchar(128) PRIMARY KEY,
          name varchar(50) NOT NULL,
          permissions text ARRAY
        );
      `
    );

    await queryInterface.sequelize.query(
      `
        CREATE TABLE IF NOT EXISTS "user" (
          id varchar(128) PRIMARY KEY,
          login varchar(50) NOT NULL,
          password varchar(50) NOT NULL,
          age integer NOT NULL,
          is_deleted boolean NOT NULL
        );
      `
    );

    await queryInterface.sequelize.query(
      `
        CREATE TABLE IF NOT EXISTS "user_group" (
          id varchar(128) PRIMARY KEY,
          user_id varchar(128) NOT NULL REFERENCES "user" (id) ON DELETE CASCADE,
          group_id varchar(128) NOT NULL REFERENCES "group" (id) ON DELETE CASCADE
        );
      `
    );

    // Fill tables
    await queryInterface.bulkInsert('group', [
      {
        id: '1',
        name: 'Admin',
        permissions: ['WRITE', 'READ', 'SHARE', 'DELETE', 'UPLOAD_FILES'],
      },
      {
        id: '2',
        name: 'Moderator',
        permissions: ['WRITE', 'READ', 'SHARE'],
      },
      {
        id: '3',
        name: 'User',
        permissions: ['READ'],
      },
    ]);

    await queryInterface.bulkInsert('user', [
      {
        id: '1',
        login: 'User1',
        password: 'User1',
        age: 25,
        is_deleted: false,
      },
      {
        id: '2',
        login: 'User2',
        password: 'User2',
        age: 25,
        is_deleted: false,
      },
      {
        id: '3',
        login: 'User3',
        password: 'User3',
        age: 25,
        is_deleted: false,
      },
    ]);

    await queryInterface.bulkInsert('user_group', [
      {
        id: '1',
        user_id: '1',
        group_id: '1',
      },
      {
        id: '2',
        user_id: '1',
        group_id: '2',
      },
      {
        id: '3',
        user_id: '2',
        group_id: '3',
      },
      {
        id: '4',
        user_id: '3',
        group_id: '3',
      },
    ]);
  },
};
