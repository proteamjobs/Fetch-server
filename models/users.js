module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      social_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: false
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

  users.associate = function(models) {
    users.hasMany(models.orders, {
      foreignKey: "buyer_id",
      sourceKey: "_id"
    });
    users.hasMany(models.travels, {
      foreignKey: "traveler_id",
      sourceKey: "_id"
    });
    users.hasMany(models.chatrooms, {
      foreignKey: "user1",
      sourceKey: "_id"
    });
    users.hasMany(models.chatrooms, {
      foreignKey: "user2",
      sourceKey: "_id"
    });
    users.hasMany(models.reviews, {
      foreignKey: "buyer_id",
      sourceKey: "_id"
    });
    users.hasMany(models.reviews, {
      foreignKey: "fetcher_id",
      sourceKey: "_id"
    });
    users.hasMany(models.notifications, {
      foreignKey: "to_id",
      sourceKey: "_id"
    });
    users.hasMany(models.notifications, {
      foreignKey: "from_id",
      sourceKey: "_id"
    });
    users.hasMany(models.applies, {
      foreignKey: "traveler_id",
      sourceKey: "_id"
    });
  };

  return users;
};
