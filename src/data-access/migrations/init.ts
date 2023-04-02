module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      login: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      age: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      isDeleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.bulkInsert('Users', [
      {
        id: '1',
        login: 'User1',
        password: 'User1',
        age: 25,
        isDeleted: false,
      },
      {
        id: '2',
        login: 'User2',
        password: 'User2',
        age: 25,
        isDeleted: false,
      },
      {
        id: '3',
        login: 'User3',
        password: 'User3',
        age: 25,
        isDeleted: false,
      },
    ]);
  },
};
