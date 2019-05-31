module.exports = (sequelize, DataTypes) => {
  const chatrooms = sequelize.define(
    "chatrooms",
    {
      _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user1: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      user2: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: true
    }
  );

  chatrooms.associate = function(models) {
    chatrooms.hasMany(models.directmessages, {
      foreignKey: "chatroom_id",
      sourceKey: "_id"
    });
    chatrooms.belongsTo(models.users, {
      foreignKey: "user1",
      targetKey: "_id"
    });
    chatrooms.belongsTo(models.users, {
      foreignKey: "user2",
      targetKey: "_id"
    });
  };

  return chatrooms;
};
