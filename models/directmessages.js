module.exports = (sequelize, DataTypes) => {
  const directmessages = sequelize.define(
    "directmessages",
    {
      _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      chatroom_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      to_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      from_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      timestamps: true
    }
  );

  directmessages.associate = function(models) {
    directmessages.belongsTo(models.chatrooms, {
      foreignKey: "chatroom_id",
      targetKey: "_id"
    });
    directmessages.belongsTo(models.users, {
      foreignKey: "to_id",
      targetKey: "_id"
    });
    directmessages.belongsTo(models.users, {
      foreignKey: "from_id",
      targetKey: "_id"
    });
  };

  return directmessages;
};
