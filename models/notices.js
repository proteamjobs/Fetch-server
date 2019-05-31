module.exports = (sequelize, DataTypes) => {
  const notices = sequelize.define(
    "notices",
    {
      _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      timestamps: true
    }
  );

  notices.associate = function(models) {
    notices.hasMany(models.notifications, {
      foreignKey: "notice_id",
      targetKey: "_id"
    });
  };

  return notices;
};
