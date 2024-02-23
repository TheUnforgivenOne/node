import getGroupModel from './GroupModel';
import getUserGroupModel from './UserGroupModel';
import getUserModel from './UserModel';

const init_relations = () => {
  const User = getUserModel();
  const Group = getGroupModel();
  const UserGroup = getUserGroupModel();

  User.belongsToMany(Group, {
    through: {
      model: UserGroup,
      // unique: false,
    },
    onDelete: 'cascade',
    // foreignKey: { allowNull: false, name: 'user_id' },
  });
  Group.belongsToMany(User, {
    through: {
      model: UserGroup,
      // unique: false,
    },
    onDelete: 'cascade',
    // foreignKey: { allowNull: false, name: 'group_id' },
  });
};

export default init_relations;
